import Router from './Router'

export default {
    toggleSidebar() {
        Router.send({
            type: 'TOGGLE_SIDEBAR'
        });
    },

    changeUserName(name) {
        Router.send({
            type: 'CHANGE_USER_NAME',
            name: name
        });
    },

    changeFeedName(name) {
        Router.send({
            type: 'CHANGE_FEED_NAME',
            name: name
        });
    },

    enterFeed() {
        Router.send({
            type: 'ENTER_FEED'
        });
    },

    exitFeed() {
        Router.send({
            type: 'EXIT_FEED'
        });
    },

    clipText(text, tabId) {
        Router.send({
            type: 'CLIP_TEXT',
            text: text,
            tabId: tabId
        });
    },

    clipImage(srcUrl, tabId) {
        Router.send({
            type: 'CLIP_TEXT',
            srcUrl: srcUrl,
            tabId: tabId
        });
    },

    likeClip(clip) {
        Router.send({
            type: 'LIKE_CLIP',
            clip: clip
        });
    },

    commentClip(clip, comment) {
        Router.send({
            type: 'COMMENT_CLIP',
            clip: clip,
            comment: comment
        });
    },

    removeClip(clip) {
        Router.send({
            type: 'REMOVE_CLIP',
            clip: clip
        });
    },

    removeComment(comment) {
        Router.send({
            type: 'REMOVE_COMMENT',
            comment: comment
        });
    },

    assist() {
        Router.send({
            type: 'ASSIST'
        });
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
    }
}