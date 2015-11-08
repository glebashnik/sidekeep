import _ from 'lodash';

export default class Store {
    constructor(name, state = {}) {
        this.name = name;
        this.state = state;
    }

    initContent() {
        this.callbacks = [];
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

    emit() {
        if (this.callbacks)
            this.callbacks.forEach(c => c());

        if (this.ports)
            this.ports.forEach(p => p.postMessage(this.state));
    }

    addListener(callback) {
        this.callbacks.push(callback);
        callback();
    }

    removeListener(callback) {
        _.pull(this.callbacks, callback);
    }
}