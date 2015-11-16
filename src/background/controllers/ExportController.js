import Dispatcher from '../../shared/Dispatcher';
import Firebase from '../FirebaseRef';
import FeedStore from '../../shared/stores/FeedStore';

var url = 'https://aftersearchexport.dotcloudapp.com';
//var url = 'http://localhost:9000';

function exportToWord() {
    chrome.downloads.download({
        url: url + '/docx',
        method: 'POST',
        headers: [{name: 'content-type', value: 'application/json'}],
        body: JSON.stringify(FeedStore.state)
    });
}

function exportToPowerpoint() {
    chrome.downloads.download({
        url: url + '/pptx',
        method: 'POST',
        headers: [{name: 'content-type', value: 'application/json'}],
        body: JSON.stringify(FeedStore.state)
    });
}

export default Dispatcher.register(function (action) {
    switch (action.type) {
        case 'EXPORT_TO_WORD':
            exportToWord();
            break;
        case 'EXPORT_TO_POWERPOINT':
            exportToPowerpoint();
            break;
    }
})