import UserStore from '../../shared/stores/UserStore';
import Dispatcher from '../../shared/Dispatcher';
import Firebase from '../Firebase';

let _userRef;
let _user;

Firebase.onAuth(auth => {
    if (auth) {
        _userRef = Firebase.child('users/' + auth.uid);

        _user = {
            uid: auth.uid,
            name: auth.google.displayName,
            image: auth.google.profileImageURL
        };

        _userRef.set(_user);
        UserStore.setState(_user);
    }
    else {
        chrome.identity.getAuthToken({interactive: true}, token => {
            if (token)
                Firebase.authWithOAuthToken('google', token, error => {
                    if (error) {
                        console.log(error);
                    }
                });
            else {
                console.log(chrome.runtime.lastError)
            }
        });
    }
});

export default Dispatcher.register(function (action) {

});