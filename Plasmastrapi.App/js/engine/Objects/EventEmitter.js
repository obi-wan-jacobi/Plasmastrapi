define(["./Base", "./AtomicKeyPairArray", "./Mixins/Destructible", "./Mixins/Loadable", "./Mixins/Pausable"],
    function(Base, AtomicKeyPairArray, Destructible, Loadable, Pausable) {

    // CLASS EventEmitter
    EventEmitter.prototype = Object.create(Base.prototype);
    EventEmitter.prototype.constructor = EventEmitter;
    function EventEmitter() {
        Base.call(this);
        // private variables
        this.__events = {};
    };
    // private prototypal variables
    EventEmitter.prototype.__eventList = [];
    // private methods
    EventEmitter.prototype.__validateEventIsImplemented = function(event) {
        if (!this.hasEvent(event)) {
            throw new Error(this.constructor.name + ':validateEventIsImplemented - ' + event + ' event is not implemented.');
        }
    };
    EventEmitter.prototype.__validateSubscriber = function(subscriber) {
        if (!subscriber) {
            throw new Error(this.constructor.name + ':validateSubscriber - ' + ' A subscriber object must be supplied.');
        }
        if (Object.getOwnPropertyNames(subscriber).length === 0) {
            throw new Error(this.constructor.name + ':validateSubscriber - ' + ' Subscribers cannot be empty objects.');
        }
    };
    EventEmitter.prototype.__validateCallback = function(callback) {
        if (typeof callback !== 'function') {
            throw new Error(this.constructor.name + ':validateCallback - ' + ' A callback must be supplied as a function.');
        }
    };
    EventEmitter.prototype.__registerEvents = function(/* event1, event2, etc. */) {
        for (var i = 0, L = arguments.length; i < L; i++) {
            var event = arguments[i];
            if (this.hasEvent(event)) {
                throw new Error(this.constructor.name + ':implementEvents - ' + event + ' has already been implemented.');
            }
            if (!this["__" + event]) {
                this["__" + event] = function () { };
            }
            this["__$" + event] = function () {
                arguments.unshift(event);
                this.__fire.apply(this, arguments);
            };
            this.__eventList = this.__eventList.concat(event);
        }
    };
    EventEmitter.prototype.__fire = function(event /*, argument1, argument2, etc... */) {
        this.__validateEventIsImplemented(event);
        if (this.__events[event]) {
            var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1, arguments.length) : null;
            this["__" + event]();
            this.__events[event].forEach(function (subscriber, callback) {
                callback.apply(subscriber, args);
            });
        }
    };
    // public methods
    EventEmitter.prototype.injectEngine = function(engine) {
        Base.prototype.injectEngine.call(this, engine);
        this.__engine.eventEmitterContainer.add(this);
    };
    EventEmitter.prototype.addEventListener = function(event, subscriber, callback) {
        this.__validateEventIsImplemented(event);
        this.__validateSubscriber(subscriber);
        this.__validateCallback(callback);
        if (!this.__events[event]) {
            this.__events[event] = new AtomicKeyPairArray();
        }
        this.__events[event].push(subscriber, callback);
    };
    EventEmitter.prototype.removeEventListener = function(event, subscriber, callback) {
        this.__validateEventIsImplemented(event);
        this.__validateSubscriber(subscriber);
        this.__validateCallback(callback);
        this.__events[event].splice(subscriber, callback);
    };
    EventEmitter.prototype.purgeEventListenersBoundTo = function(subscriber) {
        this.__validateSubscriber(subscriber);
        for (var event in this.__events) {
            if (this.__events.hasOwnProperty(event)) {
                this.__events[event].purgeEntriesWithKey(subscriber);
            }
        }
    };
    EventEmitter.prototype.hasEvent = function(event) {
        return this.__eventList.indexOf(event) > -1 ? true : false;
    };

    // mixins
    EventEmitter.Mixins = {
        Destructible,
        Loadable,
        Pausable
    };

    return EventEmitter;

});