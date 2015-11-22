import _ from 'lodash';

export default class Store {
    constructor(name, state = {}) {
        this.name = name;
        this.state = state;
    }

    initContent() {
        this.listeners = [];
        this.port = chrome.runtime.connect({name: this.name});

        this.port.onMessage.addListener(state => {
            this.state = state;
            this.emit();
        });

        this.port.postMessage({});
    }

    initBackground() {
        this.ports = [];

        chrome.runtime.onConnect.addListener(port => {
            if (port.name === this.name) {
                this.ports.push(port);

                port.onMessage.addListener(() => {
                    port.postMessage(this.state);
                });

                port.onDisconnect.addListener(() => {
                    _.pull(this.ports, port);
                })
            }
        });
    }

    update(state) {
        _.assign(this.state, state);
    }

    emitUpdate(state) {
        this.update(state);
        this.emit();
    }

    emitState(state) {
        this.state = state;
        this.emit();
    }

    emit() {
        if (this.listeners)
            this.listeners.forEach(listener => listener());

        if (this.ports)
            this.ports.forEach(port => port.postMessage(this.state));
    }

    addListener(callback) {
        this.listeners.push(callback);
        callback();
    }

    removeListener(callback) {
        _.pull(this.listeners, callback);
    }
}