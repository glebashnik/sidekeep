import Router from './Router'

export default {
    login(user) {
        Router.send({
            type: 'LOGIN',
            user: user
        });
    },

    toggleSidebar() {
        Router.send({
            type: 'TOGGLE_SIDEBAR'
        });
    },

    toggleFeedMenu() {
        Router.send({
            type: 'TOGGLE_FEED_MENU'
        })
    },

    toggleShareMenu() {
        Router.send({
            type: 'TOGGLE_SHARE_MENU'
        })
    },

    exportToDocx() {
        Router.send({
            type: 'EXPORT_TO_DOCX'
        });
    },

    exportToPptx() {
        Router.send({
            type: 'EXPORT_TO_PPTX'
        });
    },

    createFeed(feedName) {
        Router.send({
            type: 'CREATE_FEED',
            feedName: feedName
        })
    },

    renameFeed(feedId, feedName) {
        Router.send({
            type: 'RENAME_FEED',
            feedId: feedId,
            feedName: feedName
        })
    },

    joinFeed(feedId) {
        Router.send({
            type: 'JOIN_FEED',
            feedId: feedId
        })
    },

    leaveFeed(feedId) {
        Router.send({
            type: 'LEAVE_FEED',
            feedId: feedId
        })
    },

    selectFeed(feedId) {
        Router.send({
            type: 'SELECT_FEED',
            feedId: feedId
        })
    },

    clipText(text, tabId) {
        Router.send({
            type: 'CLIP_TEXT',
            text: text,
            tabId: tabId
        });
    },

    comment(postId, commentText) {
        Router.send({
            type: 'COMMENT',
            postId: postId,
            commentText: commentText
        });
    },

    removePost(postId) {
        Router.send({
            type: 'REMOVE_POST',
            postId: postId
        });
    }
}