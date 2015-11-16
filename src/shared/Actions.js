import ActionRouter from './ActionRouter'

export default {
    login(user) {
        ActionRouter.send({
            type: 'LOGIN',
            user: user
        });
    },

    toggleSidebar() {
        ActionRouter.send({
            type: 'TOGGLE_SIDEBAR'
        });
    },

    toggleFeedMenu() {
        ActionRouter.send({
            type: 'TOGGLE_FEED_MENU'
        })
    },

    toggleActionsMenu() {
        ActionRouter.send({
            type: 'TOGGLE_ACTIONS_MENU'
        })
    },

    createFeed() {
        ActionRouter.send({
            type: 'CREATE_FEED'
        })
    },

    exportToWord() {
        ActionRouter.send({
            type: 'EXPORT_TO_WORD'
        });
    },

    createFeed(feedName) {
        ActionRouter.send({
            type: 'CREATE_FEED',
            feedName: feedName
        })
    },

    renameFeed(feedId, feedName) {
        ActionRouter.send({
            type: 'RENAME_FEED',
            feedId: feedId,
            feedName: feedName
        })
    },

    removeFeed(feedId) {
        ActionRouter.send({
            type: 'REMOVE_FEED',
            feedId: feedId
        })
    },

    joinFeed(feedId) {
        ActionRouter.send({
            type: 'JOIN_FEED',
            feedId: feedId
        })
    },

    leaveFeed(feedId) {
        ActionRouter.send({
            type: 'LEAVE_FEED',
            feedId: feedId
        })
    },

    selectFeed(feedId) {
        ActionRouter.send({
            type: 'SELECT_FEED',
            feedId: feedId
        })
    },

    clipText(text, tabId) {
        ActionRouter.send({
            type: 'CLIP_TEXT',
            text: text,
            tabId: tabId
        });
    },

    clipPage(tabId) {
        ActionRouter.send({
            type: 'CLIP_PAGE',
            tabId: tabId
        });
    },

    clipImage(imageUrl, tabId) {
        ActionRouter.send({
            type: 'CLIP_IMAGE',
            imageUrl: imageUrl,
            tabId: tabId
        });
    },

    comment(postId, commentText) {
        ActionRouter.send({
            type: 'COMMENT',
            postId: postId,
            commentText: commentText
        });
    },

    removePost(postId) {
        ActionRouter.send({
            type: 'REMOVE_POST',
            postId: postId
        });
    },

    openPage(url) {
        ActionRouter.send({
            type: 'OPEN_PAGE',
            url: url
        });
    },

    selectPost(postId) {
        ActionRouter.send({
            type: 'SELECT_POST',
            postId: postId
        });
    }
}