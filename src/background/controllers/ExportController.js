import Dispatcher from '../../shared/Dispatcher';
import Firebase from '../FirebaseRef';
import Store from '../../shared/Store';
import GoogleDriveAPI from '../GoogleDriveAPI';
import Actions from '../../shared/Actions'

const url = 'https://aftersearchexport.dotcloudapp.com';
//const url = 'http://localhost:9000';

function getFeed() {
    const state = Store.state;
    const feed = state.posts;
    feed.name = state.feeds[state.user.selectedFeed].name;
    feed.id = state.user.selectedFeed;
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

function exportToGoogleDoc() {
    const feed = getFeed();
    GoogleDriveAPI.exportFeedToGoogleDoc(feed).then(link => chrome.tabs.create({url: link}));
}

Dispatcher.register((action) => {
    switch (action.type) {
        case 'EXPORT_TO_WORD':
            exportToWord();
            break;
        case 'EXPORT_TO_GOOGLE_DOC':
            exportToGoogleDoc();
            break;
        case 'EXPORT_TO_POWERPOINT':
            exportToPowerpoint();
            break;
    }
});