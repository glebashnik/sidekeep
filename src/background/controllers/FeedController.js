import _ from 'lodash';
import $ from 'jquery';
import Firebase from 'Firebase';
import FirebaseRef from '../FirebaseRef';
import Dispatcher from '../../shared/Dispatcher';
import Actions from '../../shared/Actions';
import Store from '../../shared/Store';

const USERS_REF = FirebaseRef.child('users');
const FEEDS_REF = FirebaseRef.child('feeds');

let _userId = null;
let _selectedFeedId = null;
let _feeds = {};

let _userFeedsRef = null;
let _feedRefs = {};
let _feedUsersRefs = {};
let _selectedFeedRef = null;

function login(user) {
    if (_userFeedsRef) {
        _userFeedsRef.off();
        _userFeedsRef.off();
        _selectedFeedRef.off();
    }

    _userId = user.id;
    _userFeedsRef = USERS_REF.child(_userId +  '/feeds');
    _userFeedsRef.on('child_added', _userFeedAdded);
    _userFeedsRef.on('child_removed', _userFeedRemoved);

    _selectedFeedRef = USERS_REF.child(_userId +  '/selectedFeed');
    _selectedFeedRef.on('value', _feedSelected);
}

function _userFeedAdded(userFeedSnap) {
    let newFeedUser = false;
    const feedId = userFeedSnap.key();
    const feedRef = FEEDS_REF.child(feedId);
    _feedRefs[feedId] = feedRef;

    feedRef.on('value', feedSnap => {
        _feeds[feedId] = Object.assign({id: feedId, selected: feedId === _selectedFeedId}, feedSnap.val());
        emit();
        newFeedUser = true;
    });

    const feedUsers = feedRef.child('users');
    _feedUsersRefs[feedId] = feedUsers;

    feedUsers.on('child_added', feedUserSnap => {
        if (newFeedUser)
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

function _userFeedRemoved(snap) {
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
    const feedRef = FEEDS_REF.push({
        'name': feedName,
        'timestamp': Firebase.ServerValue.TIMESTAMP
    });

    joinFeed(feedRef.key());
    selectFeed(feedRef.key());
}

function joinFeed(feedId) {
    _userFeedsRef.child(feedId).set(true);
    FEEDS_REF.child(feedId + '/users/' + _userId).set(true);
    selectFeed(feedId);
}

function removeFeed(feedId) {
    _userFeedsRef.child(feedId).set(null);
    FEEDS_REF.child(feedId + '/users/' + _userId).set(null);
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
        case 'LOGIN':
            login(action.user);
            break;

        case 'ADD_FEED':
            addFeed(action.feedName);
            break;

        case 'JOIN_FEED':
            joinFeed(action.feedId);
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