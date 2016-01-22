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

function startExport() {
    Store.state.ui.exporting = true;
    Store.emit();
    setTimeout(endExport, 15000);
}

function endExport() {
    Store.state.ui.exporting = false;
    Store.emit();
}

function exportToWord() {
    startExport();
    
    chrome.downloads.download({
        url: url + '/docx',
        method: 'POST',
        headers: [{name: 'content-type', value: 'application/json'}],
        body: JSON.stringify(getFeed())
    }, endExport);
}

function exportToPowerpoint() {
    startExport();

    chrome.downloads.download({
        url: url + '/pptx',
        method: 'POST',
        headers: [{name: 'content-type', value: 'application/json'}],
        body: JSON.stringify(getFeed())
    }, endExport);
}

function exportToGoogleDoc() {
    startExport();

    const feed = getFeed();
    GoogleDriveAPI.exportFeedToGoogleDoc(feed).then(link => {
        endExport();
        chrome.tabs.create({url: link})
    });
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