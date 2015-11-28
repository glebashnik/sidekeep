import _ from 'lodash';
import Store from '../../shared/Store';
import Dispatcher from '../../shared/Dispatcher';

const _storage = chrome.storage.local;

let _ui = {
    sidebar: false,
    feedMenu: false
};

_storage.get('ui', items => {
    if (items.ui.sidebar)
        _ui = items.ui;
    emit();
});

function emit() {
    _storage.set({ui: _ui});
    Store.emitUpdate({ui: _ui});
}

function toggleSidebar() {
    _ui.sidebar = !_ui.sidebar;
    emit();
}

function toggleFeedMenu() {
    _ui.feedMenu = !_ui.feedMenu;
    emit();
}

chrome.browserAction.onClicked.addListener(() => {
    toggleSidebar();
});

function openPage(pageUrl, sourceTabId) {
    chrome.tabs.get(sourceTabId, sourceTab => {
        chrome.tabs.getAllInWindow(sourceTab.windowId, tabs => {
            const openedTab = _.find(tabs, {url: pageUrl});

            if (openedTab)
                chrome.tabs.update(openedTab.id, {highlighted: true});
            else
                chrome.tabs.create({url: pageUrl, index: sourceTab.index + 1});
        });
    })
}

Dispatcher.register(action => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            toggleSidebar();
            break;

        case 'TOGGLE_FEED_MENU':
            toggleFeedMenu();
            break;

        case 'OPEN_PAGE':
            openPage(action.url, action.tabId);
            break;
    }
});