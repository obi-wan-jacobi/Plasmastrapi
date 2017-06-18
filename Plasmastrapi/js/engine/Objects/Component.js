define(['emitter', 'drawable'],
function (Emitter, Drawable) {

    // CLASS Component
    Component.prototype = Object.create(Emitter.prototype);
    Component.prototype.constructor = Component;
    function Component(handle, HandleType) {
        validator.validateType(this, handle, HandleType);
        // private variables
        this.__entity = null;
        this.__handle = handle;
        // inherits from
        Emitter.call(this);
        // apply mixins
        Emitter.Mixins.Loadable.call(this);
        Emitter.Mixins.Destructible.call(this);
        if (this.__handle.draw) {
            Drawable.call(this);
        }
    };
    // private methods
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
        validator.validateEventIsImplemented(this, event);
        validator.validateFunction(this.__handle[handleMethodName]);
        var self = this;
        var fnProxy = this.__handle[handleMethodName];
        this.__handle[handleMethodName] = function () {
            fnProxy.apply(self.__handle, arguments);
            self.__fire.apply(self, [event, self.__handle]);
        };
    };
    // public methods
    Component.prototype.injectEntity = function(entity) {
        Emitter.prototype.injectEngine.call(this, entity.__engine);
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