export default class EventBus {
    static instance: EventBus;
    eventListeners:any

    static getInstance() {
        if (typeof EventBus.instance === 'object') {
            return EventBus.instance;
        }
        return new EventBus();
    }

    constructor() {
        if (typeof EventBus.instance === 'object') {
            return EventBus.instance;
        }
        EventBus.instance = this;
        this.eventListeners = {};
    }

    fireEvent(eventName:string, data:any) {
        let listeners = this.eventListeners[eventName];
        if (Array.isArray(listeners)) {
            listeners.map(listener => {
                if (typeof listener === 'function') {
                    listener(data);
                }
            })
        }
    }

    addListener(eventName:string, listener:any) {
        let listeners = this.eventListeners[eventName];
        if (Array.isArray(listeners)) {
            listeners.push(listener);
        } else {
            this.eventListeners[eventName] = [listener];
        }
    }

    
    removeListener(listener:any) {
        Object.keys(this.eventListeners).map(eventName => {
            let listeners = this.eventListeners[eventName];
            this._remove(listeners, listener);
            if (listeners.length === 0) {
                delete this.eventListeners[eventName];
            }
        })
    }

    _remove(array:any, item:any) {
        if (!array) return;
        for (let i = 0, l = array.length; i < l; i++) {
            if (item === array[i]) array.splice(i, 1);
        }
    }
}