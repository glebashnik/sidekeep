import Firebase from './Firebase';
import Actions from '../shared/Actions';

export default {
    login() {
        Firebase.onAuth(auth => {
            if (auth)
                Actions.login({
                    id: auth.uid,
                    name: auth.google.displayName,
                    image: auth.google.profileImageURL
                });
            else
                chrome.identity.getAuthToken({interactive: true}, token => {
                    if (token)
                        Firebase.authWithOAuthToken('google', token, error => {
                            if (error)
                                console.log(error);
                        });
                    else
                        console.log(chrome.runtime.lastError)
                });
        });
    }
}