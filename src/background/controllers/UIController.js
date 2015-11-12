import _ from 'lodash';
import UIStore from '../../shared/stores/UIStore';
import Dispatcher from '../../shared/Dispatcher';

function toggleSidebar() {
    UIStore.emitUpdate({sidebar: !UIStore.state.sidebar});
}

function toggleFeedMenu() {
    UIStore.emitUpdate({feedMenu: !UIStore.state.feedMenu});
}

chrome.browserAction.onClicked.addListener(() => {
    toggleSidebar();
});

function openPage(pageUrl, windowId, tabId) {
    chrome.tabs.getAllInWindow(windowId, tabs => {
        const openedTab = _.find(tabs, {url: pageUrl});

        if (openedTab)
            chrome.tabs.update(openedTab.id, {highlighted: true});
        else
            chrome.tabs.get(tabId, sourceTab => {
                chrome.tabs.create({url: pageUrl, index: sourceTab.index + 1});
            });
    });
}

export default Dispatcher.register(action => {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            toggleSidebar();
            break;

        case 'TOGGLE_FEED_MENU':
        case 'SELECT_FEED':
            toggleFeedMenu();
            break;

        case 'OPEN_PAGE':
            openPage(action.url, action.windowId, action.tabId);
    }
});