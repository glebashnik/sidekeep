import Dispatcher from '../../shared/Dispatcher';
import Store from '../../shared/Store';
import Actions from '../../shared/Actions';
import FirebaseRef from '../FirebaseRef';

const USERS_REF = FirebaseRef.child('users');
let _userRef = null;

function startLogin() {
    FirebaseRef.onAuth(auth => {
        if (auth)
            Actions.endLogin({
                id: auth.uid,
                name: auth.google.displayName,
                image: auth.google.profileImageURL
            });
        else
            chrome.identity.getAuthToken({interactive: true}, token => {
                if (token)
                    FirebaseRef.authWithOAuthToken('google', token, error => {
                        if (error)
                            console.log(error);
                    });
                else
                    console.log(chrome.runtime.lastError)
            });
    });
}


function endLogin(user) {
    if (_userRef)
        _userRef.off('value', _updated);

    _userRef = USERS_REF.child(user.id);

    _userRef.once('value', snap => {
        if (snap.val() === null)
            Actions.addStartFeed();

        _userRef.update({
            name: user.name,
            image: user.image
        });

        _userRef.on('value', _updated);
    });
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
        case 'START_LOGIN':
            startLogin();
            break;

        case 'END_LOGIN':
            endLogin(action.user);
            break;
    }
});