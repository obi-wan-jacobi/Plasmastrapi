define(["../Objects/Repository", "../Objects/EventEmitter"], function (Repository, EventEmitter) {

    // CLASS EventEmitterRepository
    EventEmitterRepository.prototype = Object.create(Repository.prototype);
    EventEmitterRepository.prototype.constructor = EventEmitterRepository;
    function EventEmitterRepository() {

        Repository.call(this, EventEmitter);

    };
    EventEmitterRepository.prototype.purge = function (subscriber) {
        this.release(subscriber);
        this.forEach(function(eventEmitter) {
            eventEmitter.purgeEventListenersBoundTo(subscriber);
        });
    };

    return EventEmitterRepository;

});