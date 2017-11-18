define(['system'],
function (System) {

    CacheSystem.prototype = Object.create(System.prototype);
    CacheSystem.prototype.constructor = CacheSystem;
    function CacheSystem(engine) {
        System.call(this, engine);
        this.__emitterContainer = null;
    };
    // private methods
    CacheSystem.prototype.__oninit = function () {
        System.prototype.__oninit.call(this);
        this.__emitterContainer = this.__engine.getFactory('emitter-factory').getContainer();
    };
    // public methods
    CacheSystem.prototype.loopOnce = function () {
        this.__emitterContainer.freeNextDestroyedItem();
        return true;
    };

    return CacheSystem;
});