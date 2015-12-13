import Dispatcher from './Dispatcher'

export default {
    login(user) {
        Dispatcher.dispatch({
            type: 'LOGIN',
            user: user
        });
    },

    toggleSidebar() {
        Dispatcher.dispatch({
            type: 'TOGGLE_SIDEBAR'
        });
    },

    toggleFeedMenu() {
        Dispatcher.dispatch({
            type: 'TOGGLE_FEED_MENU'
        })
    },

    dismissNotification() {
        Dispatcher.dispatch({
            type: 'DISMISS_NOTIFICATION'
        })
    },

    createFeed() {
        Dispatcher.dispatch({
            type: 'CREATE_FEED'
        })
    },

    exportToWord() {
        Dispatcher.dispatch({
            type: 'EXPORT_TO_WORD'
        });
    },

    addFeed(feedName) {
        Dispatcher.dispatch({
            type: 'ADD_FEED',
            feedName: feedName
        })
    },

    renameFeed(feedId, feedName) {
        Dispatcher.dispatch({
            type: 'RENAME_FEED',
            feedId: feedId,
            feedName: feedName
        })
    },

    removeFeed(feedId) {
        Dispatcher.dispatch({
            type: 'REMOVE_FEED',
            feedId: feedId
        })
    },

    joinFeed(feedId, feedPassword) {
        Dispatcher.dispatch({
            type: 'JOIN_FEED',
            feedId: feedId,
            feedPassword: feedPassword
        })
    },

    leaveFeed(feedId) {
        Dispatcher.dispatch({
            type: 'LEAVE_FEED',
            feedId: feedId
        })
    },

    selectFeed(feedId) {
        Dispatcher.dispatch({
            type: 'SELECT_FEED',
            feedId: feedId
        })
    },

    addText(text, tabId) {
        Dispatcher.dispatch({
            type: 'ADD_TEXT',
            text: text,
            tabId: tabId
        });
    },

    addPage(tabId) {
        Dispatcher.dispatch({
            type: 'ADD_PAGE',
            tabId: tabId
        });
    },

    addImage(imageUrl, tabId) {
        Dispatcher.dispatch({
            type: 'ADD_IMAGE',
            imageUrl: imageUrl,
            tabId: tabId
        });
    },

    addComment(postId, text) {
        Dispatcher.dispatch({
            type: 'ADD_COMMENT',
            postId: postId,
            text: text
        });
    },

    movePost(postId) {
        Dispatcher.dispatch({
            type: 'MOVE_POST',
            postId: postId
        });
    },

    removePost(postId) {
        Dispatcher.dispatch({
            type: 'REMOVE_POST',
            postId: postId
        });
    },

    openPage(url) {
        Dispatcher.dispatch({
            type: 'OPEN_PAGE',
            url: url
        });
    },

    selectPost(postId) {
        Dispatcher.dispatch({
            type: 'SELECT_POST',
            postId: postId
        });
    }
}