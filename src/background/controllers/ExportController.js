import Dispatcher from '../../shared/Dispatcher';
import Firebase from '../FirebaseRef';
import UserStore from '../../shared/stores/UserStore';
import FeedStore from '../../shared/stores/FeedStore';
import PostStore from '../../shared/stores/PostStore';

const url = 'https://aftersearchexport.dotcloudapp.com';
//const url = 'http://localhost:9000';

function getFeed() {
    const feed = PostStore.state.root;
    feed.name = FeedStore.state[UserStore.state.selectedFeed].name;
    return feed;
}

function exportToWord() {
    chrome.downloads.download({
        url: url + '/docx',
        method: 'POST',
        headers: [{name: 'content-type', value: 'application/json'}],
        body: JSON.stringify(getFeed())
    });
}

function exportToPowerpoint() {
    chrome.downloads.download({
        url: url + '/pptx',
        method: 'POST',
        headers: [{name: 'content-type', value: 'application/json'}],
        body: JSON.stringify(getFeed())
    });
}

export default Dispatcher.register((action) => {
    switch (action.type) {
        case 'EXPORT_TO_WORD':
            exportToWord();
            break;
        case 'EXPORT_TO_POWERPOINT':
            exportToPowerpoint();
            break;
    }
})