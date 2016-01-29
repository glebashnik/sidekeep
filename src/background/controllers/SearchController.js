import _ from 'lodash';
import Store from '../../shared/Store';
import Dispatcher from '../../shared/Dispatcher';

function search(query) {

}

Dispatcher.register(action => {
    switch (action.type) {
        case 'OPEN_SEARCH':
            Store.state.ui.search = true;
            Store.emit();
            break;

        case 'CLOSE_SEARCH':
            Store.state.ui.search = false;
            Store.emit();
            break;

        case 'SEARCH':
            search(action.query);
            break;
    }
});