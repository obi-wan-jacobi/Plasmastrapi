define(['emitter', 'enableable', 'destructible', 'loadable', 'drawable'],
function (Emitter, Enableable, Destructible, Loadable, Drawable) {

    // CLASS Component
    Component.prototype = Object.create(Emitter.prototype);
    Component.prototype.constructor = Component;
    function Component(handle, HandleType) {
        if (this.handle) {
            validator.validateType(this, handle, HandleType);
        }
        // private variables
        this.__entity = null;
        this.__handle = handle;
        // inherits from
        Emitter.call(this);
        // apply mixins
        Enableable.call(this);
        Destructible.call(this);
        Loadable.call(this);
        if (this.__handle.draw) {
            Drawable.call(this);
        }
    };
    // private methods
    PickComponent.prototype.__onload = function () {
        this.enable();
    };
    PickComponent.prototype.__onunload = function () {
        this.disable();
    };
    Component.prototype.__registerDependencyOnLoad = function (subject, event, observer, callback) {
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
    Component.prototype.__registerComponentDependencyOnLoad = function (ComponentType, event, observer, callback) {
        var self = this;
        var fnOnLoadProxy = this.__onload || function () { };
        this.__onload = function () {
            var component = this.__entity.getComponent(ComponentType);
            fnOnLoadProxy.apply(self, arguments);
            component.addEventListener(event, observer, callback);
        };
        var fnOnUnloadProxy = this.__onunload || function () { };
        this.__onunload = function () {
            var component = this.__entity.getComponent(ComponentType);
            fnOnUnloadProxy.apply(self, arguments);
            component.removeEventListener(event, observer, callback);
        };
    };
    Component.prototype.__attachEventTriggerToHandleMethod = function (handleMethodName, event) {
        validator.validateEventIsImplemented(this, event);
        validator.validateFunction(this.__handle[handleMethodName]);
        var self = this;
        var fnProxy = this.__handle[handleMethodName];
        this.__handle[handleMethodName] = function () {
            fnProxy.apply(self.__handle, arguments);
            self.emit.apply(self, [event, self.__handle]);
        };
    };
    // public methods
    Component.prototype.setEntity = function(entity) {
        if (this.__entity) {
            validator.throw(this, 'setEntity', 'An entity has already been set for this component');
        }
        this.__entity = entity;
        this.__entity.addEventListener('onload', this, this.load);
        this.__entity.addEventListener('onunload', this, this.unload);
        this.__entity.addEventListener('ondestroy', this, this.destroy);
    };
    Component.prototype.getHandle = function () {
        return this.__handle;
    };
    Component.prototype.getData = function () {
        if (this.__handle) {
            return this.__handle.getData();
        }
    };

    return Component;
});