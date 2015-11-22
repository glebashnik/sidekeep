import _ from 'lodash';
import $ from 'jquery';
import Dispatcher from '../../shared/Dispatcher';
import FirebaseRef from '../FirebaseRef';
import FeedStore from '../../shared/stores/FeedStore';

const USERS_REF = FirebaseRef.child('users');
const FEEDS_REF = FirebaseRef.child('feeds');

let _userId = null;
let _feeds = {};

let _userFeedsRef = null;
let _feedRefs = {};
let _selectedFeedRef = null;

function login(user) {
    if (_userFeedsRef) {
        _userFeedsRef.off('child_added', _added);
        _userFeedsRef.off('child_removed', _removed);
        _selectedFeedRef.off('value', _selected);
    }

    _userId = user.id;
    _userFeedsRef = USERS_REF.child(_userId +  '/feeds');
    _userFeedsRef.on('child_added', _added);
    _userFeedsRef.on('child_removed', _removed);

    _selectedFeedRef = USERS_REF.child(_userId +  '/selectedFeed');
    _selectedFeedRef.on('value', _selected);
}

function _added(snap) {
    const feedRef = FEEDS_REF.child(snap.key());
    _feedRefs[snap.key()] = feedRef;
    feedRef.on('value', _updated);
}

function _updated(snap) {
    const feed = snap.val();
    feed.id = snap.key();
    _feeds[snap.key()] = feed;
    emit();
}

function _removed(snap) {
    _feedRefs[snap.key()].off();
    delete _feedRefs[snap.key()];
    delete _feeds[snap.key()];
    emit();
}

function _selected(snap) {
    _.forEach(_feeds, (feed, id) => {
        feed.selected = snap.val() === id;
    });
    emit();
}

function addFeed(feedName) {
    const feedRef = FEEDS_REF.push({'name': feedName});
    joinFeed(feedRef.key());
    selectFeed(feedRef.key());
}

function joinFeed(feedId) {
    _userFeedsRef.child(feedId).set(true);
    FEEDS_REF.child(feedId + '/users/' + _userId).set(true);
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
    FeedStore.emitState(_feeds);
}

export default Dispatcher.register((action) => {
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