import _ from 'lodash';
import $ from 'jquery';
import Firebase from 'Firebase';
import CryptoJS from 'crypto-js';

import FirebaseRef from '../FirebaseRef';
import Dispatcher from '../../shared/Dispatcher';
import Actions from '../../shared/Actions';
import Store from '../../shared/Store';

const USERS_REF = FirebaseRef.child('users');
const FEEDS_REF = FirebaseRef.child('feeds');

let _userId = null;
let _selectedFeedId = null;
let _feeds = {};

let _feedRefs = {};
let _userFeedsRef = null;
let _feedUsersRefs = {};
let _selectedFeedRef = null;

function endLogin(user) {
    if (_userFeedsRef)
        _userFeedsRef.off();

    if (_selectedFeedRef)
        _selectedFeedRef.off();

    _userId = user.id;
    _userFeedsRef = USERS_REF.child(_userId + '/feeds');
    _userFeedsRef.on('child_added', _feedAdded);
    _userFeedsRef.on('child_removed', _feedRemoved);

    _selectedFeedRef = USERS_REF.child(_userId + '/selectedFeed');
    _selectedFeedRef.on('value', _feedSelected);
}

function _feedAdded(userFeedSnap) {
    let newFeedUser = false;
    const feedId = userFeedSnap.key();
    const feedRef = FEEDS_REF.child(feedId);
    _feedRefs[feedId] = feedRef;

    feedRef.on('value', feedSnap => {
        _feeds[feedId] = Object.assign(
            {id: feedId, selected: feedId === _selectedFeedId},
            feedSnap.val());

        emit();
        newFeedUser = true;
    });

    const feedUsers = feedRef.child('users');
    _feedUsersRefs[feedId] = feedUsers;

    feedUsers.on('child_added', feedUserSnap => {
        if (newFeedUser && feedUserSnap.key() != _userId)
            FEEDS_REF.child(userFeedSnap.key() + '/name').once('value', feedNameSnap => {
                USERS_REF.child(feedUserSnap.key() + '/name').once('value', userNameSnap => {
                    Store.state.ui.notification = {
                        text: 'joined',
                        user: userNameSnap.val(),
                        topic: feedNameSnap.val()
                    };
                    Store.emit();
                });
            });
    });

    feedUsers.on('child_removed', feedUserSnap => {
        if (newFeedUser && feedUserSnap.key() != _userId)
            FEEDS_REF.child(userFeedSnap.key() + '/name').once('value', feedNameSnap => {
                USERS_REF.child(feedUserSnap.key() + '/name').once('value', userNameSnap => {
                    Store.state.ui.notification = {
                        text: 'left',
                        user: userNameSnap.val(),
                        topic: feedNameSnap.val()
                    };
                    Store.emit();
                });
            });
    });
}

function _feedRemoved(snap) {
    const id = snap.key();
    const feed = _feeds[id];

    if (feed.selected)
        selectFeed(null);

    _feedRefs[id].off();
    _feedUsersRefs[id].off();
    delete _feedRefs[id];
    delete _feedUsersRefs[id];
    delete _feeds[id];
    emit();
}

function _feedSelected(snap) {
    _selectedFeedId = snap.val();

    _.forEach(_feeds, (feed, id) => {
        feed.selected = _selectedFeedId === id;
    });

    emit();
}

function addFeed(feedName) {
    return new Promise(resolve => {
        const feed = {
            name: feedName,
            timestamp: Firebase.ServerValue.TIMESTAMP,
            password: CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(feedName)).toString()
        };

        const feedRef = FEEDS_REF.push();
        const feedId = feedRef.key();
        feedRef.set(feed, () => joinFeed(feedId, feed.password).then(() => resolve(feedId)));
    })
}

function addStartFeed() {
    addFeed('Getting Started').then(feedId => {
        FirebaseRef.child(`posts/start`).once('value', snap => {
            FirebaseRef.child(`posts/${feedId}`).set(snap.val())
        })
    });
}

function joinFeed(feedId, feedPassword) {
    return new Promise(resolve => {
        const updates = {};
        updates[`feeds/${feedId}/users/${_userId}`] = feedPassword;
        updates[`users/${_userId}/feeds/${feedId}`] = true;
        updates[`users/${_userId}/selectedFeed`] = feedId;
        FirebaseRef.update(updates, resolve);
    });
}

function removeFeed(feedId) {
    const updates = {};
    updates[`users/${_userId}/feeds/${feedId}`] = null;
    updates[`feeds/${feedId}/users/${_userId}`] = null;
    FirebaseRef.update(updates)
}

function renameFeed(feedId, feedName) {
    FEEDS_REF.child(feedId).update({name: feedName});
}

function selectFeed(feedId) {
    _selectedFeedRef.set(feedId);
}

function emit() {
    Store.emitUpdate({feeds: _feeds});
}

Dispatcher.register((action) => {
    switch (action.type) {
        case 'END_LOGIN':
            endLogin(action.user);
            break;

        case 'ADD_FEED':
            addFeed(action.feedName);
            break;

        case 'ADD_START_FEED':
            addStartFeed();
            break;

        case 'JOIN_FEED':
            joinFeed(action.feedId, action.feedPassword);
            break;

        case 'REMOVE_FEED':
            removeFeed(action.feedId);
            break;

        case 'RENAME_FEED':
            renameFeed(action.feedId, action.feedName);
            break;

        case 'SELECT_FEED':
            selectFeed(action.feedId);
            break;
    }
});