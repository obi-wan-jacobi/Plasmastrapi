define(['event-emitter', 'drawable'],
function (EventEmitter, Drawable) {

    // CLASS Component
    Component.prototype = Object.create(EventEmitter.prototype);
    Component.prototype.constructor = Component;
    function Component(handle, HandleType) {
        // private variables
        this.__entity = null;
        this.__handle = handle;
        this.__validateHandleType(HandleType)
        // inherits from
        EventEmitter.call(this);
        // apply mixins
        EventEmitter.Mixins.Loadable.call(this);
        EventEmitter.Mixins.Destructible.call(this);
        if (this.__handle.draw) {
            Drawable.call(this);
        }
    };
    // private methods
    Component.prototype.__validateHandleType = function (HandleType) {
        if (!(this.__handle instanceof HandleType)) {
            throw new Error(this.constructor.name + ':validateHandleType - ' + this.__handle.constructor.name + ' must be of type ' + HandleType.name);
        }
    };
    Component.prototype.__validateHandleMethod = function (handleMethodName) {
        if (typeof this.__handle[handleMethodName] !== 'function') {
            throw new Error(this.constructor.name + ':validateHandleMethod - The supplied argument must be a function.');
        }
    };
    Component.prototype.__injectHandleMethodEventCallback = function (handleMethodName, event) {
        this.__validateEventIsImplemented(event);
        this.__validateHandleMethod(fn);
        var self = this;
        var fnProxy = this.__handle[handleMethodName];
        this.__handle[handleMethodName] = function () {
            var returnArgs = fnProxy.apply(this.__handle, arguments) || [];
            if (!(returnArgs instanceof Array)) {
                returnArgs = [returnArgs];
            }
            self.__fire.apply(this, [event].concat(returnArgs));
        };
    };
    // public methods
    Component.prototype.injectEntity = function(entity) {
        EventEmitter.prototype.injectEngine.call(this, entity.__engine);
        this.__entity = entity;
        this.__entity.addEventListener('onload', this, this.load);
        this.__entity.addEventListener('onunload', this, this.unload);
        this.__entity.addEventListener('ondestroy', this, this.destroy);
    };
    Component.prototype.getHandle = function () {
        return this.__handle;
    };
    Component.prototype.setHandle = function (handle) {
        this.__handle = handle;
    };
    Component.prototype.getTarget = function () {
        return this.__handle.getTarget();
    };

    return Component;
});