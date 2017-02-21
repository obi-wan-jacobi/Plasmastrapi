define(["./Base", "./AtomicKeyPairArray", "./Mixins/Destructible", "./Mixins/Loadable", "./Mixins/Pausable"],
function(Base, AtomicKeyPairArray, Destructible, Loadable, Pausable) {

    // CLASS EventEmitter
    EventEmitter.prototype = Object.create(Base.prototype);
    EventEmitter.prototype.constructor = EventEmitter;
    function EventEmitter() {
        Base.call(this);
        this.__events = {};
        this.__lockedEvents = {};
        // events
        this.registerEvents(
            'oninjectengine'
        );
    };
    // private methods
    EventEmitter.prototype.__validateEventIsImplemented = function(event) {
        if (!this.hasEvent(event)) {
            throw new Error(this.constructor.name + ':validateEventIsImplemented - ' + event + ' event is not implemented.');
        }
    };
    EventEmitter.prototype.__validateSubscriber = function(subscriber) {
        if (!subscriber) {
            throw new Error(this.constructor.name + ':validateSubscriber - A subscriber object must be supplied.');
        }
        if (Object.getOwnPropertyNames(subscriber).length === 0) {
            throw new Error(this.constructor.name + ':validateSubscriber - Subscribers cannot be empty objects.');
        }
    };
    EventEmitter.prototype.__validateCallback = function(callback) {
        if (typeof callback !== 'function') {
            throw new Error(this.constructor.name + ':validateCallback - A callback must be supplied as a function.');
        }
    };
    EventEmitter.prototype.__fire = function(event /*, argument1, argument2, etc... */) {
        this.__validateEventIsImplemented(event);
        var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1, arguments.length) : null;
        this["__" + event].apply(this, args);
        // lock new subscriptions on this event to avoid stack overflow
        this.__lockedEvents[event] = new AtomicKeyPairArray();
        this.__events[event].forEach(function (subscriber, callback) {
            callback.apply(subscriber, args);
        });
        // process new subscriptions under lock
        this.__lockedEvents[event].forEach(function (subscriber, callback) {
            this.__events[event].push(subscriber, callback);
        }, this)
        delete this.__lockedEvents[event];
    };
    // public methods
    EventEmitter.prototype.injectEngine = function(engine) {
        Base.prototype.injectEngine.call(this, engine);
        this.__engine.eventEmitterContainer.add(this);
        this.__fire('oninjectengine', engine);
    };
    EventEmitter.prototype.registerEvents = function (/* event1, event2, etc. */) {
        for (var i = 0, L = arguments.length; i < L; i++) {
            var event = arguments[i];
            if (this.hasEvent(event)) {
                throw new Error(this.constructor.name + ':implementEvents - ' + event + ' has already been implemented.');
            }
            // initialize this.__onevent method
            if (!this["__" + event]) {
                this["__" + event] = function () { };
            }
            // initialize this.__$onevent "pass-through" method
            this["__$" + event] = function (event) {
                return function () {
                    Array.prototype.unshift.call(arguments, event);
                    this.__fire.apply(this, arguments);
                };
            }(event);
            this.__events[event] = new AtomicKeyPairArray();
        }
    };
    EventEmitter.prototype.addEventListener = function(event, subscriber, callback) {
        this.__validateEventIsImplemented(event);
        this.__validateSubscriber(subscriber);
        this.__validateCallback(callback);
        if (this.__lockedEvents[event]) {
            this.__lockedEvents[event].push(subscriber, callback);
        }
        else {
            this.__events[event].push(subscriber, callback);
        }
    };
    EventEmitter.prototype.removeEventListener = function(event, subscriber, callback) {
        this.__validateEventIsImplemented(event);
        this.__validateSubscriber(subscriber);
        this.__validateCallback(callback);
        var removedEventListener = null;
        if (this.__lockedEvents[event]) {
            removedEventListener = this.__lockedEvents[event].splice(subscriber, callback);
        }
        if (!removedEventListener) {
            removedEventListener = this.__events[event].splice(subscriber, callback);
        }
        if (!removedEventListener) {
            throw new Error(this.constructor.name + ':removeEventListener - Event ' + event + ' could not be removed.');
        }
    };
    EventEmitter.prototype.purgeEventListenersBoundTo = function(subscriber) {
        this.__validateSubscriber(subscriber);
        for (var event in this.__events) {
            if (this.__events.hasOwnProperty(event)) {
                this.__events[event].purgeItemsWithKey(subscriber);
            }
        }
    };
    EventEmitter.prototype.hasEvent = function(event) {
        return this.__events[event] ? true : false;
    };

    // mixins
    EventEmitter.Mixins = {
        Destructible,
        Loadable,
        Pausable
    };

    return EventEmitter;
});