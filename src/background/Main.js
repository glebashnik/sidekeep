let initialized = false;

function init() {
    if (initialized)
        return;

    initialized = true;

    const Dispatcher = require('../shared/Dispatcher');
    const Store = require('../shared/Store');
    const Auth = require('./Auth');

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


chrome.runtime.onInstalled.addListener(() => {
    init();

    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => chrome.tabs.executeScript(tab.id, {file: 'src/content.js'}, () => {
            if (chrome.runtime.lastError)
                console.log(chrome.runtime.lastError.message);
        }))
    })
});



