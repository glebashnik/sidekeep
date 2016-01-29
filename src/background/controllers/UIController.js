import _ from 'lodash';
import Store from '../../shared/Store';
import Dispatcher from '../../shared/Dispatcher';

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
            Store.state.ui.sidebar = !Store.state.ui.sidebar;
            const iconPath = Store.state.ui.sidebar ? 'images/icon19active.png' : 'images/icon19.png';
            chrome.browserAction.setIcon({path: iconPath});
            Store.emit();
            break;

        case 'TOGGLE_MENU':
            Store.state.ui.menu = !Store.state.ui.menu;
            Store.emit();
            break;

        case 'OPEN_PAGE':
            openPage(action.url, action.tabId);
            break;

        case 'DISMISS_NOTIFICATION':
            Store.state.ui.notification = undefined;
            Store.emit();
            break;

        case 'CLOSE_TAB':
            chrome.tabs.remove(action.tabId);
            break;

        case 'CHANGE_TAB':
            Store.state.ui.tab = action.tab;
            Store.emit();
            break;

        case 'OPEN_HELP':
            Store.state.ui.menu = true;
            Store.state.ui.tab = 'help';
            Store.emit();
            break;

        case 'OPEN_SEARCH':
            Store.state.ui.search = true;
            Store.emit();
            break;

        case 'CLOSE_SEARCH':
            Store.state.ui.search = false;
            Store.emit();
            break;
    }
});