import Dispatcher from './Dispatcher'

const PORT_NAME = 'action';

export default {
    initBackground() {
        chrome.runtime.onConnect.addListener(function (port) {
            if (port.name === PORT_NAME)
                port.onMessage.addListener(action => {
                    Dispatcher.dispatch(action);
                });
        });
    },

    initContent() {
        this.port = chrome.runtime.connect({name: PORT_NAME});
    },

    send(action) {
        if (this.port)
            this.port.postMessage(action);
        else
            Dispatcher.dispatch(action);
    }
}