import Dispatcher from '../../shared/Dispatcher';
import Firebase from '../Firebase';
import FeedStore from '../../shared/stores/FeedStore';

const tasksRef = Firebase.child('/queue/tasks');

function saveFeedToWord() {
    chrome.downloads.download({
        url: 'https://aftersearchexport.dotcloudapp.com/docx',
        method: 'POST',
        headers: [{name: 'content-type', value: 'application/json'}],
        body: JSON.stringify(FeedStore.state)
    });
}

export default Dispatcher.register(function (action) {
    switch (action.type) {
        case 'SAVE_FEED_TO_WORD':
            saveFeedToWord();
            break;
    }
});