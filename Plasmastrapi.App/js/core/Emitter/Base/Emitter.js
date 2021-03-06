define(['dictionary', 'utils', 'utils-config'],
function(Dictionary, utils) {

    function Emitter() {
        this.__events = {};
        this.__eventsBuffer = {};
    };
    // public methods
    Emitter.prototype.registerEvents = function (/* event1, event2, etc... */) {
        for (var i = 0, L = arguments.length; i < L; i++) {
            var event = arguments[i];
            if (this.hasEvent(event)) {
                utils.validator.throw(this, 'registerEvents', `${event} has already been implemented`);
            }
            // initialize this.__onevent method
            if (!this["__" + event]) {
                this["__" + event] = function () { };
            }
            // initialize this.__$onevent "pass-through" method
            this["__$" + event] = function (event) {
                return function () {
                    [].unshift.call(arguments, event);
                    this.emit.apply(this, arguments);
                };
            }(event);
            this.__events[event] = new Dictionary('object');
        }
    };
    Emitter.prototype.emit = function (event /*, argument1, argument2, etc... */) {
        utils.validator.validateEventIsRegistered(this, event);
        var args = arguments.length > 1 ? [].slice.call(arguments, 1, arguments.length) : null;
        // call owner's event callback first
        this["__" + event].apply(this, args);
        // buffer new subscriptions on this event to avoid callstack overflow
        this.__eventsBuffer[event] = new Dictionary('object');
        this.__events[event].forEach(function (subscriber, callback) {
            callback.apply(subscriber, args);
        });
        // process new subscriptions in buffer
        this.__eventsBuffer[event].forEach(function (subscriber, callback) {
            this.__events[event].add(subscriber, callback);
        }, this)
        delete this.__eventsBuffer[event];
    };
    Emitter.prototype.addEventListener = function(event, subscriber, callback) {
        utils.validator.validateEventIsRegistered(this, event);
        utils.validator.validateObject(this, subscriber);
        utils.validator.validateFunction(this, callback); 
        if (this.__eventsBuffer[event]) {
            this.__eventsBuffer[event].add(subscriber, callback);
        }
        else {
            this.__events[event].add(subscriber, callback);
        }
    };
    // Returns callback if subscriber exists, otherwise returns empty function
    Emitter.prototype.removeEventListener = function(event, subscriber) {
        utils.validator.validateEventIsRegistered(this, event);
        utils.validator.validateObject(this, subscriber);
        var removedKeyPair = null;
        if (this.__eventsBuffer[event]) {
            removedKeyPair = this.__eventsBuffer[event].remove(subscriber);
        }
        if (!removedKeyPair) {
            removedKeyPair = this.__events[event].remove(subscriber);
        }
        if (!removedKeyPair) {
            if (utils.config.isInfoLoggingActiveOnFailedEventListenerRemoval) {
                utils.logging.info(this, 'removeEventListener', `${subscriber.constructor.name} was not subscribed to ${this.constructor.name} for event ${event}`)
            }
            return function () { };
        }
        return removedKeyPair.value;
    };
    Emitter.prototype.purgeEventListener = function(subscriber) {
        utils.validator.validateObject(this, subscriber);
        for (var event in this.__events) {
            if (this.__events.hasOwnProperty(event)) {
                this.__events[event].remove(subscriber);
            }
        }
    };
    Emitter.prototype.hasEvent = function(event) {
        return this.__events[event] ? true : false;
    };

    return Emitter;
});