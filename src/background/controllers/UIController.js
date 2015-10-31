import UIStore from '../../shared/stores/UIStore';
import Dispatcher from '../../shared/Dispatcher';

function toggleSidebar() {
    UIStore.setState({sidebarVisible: !UIStore.state.sidebarVisible});
}

chrome.browserAction.onClicked.addListener(() => {
    toggleSidebar();
});

export default Dispatcher.register(function (action) {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            toggleSidebar();
            break;
    }
});