import UIStore from '../../shared/stores/UIStore';
import Dispatcher from '../../shared/Dispatcher';

export default Dispatcher.register(function (action) {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            UIStore.setState({sidebarVisible: !UIStore.state.sidebarVisible});
            break;
    }
});