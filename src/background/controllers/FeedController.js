import _ from 'lodash';
import $ from 'jquery';

import UserStore from '../../shared/stores/UserStore';
import FeedStore from '../../shared/stores/FeedStore';
import Dispatcher from '../../shared/Dispatcher';
import Firebase from 'Firebase';
import FirebaseRef from '../FirebaseRef';
import * as UrlHelper from '../../shared/helpers/UrlHelper';
import * as TraceHelper from '../../shared/helpers/TraceHelper';
import * as Tracer from '../Tracer';
import FlatToNested from 'flat-to-nested';

const flatToNested = new FlatToNested();

const USERS_REF = FirebaseRef.child('users');
const FEEDS_REF = FirebaseRef.child('feeds');
const POSTS_REF = FirebaseRef.child('posts');

let _selectRef = null;
let _feedRef = null;
let _postsRef = null;

let _newPostsQuery = null;

let _user = null;
let _posts = {};

function emit() {
    const flat = _.values(_.cloneDeep(_posts));
    const nested = flatToNested.convert(flat);
    FeedStore.emitState(nested);
}

function login(user) {
    _user = user;

    if (_selectRef)
        _selectRef.off('value', _selectChanged);

    _selectRef = USERS_REF.child(user.id + '/selectedFeed');
    _selectRef.on('value', _selectChanged);
}

function _selectChanged(snap) {
    selectFeed(snap.val());
}

function selectFeed(feedId) {
    if (_feedRef) {
        _feedRef.off('value', _feedUpdate);
        _newPostsQuery.off('child_added', _postAdded);
        _postsRef.off('child_removed', _postRemoved);
    }

    _posts = {};

    _feedRef = FEEDS_REF.child(feedId);
    _feedRef.on('value', _feedUpdate);

    _postsRef = POSTS_REF.child(feedId);
    _postsRef.once('value', _postsLoaded);
    _postsRef.on('child_removed', _postRemoved);

    _newPostsQuery = _postsRef.orderByChild('timestamp').startAt(Date.now());
    _newPostsQuery.on('child_added', _postAdded);
}

function _feedUpdate(snap) {
    _posts[0] = {
        id: 0,
        type: 'feed',
        name: snap.val().name
    };
    emit();
}

function _addPost(snap) {
    const post = snap.val();
    post.id = snap.key();
    _posts[post.id] = post;
}

function _postsLoaded(snap) {
    snap.forEach(_addPost);
    emit();
}

function _postAdded(snap) {
    _addPost(snap);
    emit();
}

function _postRemoved(snap) {
    delete _posts[snap.key()];
    emit();
}

function clipText(text, tabId) {
    let trace = TraceHelper.fixTrace(Tracer.getTrace(tabId));
    let first = _.first(trace);
    let last = _.last(trace);
    let parent = 0;

    if (first.query)
        parent = _.findKey(_posts, {query: first.query}) || _postsRef.push({
                parent: parent,
                timestamp: Firebase.ServerValue.TIMESTAMP,
                type: 'search',
                url: first.url,
                query: first.query,
                user: _user
            }).key();

    parent = _.findKey(_posts, {url: last.url}) || _postsRef.push({
            parent: parent,
            timestamp: Firebase.ServerValue.TIMESTAMP,
            type: 'page',
            title: last.title,
            url: last.url,
            favIconUrl: last.favIconUrl,
            user: _user
        }).key();

    _postsRef.push({
        parent: parent,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        type: 'text',
        text: text,
        user: _user
    });
}

function comment(postId, commentText) {
    _postsRef.push({
        type: 'comment',
        timestamp: Firebase.ServerValue.TIMESTAMP,
        parent: postId,
        text: commentText,
        user: _user //todo make user updatable
    });
}

function removePost(postId) {
    _postsRef.child(postId).set(null);
}

export default Dispatcher.register(action => {
    switch (action.type) {
        case 'LOGIN':
            login(action.user);
            break;

        case 'SELECT_FEED':
            selectFeed(action.feedId);
            break;

        case 'CLIP_TEXT':
            clipText(action.text, action.tabId);
            break;

        case 'COMMENT':
            comment(action.postId, action.commentText);
            break;

        case 'REMOVE_POST':
            removePost(action.postId);
            break;
    }
});