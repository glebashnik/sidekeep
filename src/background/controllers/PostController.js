import _ from 'lodash';
import $ from 'jquery';

import Dispatcher from '../../shared/Dispatcher';
import Firebase from 'Firebase';
import FirebaseRef from '../FirebaseRef';
import * as UrlHelper from '../../shared/helpers/UrlHelper';
import * as TraceHelper from '../../shared/helpers/TraceHelper';
import * as Tracer from '../Tracer';

import Actions from '../../shared/Actions';
import Store from '../../shared/Store';

const USERS_REF = FirebaseRef.child('users');
const POSTS_REF = FirebaseRef.child('posts');

let _feedId = null;
let _userId = null;
let _posts = null;
let _selectedFeedRef = null;
let _postsRef = null;

let _movePostId = false;

class UserCache {
    constructor(ref) {
        this.ref = ref;
        this.promises = {};
    }

    load(id) {
        if(!this.promises[id])
            this.promises[id] = new Promise(resolve => {
                this.ref.child(id).once('value', snap => {
                    resolve(snap.val());
                });
            });

        return this.promises[id];
    };
}

const _userCache = new UserCache(USERS_REF);

function login(user) {
    if (_selectedFeedRef)
        _selectedFeedRef.off('value', _selected);

    _userId = user.id;
    _selectedFeedRef = USERS_REF.child(_userId + '/selectedFeed');
    _selectedFeedRef.on('value', _selected);
}

function _selected(snap) {
    const feedId = snap.val();

    if (feedId === _feedId) {
        _movePostId = null;
        return;
    }

    if (_movePostId) {
        movePost(_movePostId, _feedId, feedId);
        _movePostId = null;
    }

    _feedId = feedId;

    if (_postsRef) {
        _postsRef.off('child_added', _added);
        _postsRef.off('child_removed', _removed);
    }

    _posts = {};
    emit();

    if (!_feedId)
        return;

    _postsRef = POSTS_REF.child(_feedId);
    _postsRef.on('child_added', _added);
    _postsRef.on('child_removed', _removed);
    _postsRef.on('child_changed', _added);
}

function _added(snap) {
    const post = _posts[snap.key()] || {id: snap.key(), children: {}};
    Object.assign(post, snap.val());
    _posts[post.id] = post;

    const ancestor = _posts[post.ancestor] || {id: post.ancestor, children: {}};
    ancestor.children[post.id] = post;
    _posts[ancestor.id] = ancestor;

    _userCache.load(post.user).then(user => {
        post.user = user;
        emit();
    });
}

function _removed(snap) {
    const post = snap.val();
    post.id = snap.key();
    delete _posts[post.ancestor].children[post.id];
    delete _posts[post.id];
    emit();
}

function addPost(post) {
    post.user = _userId;
    post.timestamp = Firebase.ServerValue.TIMESTAMP;
    return _postsRef.push(post).key();
}

function addPage(tabId) {
    const trace = TraceHelper.fixTrace(Tracer.getTrace(tabId));
    const first = _.first(trace);
    const search = first && first.query ? first : null;

    let ancestorId = 'root';

    if (search)
        ancestorId = _.findKey(_posts, {query: search.query}) || addPost({
                ancestor: ancestorId,
                type: 'search',
                url: search.url,
                query: search.query
            });

    return new Promise(resolve => {
        chrome.tabs.get(tabId, tab => {
            const pageId = _.findKey(_posts, {url: tab.url}) || addPost({
                    ancestor: ancestorId,
                    type: 'page',
                    title: tab.title,
                    url: tab.url,
                    favIconUrl: tab.favIconUrl || 'https://aftersearch.firebaseapp.com/img/pdf.png'
                });

            resolve(pageId);
        });
    });
}

function addText(text, tabId) {
    addPage(tabId).then(ancestorId => {
        const clipId = addPost({
            ancestor: ancestorId,
            type: 'text',
            text: text
        });

        selectPost(clipId);
    });
}

function addImage(imageUrl, tabId) {
    addPage(tabId).then(ancestorId => {
        const clipId = addPost({
            ancestor: ancestorId,
            type: 'image',
            image: imageUrl
        });

        selectPost(clipId);
    });
}

function addComment(postId, text) {
    const ancestorId = _posts[postId].type === 'comment'
        ? _posts[postId].ancestor
        : postId;

    const commentId = addPost({
        ancestor: ancestorId,
        type: 'comment',
        text: text
    });

    selectPost(commentId);
}

function removePost(postId) {
    const post = _posts[postId];

    if (post.type === 'search')
        _.forEach(post.children, child => _postsRef.child(child.id + '/ancestor').set(post.ancestor));
    else
        _.forEach(post.children, child => removePost(child.id));

    _postsRef.child(postId).set(null);
    selectPost();
}


function selectPost(postId) {
    _.forEach(_posts, (post, id) => {
        post.selected = id === postId ? !post.selected : false;
    });

    emit();
}

function emit() {
    Store.emitUpdate({posts: _posts.root});
}

function movePost(postId, fromFeedId, toFeedId, withParent = true, withChildren = true) {
    if (!postId)
        return;

    POSTS_REF.child(fromFeedId + '/' + postId).once('value', snap =>
        POSTS_REF.child(toFeedId + '/' + postId).set(snap.val()));

    const post = _posts[postId];

    if (withChildren)
        _.forEach(post.children, child => movePost(child.id, fromFeedId, toFeedId, withParent = false, withChildren = true));

    if (withParent)
        movePost(post.ancestor, fromFeedId, toFeedId, withParent = true, withChildren = false);
}

Dispatcher.register(action => {
    switch (action.type) {
        case 'LOGIN':
            login(action.user);
            break;

        case 'ADD_TEXT':
            addText(action.text, action.tabId);
            break;

        case 'ADD_IMAGE':
            addImage(action.imageUrl, action.tabId);
            break;

        case 'ADD_PAGE':
            addPage(action.tabId);
            break;

        case 'ADD_COMMENT':
            addComment(action.postId, action.text);
            break;

        case 'REMOVE_POST':
            removePost(action.postId);
            break;

        case 'SELECT_POST':
            selectPost(action.postId);
            break;

        case 'MOVE_POST':
            _movePostId = action.postId;
            Actions.toggleFeedMenu();
            break;
    }
});