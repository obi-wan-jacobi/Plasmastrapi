define(['emitter', 'dictionary', 'validator'],
function (Emitter, Dictionary, validator) {

    // CLASS Container
    Container.prototype = Object.create(Emitter.prototype);
    Container.prototype.constructor = Container;
    function Container(typeString) {
        Emitter.call(this);
        this.__contents = new Dictionary(typeString);
        this.registerEvents(
            'onadd',
            'onremove'
        );
    };
    // public methods
    Container.prototype.addEventListener = function (event, subscriber, callback) {
        if (subscriber.isDestructible || subscriber.destroy) {
            validator.throw(this, 'addEventListener', `${subscriber.name} cannot listen to a container if it can be destroyed`);
        }
        Emitter.prototype.addEventListener.call(this, event, subscriber, callback);
    };
    Container.prototype.forEach = function (fn, /* optional */ caller) {
        return this.__contents.forEach(fn, caller);
    };
    Container.prototype.get = function (item) {
        this.__contents.get(item);
    };
    Container.prototype.add = function(item) {
        this.__contents.add(item, item);
        this.emit('onadd', item);
    };
    Container.prototype.remove = function(item) {
        this.__contents.remove(item);
        this.emit('onremove', item);
    };

    return Container;
});