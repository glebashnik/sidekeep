import _ from 'lodash';
import $ from 'jquery';
import UserStore from '../../shared/stores/UserStore';
import Dispatcher from '../../shared/Dispatcher';
import _rootRef from '../Firebase';
import Actions from '../../shared/Actions';

const _feedsRef = _rootRef.child('feeds');
const _usersRef = _rootRef.child('users');
let _user = null;

class Feed {
    constructor(id) {
        this.id = id;
        this.name = null;
        this.deferred = $.Deferred();

        this.ref = _feedsRef.child(id);
        this.nameRef = this.ref.child('name');
        this.usersRef = this.ref.child('users');

        this.nameRef.on('value', this._nameChanged, this);
    }

    off() {
        this.nameRef.off('value', this._nameChanged, this);
    }

    static create(name) {
        const feedRef = _feedsRef.push({name: name});
        return new Feed(feedRef.key());
    }

    _nameChanged(snap) {
        this.name = snap.val();
        this.deferred.resolve();
    }

    addUser(userId) {
        this.usersRef.child(userId).set(true);
    }

    removeUser(userId) {
        this.usersRef.child(userId).set(null);
    }

    ready() {
        return this.deferred.promise();
    };
}

class User {
    constructor(auth) {
        this.id = auth.uid;
        this.ref = _usersRef.child(this.id);
        this.ref.update({
            name: auth.google.displayName,
            image: auth.google.profileImageURL
        });
        this.ref.on('value', this._changed, this);

        this.feeds = {};
        this.feedsRef = this.ref.child('feeds');
        this.feedsRef.on('child_added', this._feedAdded, this);
        this.feedsRef.on('child_removed', this._feedRemoved, this);
    }

    off() {
        this.ref.on('value', this._changed, this);
        this.feedsRef.off('child_added', this._feedAdded, this);
        this.feedsRef.off('child_removed', this._feedRemoved, this);
    }

    _changed(snap) {
        const user = snap.val();
        this.name = user.name;
        this.image = user.image;
        this.selectedFeed = user.selectedFeed;
        emit();
    }

    _feedAdded(snap) {
        const feed = new Feed(snap.key());
        feed.addUser(this.id);
        this.feeds[feed.id] = feed;
        feed.ready().done(emit);
    }


    _feedRemoved(snap) {
        const feed = this.feeds[snap.key()];
        feed.off();
        feed.removeUser(this.id);
        delete this.feeds[feed.id];
        feed.ready().done(emit);
    }

    createFeed(feedName) {
        const feed = Feed.create(feedName);
        this.addFeed(feed.id);
    }

    addFeed(feedId) {
        this.feedsRef.child(feedId).set(true);
    }

    removeFeed(feedId) {
        this.feedsRef.child(feedId).set(null);
    }

    selectFeed(feedId) {
        this.ref.child('selectedFeed').set(feedId);
    }
}


_rootRef.onAuth(auth => {
    if (auth) {
        if (_user)
            _user.off();
        _user = new User(auth);
    }
    else
        chrome.identity.getAuthToken({interactive: true}, token => {
            if (token)
                _rootRef.authWithOAuthToken('google', token, error => {
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
        feeds: _.map(_user.feeds, feed => ({id: feed.id, name: feed.name}))
    });
}

export default Dispatcher.register((action) => {
    switch (action.type) {
        case 'JOIN_FEED':
            _user.addFeed(action.feedId);
            chrome.tabs.remove(action.tabId);
            break;

        case 'ADD_FEED':
            _user.createFeed(action.name);
            break;

        case 'SELECT_FEED':
            _user.selectFeed(action.feedId);
            break;
    }
});