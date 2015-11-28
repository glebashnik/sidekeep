import $ from 'jquery';
import Dispatcher from '../../shared/Dispatcher';
import Store from '../../shared/Store';
import FirebaseRef from '../FirebaseRef';

const USERS_REF = FirebaseRef.child('users');

let _userRef = null;

function login(user) {
    if (_userRef)
        _userRef.off('value', _updated);

    _userRef = USERS_REF.child(user.id);

    _userRef.update({
        name: user.name,
        image: user.image
    });

    _userRef.on('value', _updated);
}

function _updated(snap) {
    const val = snap.val();

    Store.emitUpdate({
        user: {
            id: snap.key(),
            name: val.name,
            image: val.image,
            selectedFeed: val.selectedFeed
        }
    });
}

Dispatcher.register((action) => {
    switch (action.type) {
        case 'LOGIN':
            login(action.user);
            break;
    }
});