define(['emitter', 'dictionary', 'validator'],
function (Emitter, Dictionary, validator) {

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
    // public prototypal variables
    Object.defineProperties(Container.prototype, {
        'length': {
            get: function () {
                return this.__contents.length;
            }
        }
    });
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
    Container.prototype.add = function(item) {
        this.__contents.add(item, item);
        this.emit('onadd', item);
    };
    Container.prototype.remove = function(item) {
        var removedItem = this.__contents.remove(item);
        if (removedItem) {
            this.emit('onremove', removedItem);
            return removedItem
        }
    };
    Container.prototype.shift = function () {
        return this.__contents.shift();
    };
    Container.prototype.pop = function () {
        return this.__contents.pop();
    };
    Container.prototype.toArray = function () {
        var result = [];
        this.forEach(function (key, value) {
            result.push(value);
        });
        return result;
    };

    return Container;
});