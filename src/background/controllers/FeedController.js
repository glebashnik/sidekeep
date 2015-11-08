import _ from 'lodash';
import $ from 'jquery';

import UserStore from '../../shared/stores/UserStore';
import FeedStore from '../../shared/stores/FeedStore';
import Dispatcher from '../../shared/Dispatcher';
import Firebase from '../Firebase';
import * as UrlHelper from '../../shared/helpers/UrlHelper';
import * as TraceHelper from '../../shared/helpers/TraceHelper';
import * as Tracer from '../Tracer';
import FlatToNested from 'flat-to-nested';

const flatToNested = new FlatToNested();

const USERS_REF = Firebase.child('users');
const FEEDS_REF = Firebase.child('feeds');
const POSTS_REF = Firebase.child('posts');

let _selectedRef = null;
let _feedRef = null;
let _postsRef = null;

const _posts = {};

function emit() {
    const flat = _.values(_.cloneDeep(_posts));
    const nested = flatToNested.convert(flat);
    FeedStore.emitState(nested);
}

function login(user) {
    if (_selectedRef)
        _selectedRef.off('value', _selectedChanged);

    _selectedRef = USERS_REF.child(user.id + '/selectedFeed');
    _selectedRef.on('value', _selectedChanged);
}

function _selectedChanged(snap) {
    selectFeed(snap.val());
}

function selectFeed(feedId) {
    if (_feedRef) {
        _feedRef.off('value', _feedUpdate);
        _postsRef.off('child_added', _postAddedOrChanged);
        _postsRef.off('child_removed', _postRemoved);
        _postsRef.off('child_changed', _postAddedOrChanged);
    }

    _feedRef = FEEDS_REF.child(feedId);
    _postsRef = POSTS_REF.child(feedId);

    _feedRef.on('value', _feedUpdate);
    _postsRef.on('child_added', _postAddedOrChanged);
    _postsRef.on('child_removed', _postRemoved);
    _postsRef.on('child_changed', _postAddedOrChanged);
}

function _feedUpdate(snap) {
    _posts[0] = {
        id: 0,
        type: 'feed',
        name: snap.val().name
    };
    emit();
}

function _postAddedOrChanged(snap) {
    const post = snap.val();
    post.id = snap.key();
    _posts[post.id] = post;
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
    let parentId = 0;

    if (first.query)
        parentId = _.findKey(_posts, {query: first.query}) || _postsRef.push({
                parent: parentId,
                type: 'search',
                url: first.url,
                query: first.query,
                user: UserStore.state
            }).key();

    parentId = _.findKey(_posts, {url: last.url}) || _postsRef.push({
            parent: parentId,
            type: 'page',
            title: last.title,
            url: last.url,
            favIconUrl: last.favIconUrl,
            user: UserStore.state
        }).key();

    _postsRef.push({
        parent: parentId,
        type: 'text',
        text: text,
        user: UserStore.state
    });
}

function comment(postId, commentText) {
    _postsRef.push({
        type: 'comment',
        parent: postId,
        text: commentText,
        user: UserStore.state
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