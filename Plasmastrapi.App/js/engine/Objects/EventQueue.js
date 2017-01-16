define(["./EventEmitter"], function (EventEmitter) {

    function EventQueue(emitter) {
        if (!(emitter instanceof EventEmitter)) {
            throw new Error(this.constructor.name + ":constructor - Constructor argument must be an instance of EventEmitter.");
        }
        this.__eventOwner = emitter;
        this.__queue = [];
        this.__isExecuting = false;
    };
    EventQueue.prototype.push = function (eventName, eventArgs) {
        this.__queue.push({ name: eventName, args: eventArgs });
    };
    EventQueue.prototype.process = function() {
        if (this.__isExecuting) {
            return;
        }
        this.__isExecuting = true;
        while (this.__queue.length > 0) {
            var event = this.__queue.shift();
            this.__eventOwner.__fire(event.name, event.args);
        }
        isExecuting = false;
    };

    return EventQueue;
});