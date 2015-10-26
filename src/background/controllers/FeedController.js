import _ from 'lodash';
import UserStore from '../../shared/stores/UserStore';
import FeedStore from '../../shared/stores/FeedStore';
import Dispatcher from '../../shared/Dispatcher';
import Firebase from '../Firebase';
import * as UrlHelper from '../../shared/helpers/UrlHelper';
import * as TraceHelper from '../../shared/helpers/TraceHelper';
import * as Tracer from '../Tracer';

let _name = '';
let _ref = null;
let _posts = [];


function commit() {
    _ref.set(_posts);
}

function emit() {
    FeedStore.setState({
        name: _name,
        posts: _posts,
        inside: _ref !== null
    });
}

function changeName(name) {
    _name = name;
    emit();
}

function enter() {
    if (!_name || !UserStore.state.name)
        return;

    _ref = Firebase.child('feeds/' + _name);

    _ref.on('value', (snap) => {
        _posts = snap.val();

        if (_posts === null) {
            _posts = [];
            _ref.set([]);
        }

        emit();
    });
}

function exit() {
    if (_ref !== null) {
        _ref.off();
        _ref = null;
        _posts = [];
        emit();
    }
}

function addClip(props, tabId) {
    if (_ref === null)
        return;

    let trace = TraceHelper.fixTrace(Tracer.getTrace(tabId));

    let first = _.first(trace);
    let search = first.query ? {
        url: first.url,
        query: first.query,
        user: UserStore.state,
        pages: []
    } : null;

    let last = _.last(trace);
    let page = {
        title: last.title,
        url: last.url,
        favIconUrl: last.favIconUrl,
        user: UserStore.state,
        clips: []
    };

    let clip = _.assign({
        user : UserStore.state
    }, props);

    let posts = _posts;

    if (search) {
        let prevSearch = _.find(posts, s => s.query === search.query);

        if (prevSearch)
            search = prevSearch;
        else
            posts.unshift(search);

        posts = search.pages;
    }

    if (page) {
        let prevPage = _.find(posts, p => p.url === page.url);

        if (prevPage)
            page = prevPage;
        else
            posts.unshift(page);

        page.clips.push(clip);
    }

    commit();
    emit();
}

function removeClip(clip) {
    function tryDeleteFromPage(page) {
        _.remove(page.clips, {text: clip.text});
        return page.clips.length === 0;
    }

    function tryDeleteFromSearch(search) {
        let page = _.find(search.pages, p => tryDeleteFromPage(p));
        _.pull(search.pages, page);
        return search.pages.length === 0;
    }

    let post = _.find(_posts, p => p.query ? tryDeleteFromSearch(p) : tryDeleteFromPage(p));
    _.pull(_posts, post);

    commit();
    emit();
}

function findClip(clip) {
    let result = null;

    function findInPage(page) {
        _.forEach(page.clips, c => {
            if (c.text === clip.text)
                result = c;
        });
    }

    function findInSearch(search) {
        _.forEach(search.pages, p => findInPage(p));
    }

    _.forEach(_posts, p => p.query ? findInSearch(p) : findInPage(p));

    return result;
}


function likeClip(clip) {
    clip = findClip(clip);
    let user = UserStore.state;

    if (!clip.likes)
        clip.likes = [];

    if (_.some(clip.likes, {user: {name: user.name}}))
        _.remove(clip.likes, {user: {name: user.name}});
    else
        clip.likes.unshift({
            user: user
        });

    commit();
    emit();
}

function commentClip(clip, text) {
    clip = findClip(clip);

    if (!clip.comments)
        clip.comments = [];

    clip.comments.unshift({
        user: UserStore.state,
        text: text
    });

    commit();
    emit();
}

let _assists = [];

function loadAssists() {
    if (!_name || !UserStore.state.name)
        return;

    let ref = Firebase.child('assistant/' + _name);
    ref.once('value', (snap) => {
        _assists = snap.val();
    });
}

function assist() {
    if (_assists.length === 0 || _posts.length === 0)
        return;

    _posts.unshift(_assists.shift());

    emit();
}


export default Dispatcher.register(action => {
    switch (action.type) {
        case 'CHANGE_FEED_NAME':
            changeName(action.name);
            break;

        case 'ENTER_FEED':
            enter();
            loadAssists();
            break;

        case 'EXIT_FEED':
            exit();
            break;

        case 'CLIP_TEXT':
            addClip({text: action.text}, action.tabId);
            break;

        case 'REMOVE_CLIP':
            removeClip(action.clip);
            break;

        case 'LIKE_CLIP':
            likeClip(action.clip);
            break;

        case 'COMMENT_CLIP':
            commentClip(action.clip, action.comment);
            break;

        case 'REMOVE_COMMENT':
            commentClip(action.clip, action.comment);
            break;

        case 'ASSIST':
            assist();
            break;
    }
});