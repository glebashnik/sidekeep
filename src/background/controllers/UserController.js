import _ from 'lodash';
import $ from 'jquery';
import UserStore from '../../shared/stores/UserStore';
import Dispatcher from '../../shared/Dispatcher';
import rootRef from '../Firebase';
import Actions from '../../shared/Actions';

let _user = null;

class Feed {
    constructor(snap) {
        this.id = snap.key();
        this.name = null;
        this.nameRef = rootRef.child('feeds').child(this.id + '/name');

        this.deferred = $.Deferred();
        this.nameRef.on('value', this.updateName, this);
    }

    updateName(snap) {
        this.name = snap.val();
        this.deferred.resolve(this);
    }

    remove() {
        this.nameRef.off('value', this.updateName, this);
    }

    ready() {
        return this.deferred.promise();
    };
}

class User {
    constructor(auth) {
        this.id = auth.uid;
        this.deferred = $.Deferred();
        this.name = auth.google.displayName;
        this.image = auth.google.profileImageURL;
        this.selectedFeed = null;
        this.feeds = {};

        this.ref = rootRef.child('users/' + this.id);

        this.ref.update({
            name: this.name,
            image: this.image
        });

        this.ref.child('selectedFeed').on('value', this._selectedFeedChanged, this);
        //this.ref.on('value', this.updated, this);
        this.ref.child('feeds').on('child_added', this._addedFeed, this);
        this.ref.child('feeds').on('child_removed', this._removedFeed, this);
    }

    _selectedFeedChanged(snap) {
        this.selectedFeed = snap.val();
        emit();
    }

    //updated(snap) {
    //    const user = snap.val();
    //
    //    if (user) {
    //        this.name = user.name;
    //        this.image = user.image;
    //        this.deferred.resolve(this);
    //    }
    //}

    _addedFeed(snap) {
        const feed = new Feed(snap);
        this.feeds[feed.id] = feed;
        feed.ready().then(emit);
    }

    _removedFeed(snap) {
        this.feeds[snap.key()].remove();
    }

    removeFeed(id) {
        this.ref.child('feeds').child(id).remove();
    }

    ready() {
        return this.deferred.promise();
    };
}

function addFeed(feedName, userId) {
    const feedRef = rootRef.child('feeds').push({name: feedName});
    feedRef.child(`users/${userId}`).set(true);
    const feedId = feedRef.key();
    rootRef.child(`users/${userId}/feeds/${feedId}`).set(true);
}

function joinFeed(feedId, userId) {
    rootRef.child(`feeds/${feedId}/users/${userId}`).set(true);
    rootRef.child(`users/${userId}/feeds/${feedId}`).set(true);
}

function selectFeed(feedId, userId) {
    rootRef.child(`users/${userId}/selectedFeed`).set(feedId);
}

rootRef.onAuth(auth => {
    if (auth) {
        _user = new User(auth);
        _user.ready().then(emit);
    }
    else
        chrome.identity.getAuthToken({interactive: true}, token => {
            if (token)
                rootRef.authWithOAuthToken('google', token, error => {
                    if (error)
                        console.log(error);
                });
            else
                console.log(chrome.runtime.lastError)
        });
});

function emit() {
    UserStore.setState({
        id: _user.id,
        name: _user.name,
        image: _user.image,
        selectedFeed: _user.selectedFeed,
        feeds: _.map(_user.feeds, f => ({id: f.id, name: f.name}))
    });
}

export default Dispatcher.register((action) => {
    switch (action.type) {
        case 'JOIN_FEED':
            joinFeed(action.feedId, _user.id);
            chrome.tabs.remove(action.tabId);
            break;

        case 'ADD_FEED':
            addFeed(action.name, _user.id);
            break;

        case 'SELECT_FEED':
            selectFeed(action.feedId, _user.id);
            break;
    }
});