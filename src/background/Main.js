function init() {
    const Dispatcher = require('../shared/Dispatcher');
    const UIStore = require('../shared/stores/UIStore');
    const UserStore = require('../shared/stores/UserStore');
    const FeedStore = require('../shared/stores/FeedStore');
    const PostStore = require('../shared/stores/PostStore');
    const Auth = require('./Auth');

    Dispatcher.initBackground();
    UIStore.initBackground();
    UserStore.initBackground();
    FeedStore.initBackground();
    PostStore.initBackground();

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


chrome.runtime.onInstalled.addListener(() => {
    init();

    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => chrome.tabs.executeScript(tab.id, {file: 'src/content.js'}, () => {
            if (chrome.runtime.lastError)
                console.log(chrome.runtime.lastError.message);
        }))
    })
});



