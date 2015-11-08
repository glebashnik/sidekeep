import UIStore from '../../shared/stores/UIStore';
import Dispatcher from '../../shared/Dispatcher';

function toggleSidebar() {
    UIStore.emitUpdate({sidebar: !UIStore.state.sidebar});
}

function toggleFeedMenu() {
    UIStore.emitUpdate({feedMenu: !UIStore.state.feedMenu});
}

function toggleShareMenu() {
    UIStore.emitUpdate({shareMenu: !UIStore.state.shareMenu});
}

chrome.browserAction.onClicked.addListener(() => {
    toggleSidebar();
});

export default Dispatcher.register(function (action) {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            toggleSidebar();
            break;

        case 'TOGGLE_FEED_MENU':
        case 'SELECT_FEED':
            toggleFeedMenu();
            break;

        case 'TOGGLE_SHARE_MENU':
            toggleShareMenu();
            break;
    }
});