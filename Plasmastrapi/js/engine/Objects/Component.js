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
    Component.prototype.__registerLoadableDependency = function (subject, event, observer, callback) {
        var self = this;
        var fnOnLoadProxy = this.__onload || function () { };
        this.__onload = function () {
            fnOnLoadProxy.apply(self, arguments);
            subject.addEventListener(event, observer, callback);
        };
        var fnOnUnloadProxy = function () { };
        this.__onunload = function () {
            fnOnUnloadProxy.apply(self, arguments);
            subject.removeEventListener(event, observer, callback);
        };
    };
    Component.prototype.__registerLoadableComponentDependency = function (ComponentType, event, observer, callback) {
        var self = this;
        var fnOnLoadProxy = this.__onload || function () { };
        this.__onload = function () {
            var component = this.__entity.getComponent(ComponentType);
            fnOnLoadProxy.apply(self, arguments);
            component.addEventListener(event, observer, callback);
        };
        var fnOnUnloadProxy = function () { };
        this.__onunload = function () {
            var component = this.__entity.getComponent(ComponentType);
            fnOnUnloadProxy.apply(self, arguments);
            component.removeEventListener(event, observer, callback);
        };
    };
    Component.prototype.__injectHandleMethodEventCallback = function (handleMethodName, event) {
        this.__validateEventIsImplemented(event);
        this.__validateHandleMethod(fn);
        var self = this;
        var fnProxy = this.__handle[handleMethodName];
        this.__handle[handleMethodName] = function () {
            fnProxy.apply(self.__handle, arguments);
            self.__fire.apply(self, [event, self.__handle]);
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
    Component.prototype.getData = function () {
        return this.__handle.getData();
    };

    return Component;
});