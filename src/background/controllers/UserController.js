import _ from 'lodash';
import $ from 'jquery';
import Dispatcher from '../../shared/Dispatcher';
import Firebase from '../Firebase';
import UserStore from '../../shared/stores/UserStore';

const _usersRef = Firebase.child('users');
const _feedsRef = Firebase.child('feeds');

let _userRef = null;
let _userFeedsRef = null;
const _userFeedsDef = {};

function login(user) {
    if (_userRef) {
        _userRef.off('value', _userUpdated);
        _userFeedsRef.off('child_added', _feedAdded);
        _userFeedsRef.off('child_removed', _feedRemoved);
    }

    _userRef = _usersRef.child(user.id);
    _userFeedsRef = _userRef.child('feeds');

    _userRef.update({
        name: user.name,
        image: user.image
    });

    _userFeedsRef.on('child_added', _feedAdded);
    _userFeedsRef.on('child_removed', _feedRemoved);
    _userRef.on('value', _userUpdated);
}

function _userUpdated(snap) {
    const val = snap.val();

    UserStore.update({
        id: snap.key(),
        name: val.name,
        image: val.image
    });

    Promise.all(_.values(_userFeedsDef)).then(() => UserStore.emit());
}

function _feedAdded(snap) {
    const feedId = snap.key();
    _userFeedsDef[feedId] = $.Deferred();

    const feedRef = _feedsRef.child(feedId);
    feedRef.on('value', _feedUpdated);
}

function _feedRemoved(snap) {
    const feedId = snap.key();
    const feedRef = _feedsRef.child(feedId);
    feedRef.off('value', _feedUpdated);

    delete _userFeedsDef[feedId];
    delete UserStore.state.feeds[feedId];

    UserStore.emitChange();
}

function _feedUpdated(snap) {
    const feedId = snap.key();
    const val = snap.val();

    UserStore.state.feeds[feedId] = {
        id: feedId,
        name: val.name || ''
    };

    const feedDef = _userFeedsDef[feedId];

    if (feedDef.state() === 'pending')
        feedDef.resolve(); //loading for the first time
    else
        UserStore.emit(); //updating
}

function createFeed(feedName) {
    const feedRef = _feedsRef.push({name: feedName, users: {_userId: true}});
    joinFeed(feedRef.key());
}

function renameFeed(feedId, feedName) {
    _feedsRef.child(feedId).update({name: feedName});
}

function joinFeed(feedId) {
    _userFeedsRef.child(feedId).set(true);
}

function leaveFeed(feedId) {
    _userFeedsRef.child(feedId).set(null);
}

export default Dispatcher.register((action) => {
    switch (action.type) {
        case 'LOGIN':
            login(action.user);
            break;

        case 'CREATE_FEED':
            createFeed(action.feedName);
            break;

        case 'RENAME_FEED':
            renameFeed(action.feedId, action.feedName);
            break;

        case 'JOIN_FEED':
            joinFeed(action.feedId);
            break;

        case 'LEAVE_FEED':
            leaveFeed(action.feedId);
            break;
    }
});