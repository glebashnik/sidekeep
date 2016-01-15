import _ from 'lodash';

const PORT_NAME = 'store';

export default {
    state: {
        user: {},
        posts: {},
        feeds: {},
        ui: {},
        tab: 'list',
        isExporting: false
    },

    listeners: [],

    ports: [],


    addListener(callback) {
        this.listeners.push(callback);

        if (this.port)
            this.port.postMessage();
    },

    removeListener(callback) {
        _.pull(this.listeners, callback);
    },

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
                });
            }
        });
    },

    setState(state) {
        this.state = state;
    },

    emitState(state) {
        setState(state);
        this.emit();
    },

    update(state) {
        _.assign(this.state, state);
    },

    emitUpdate(state) {
        this.update(state);
        this.emit();
    },

    emit() {
        if (this.listeners) //in the background page
            this.listeners.forEach(listener => listener(this.state));

        if (this.ports) //in the content script
            this.ports.forEach(port => port.postMessage(this.state));
    }
}