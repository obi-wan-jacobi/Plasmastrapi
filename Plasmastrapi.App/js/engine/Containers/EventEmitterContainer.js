define(["../Objects/Container", "../Objects/EventEmitter"], function (Container, EventEmitter) {

    // CLASS EventEmitterContainer
    EventEmitterContainer.prototype = Object.create(Container.prototype);
    EventEmitterContainer.prototype.constructor = EventEmitterContainer;
    function EventEmitterContainer() {
        Container.call(this, EventEmitter);
    };
    EventEmitterContainer.prototype.purge = function (subscriber) {
        this.remove(subscriber);
        this.forEach(function(eventEmitter) {
            eventEmitter.purgeEventListenersBoundTo(subscriber);
        });
    };

    return EventEmitterContainer;

});