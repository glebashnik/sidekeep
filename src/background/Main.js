import Dispatcher from '../shared/Dispatcher';
import Store from '../shared/Store';
import Actions from '../shared/Actions';
import Auth from './Auth';

let initialized = false;

function init() {
    if (initialized)
        return;

    initialized = true;
    Dispatcher.initBackground();
    Store.initBackground();

    require('./controllers/UserController');
    require('./controllers/FeedController');
    require('./controllers/PostController');
    require('./controllers/ExportController');
    require('./controllers/UIController');
    require('./helpers/TabHelper');
    require('./Tracer');
    require('./ContextMenu');

    Auth.login();
}

chrome.runtime.onStartup.addListener(() => {
    init();
});


chrome.browserAction.onClicked.addListener(() => {
    Actions.toggleSidebar();
});


chrome.runtime.onInstalled.addListener(() => {
    init();

    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => chrome.tabs.executeScript(tab.id, {file: 'src/content.js'}, () => {
            if (chrome.runtime.lastError)
                console.log(chrome.runtime.lastError.message);
        }))
    })
});