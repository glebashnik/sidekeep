import Dispatcher from './Dispatcher'

export default {
    startLogin() {
        Dispatcher.dispatch({
            type: 'START_LOGIN'
        });
    },

    endLogin(user) {
        Dispatcher.dispatch({
            type: 'END_LOGIN',
            user: user
        });
    },

    toggleSidebar() {
        Dispatcher.dispatch({
            type: 'TOGGLE_SIDEBAR'
        });
    },

    toggleMenu() {
        Dispatcher.dispatch({
            type: 'TOGGLE_MENU'
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

    exportToPowerPoint() {
        Dispatcher.dispatch({
            type: 'EXPORT_TO_POWERPOINT'
        });
    },

    exportToGoogleDoc() {
        Dispatcher.dispatch({
            type: 'EXPORT_TO_GOOGLE_DOC'
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
    },

    closeTab() {
        Dispatcher.dispatch({
            type: 'CLOSE_TAB'
        });
    },

    changeTab(tab) {
        Dispatcher.dispatch({
            type: 'CHANGE_TAB',
            tab: tab
        });
    },

    openHelp() {
        Dispatcher.dispatch({
            type: 'OPEN_HELP'
        });
    },

    openSearch() {
        Dispatcher.dispatch({
            type: 'OPEN_SEARCH'
        });
    },

    closeSearch() {
        Dispatcher.dispatch({
            type: 'CLOSE_SEARCH'
        });
    },

    search(query) {
        Dispatcher.dispatch({
            type: 'SEARCH',
            query: query
        });
    }
}