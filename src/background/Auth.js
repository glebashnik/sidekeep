import FirebaseRef from './FirebaseRef';
import Actions from '../shared/Actions';

export default {
    login() {
        FirebaseRef.onAuth(auth => {
            if (auth)
                Actions.login({
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
}