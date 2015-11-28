import _ from 'lodash';

const PORT_NAME = 'store';

export default {
    state: {
        user: {},
        posts: {},
        feeds: {},
        ui: {}
    },

    listeners: [],

    ports: [],

    initContent() {
        this.port = chrome.runtime.connect({name: PORT_NAME});

        this.port.onMessage.addListener(state => {
            this.state = state;
            this.emit();
        });
    },

    initBackground() {
        chrome.runtime.onConnect.addListener(port => {
            if (port.name === PORT_NAME) {
                this.ports.push(port);

                port.onMessage.addListener(() => {
                    port.postMessage(this.state);
                });

                port.onDisconnect.addListener(() => {
                    _.pull(this.ports, port);
                })
            }
        });
    },

    update(state) {
        _.assign(this.state, state);
    },

    emitUpdate(state) {
        this.update(state);
        this.emit();
    },

    emitState(state) {
        this.state = state;
        this.emit();
    },

    emit() {
        if (this.listeners) //in the background page
            this.listeners.forEach(listener => listener());

        if (this.ports) //in the content script
            this.ports.forEach(port => port.postMessage(this.state));
    },

    addListener(callback) {
        this.listeners.push(callback);
        callback();
    },

    removeListener(callback) {
        _.pull(this.listeners, callback);
    }
}