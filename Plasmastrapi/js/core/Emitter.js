define(['dictionary'],
function(Dictionary) {

    // CLASS Emitter
    function Emitter() {
        this.__events = {};
        this.__lockedEvents = {};
    };
    // private methods
    Emitter.prototype.__fire = function (event /*, argument1, argument2, etc... */) {
        validator.validateEventIsImplemented(this, event);
        var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1, arguments.length) : null;
        this["__" + event].apply(this, args);
        // lock new subscriptions on this event to avoid callstack overflow
        this.__lockedEvents[event] = new Dictionary();
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
    Emitter.prototype.registerEvents = function (/* event1, event2, etc... */) {
        for (var i = 0, L = arguments.length; i < L; i++) {
            var event = arguments[i];
            if (this.hasEvent(event)) {
                validator.throw(this, 'registerEvents', event + ' has already been implemented');
            }
            // initialize this.__onevent method
            if (!this["__" + event]) {
                this["__" + event] = function () { };
            }
            // initialize this.__$onevent "pass-through" method
            this["__$" + event] = function (event) {
                return function () {
                    [].unshift.call(arguments, event);
                    this.__fire.apply(this, arguments);
                };
            }(event);
            this.__events[event] = new Dictionary();
        }
    };
    Emitter.prototype.addEventListener = function(event, subscriber, callback) {
        validator.validateEventIsImplemented(this, event);
        validator.validateObject(subscriber);
        validator.validateFunction(callback); 
        if (this.__lockedEvents[event]) {
            this.__lockedEvents[event].push(subscriber, callback);
        }
        else {
            this.__events[event].push(subscriber, callback);
        }
    };
    Emitter.prototype.removeEventListener = function(event, subscriber, callback) {
        validator.validateEventIsImplemented(this, event);
        validator.validateObject(subscriber);
        validator.validateFunction(callback); 
        var removedEventListener = null;
        if (this.__lockedEvents[event]) {
            removedEventListener = this.__lockedEvents[event].splice(subscriber, callback);
        }
        if (!removedEventListener) {
            removedEventListener = this.__events[event].splice(subscriber, callback);
        }
        if (!removedEventListener) {
            validator.throw(this, 'removeEventListener', 'Event ' + event + ' could not be removed');
        }
    };
    Emitter.prototype.purgeEventListenersBoundTo = function(subscriber) {
        validator.validateObject(subscriber);
        for (var event in this.__events) {
            if (this.__events.hasOwnProperty(event)) {
                this.__events[event].drop(subscriber);
            }
        }
    };
    Emitter.prototype.hasEvent = function(event) {
        return this.__events[event] ? true : false;
    };

    return Emitter;
});