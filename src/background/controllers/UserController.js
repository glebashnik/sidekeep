import UserStore from '../../shared/stores/UserStore';
import Dispatcher from '../../shared/Dispatcher';
import md5 from 'md5';
import jdenticon from 'jdenticon';

let _name = '';

function emit() {
    UserStore.setState({
        name: _name
    });
}

export default Dispatcher.register(function (action) {
    switch (action.type) {
        case 'CHANGE_USER_NAME':
            _name = action.name;
            emit();
            break;
    }
});