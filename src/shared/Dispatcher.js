const PORT_NAME = 'action';

export default {
    callbacks: [],

    register(callback) {
        this.callbacks.push(callback);
    },

    dispatch(action) {
        if (this.port) // in the content script
            this.port.postMessage(action);
        else // in the background page
            this.callbacks.forEach(c => c(action));
    },

    initBackground() {
        console.log('initBackground');
        chrome.runtime.onConnect.addListener(port => {
            if (port.name === PORT_NAME)
                port.onMessage.addListener(action => {
                    action.tabId = port.sender.tab.id;
                    this.dispatch(action);
                });
        });
    },

    initContent() {
        this.port = chrome.runtime.connect({name: PORT_NAME});
    }
}