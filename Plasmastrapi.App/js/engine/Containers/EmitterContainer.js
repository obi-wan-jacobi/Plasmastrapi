define(['container', 'linked-list'],
function (Container, LinkedList) {

    EmitterContainer.prototype = Object.create(Container.prototype);
    EmitterContainer.prototype.constructor = EmitterContainer;
    function EmitterContainer() {
        Container.call(this, 'emitter');
        this.__destroyedItemsBuffer = new LinkedList('emitter');
    };
    EmitterContainer.prototype.add = function (emitter) {
        Container.prototype.add.call(this, emitter);
        emitter.addEventListener('ondestroy', this, this.purge.bind(this, emitter));
    };
    EmitterContainer.prototype.purge = function (subscriber) {
        this.remove(subscriber);
        this.__destroyedItemsBuffer.push(subscriber);
    };
    EmitterContainer.prototype.freeNextDestroyedItem = function () {
        var destroyedItem = this.__destroyedItemsBuffer.shift();
        if (!destroyedItem) {
            return;
        }
        this.forEach(function (emitter) {
            emitter.purgeEventListener(destroyedItem);
        });
    };

    return EmitterContainer;
});