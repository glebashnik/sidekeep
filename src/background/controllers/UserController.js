import UserStore from '../../shared/stores/UserStore';
import Dispatcher from '../../shared/Dispatcher';
import Firebase from '../Firebase';

let _userRef;
let _user;

function getGoogleToken() {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({interactive: true}, token => {
            if (token)
                resolve(token);
            else
                reject(chrome.runtime.lastError);
        })
    })
}

function getFirebaseAuth(token) {
    return new Promise((resolve, reject) => {
        Firebase.onAuth(auth => {
            if (auth)
                resolve(auth);
            else
                Firebase.authWithOAuthToken('google', token, error => {
                    if (error)
                        reject(error);
                });
        });
    });
}

function initUser(auth) {
    _userRef = Firebase.child('users/' + auth.uid);

    _user = {
        uid: auth.uid,
        name: auth.google.displayName,
        image: auth.google.profileImageURL
    };

    _userRef.set(_user);
    UserStore.setState(_user);
}

getGoogleToken().then(getFirebaseAuth).then(initUser);

export default Dispatcher.register(function (action) {

});