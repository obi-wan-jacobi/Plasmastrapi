define(['emitter'],
function (Emitter) {

    function EventQueue(emitter) {
        validator.validateType(this, emitter, Emitter);
        this.__emitter = emitter;
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
            this.__emitter.__fire(event.name, event.args);
        }
        this.__isExecuting = false;
    };

    return EventQueue;
});