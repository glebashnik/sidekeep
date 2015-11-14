import _ from 'lodash';
import $ from 'jquery';

import UserStore from '../../shared/stores/UserStore';
import FeedStore from '../../shared/stores/FeedStore';
import UIStore from '../../shared/stores/UIStore';
import Dispatcher from '../../shared/Dispatcher';
import Firebase from 'Firebase';
import FirebaseRef from '../FirebaseRef';
import * as UrlHelper from '../../shared/helpers/UrlHelper';
import * as TraceHelper from '../../shared/helpers/TraceHelper';
import * as Tracer from '../Tracer';
import FlatToNested from 'flat-to-nested';
import ImageHelper from '../helpers/ImageHelper';

const flatToNested = new FlatToNested();

const USERS_REF = FirebaseRef.child('users');
const FEEDS_REF = FirebaseRef.child('feeds');
const POSTS_REF = FirebaseRef.child('posts');

let _selectRef = null;
let _feedRef = null;
let _postsRef = null;

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
    if (!feedId)
        return;

    if (_feedRef) {
        _feedRef.off('value', _feedUpdate);
        _postsRef.off('child_added', _postAdded);
        _postsRef.off('child_removed', _postRemoved);
    }

    _posts = {};

    _feedRef = FEEDS_REF.child(feedId);
    _feedRef.on('value', _feedUpdate);

    _postsRef = POSTS_REF.child(feedId);
    _postsRef.on('child_added', _postAdded);
    _postsRef.on('child_removed', _postRemoved);
}

function _feedUpdate(snap) {
    _posts[0] = {
        id: 0,
        type: 'feed',
        name: snap.val().name
    };
    emit();
}

function _postAdded(snap) {
    const post = snap.val();
    post.id = snap.key();
    _posts[post.id] = post;
    emit();
}

function _postRemoved(snap) {
    delete _posts[snap.key()];
    emit();
}

function clipPage(tabId) {
    let trace = TraceHelper.fixTrace(Tracer.getTrace(tabId));
    let first = _.first(trace);
    let last = _.last(trace);
    let parentId = 0;

    if (first.query)
        parentId = _.findKey(_posts, {query: first.query}) || _postsRef.push({
                parent: parentId,
                timestamp: Firebase.ServerValue.TIMESTAMP,
                type: 'search',
                url: first.url,
                query: first.query,
                user: _user
            }).key();

    return _.findKey(_posts, {url: last.url}) || _postsRef.push({
            parent: parentId,
            timestamp: Firebase.ServerValue.TIMESTAMP,
            type: 'page',
            title: last.title,
            url: last.url,
            favIconUrl: last.favIconUrl,
            user: _user
        }).key();
}


function clipText(text, tabId) {
    const pageId = clipPage(tabId);

    const clipId = _postsRef.push({
        parent: pageId,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        type: 'text',
        text: text,
        user: _user
    }).key();

    selectClip(clipId);
}

function clipImage(imageUrl, tabId) {
    const pageId = clipPage(tabId);

    const clipId = _postsRef.push({
        parent: pageId,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        type: 'image',
        imageUrl: imageUrl,
        user: _user
    }).key();

    selectClip(clipId);
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

function selectClip(clipId) {
    UIStore.emitUpdate({
        selectedClipId: clipId
    });
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

        case 'CLIP_IMAGE':
            clipImage(action.imageUrl, action.tabId);
            break;

        case 'CLIP_PAGE':
            clipPage(action.tabId);
            break;

        case 'COMMENT':
            comment(action.postId, action.commentText);
            break;

        case 'REMOVE_POST':
            removePost(action.postId);
            break;

        case 'SELECT_CLIP':
            selectClip(action.clipId);
            break;
    }
});