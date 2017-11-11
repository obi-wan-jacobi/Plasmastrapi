define(['emitter', 'component', 'dictionary', 'loadable', 'destructible', 'primitive', 'display-settings', 'position', 'utils'],
function (Emitter, Component, Dictionary, Loadable, Destructible, Primitive, DisplaySettings, Position, utils) {

    // CLASS Entity
    Entity.prototype = Object.create(Emitter.prototype);
    Entity.prototype.constructor = Entity;
    function Entity() {
        // inherits from
        Emitter.call(this);
        // private variables
        this.__parent = null;
        this.__components = new Dictionary(Component);
        // apply mixins
        Loadable.call(this);
        Destructible.call(this);
    };
    // private methods
    Entity.prototype.__oninit = function () { };
    Entity.prototype.__onload = function () { };
    Entity.prototype.__onunload = function () { };
    Entity.prototype.__ondestroy = function () { };
    // public methods
    Entity.prototype.addDependency = function (dependency) {
        utils.validator.validateInstanceType(this, dependency, Entity);
        // wire-up event subscriptions
        dependency.addEventListener('onload', this, this.load);
        dependency.addEventListener('onunload', this, this.unload);
        dependency.addEventListener('ondestroy', this, this.destroy);
    };
    Entity.prototype.addParent = function (parent) {
        if (this.__parent) {
            utils.validator.throw(this, 'addParent', 'This entity already has a parent');
        }
        this.addDependency(parent);
        this.__parent = parent;
    };
    Entity.prototype.addComponent = function (component) {
        this.__components.add(utils.modules.getModuleName(component), component);
        component.setEntity(this);
        if (this.isLoaded) {
            this.reload();
        }
    };
    Entity.prototype.getComponent = function (componentString) {
        return this.__components.get(componentString);
    };
    Entity.prototype.hasComponent = function (componentString) {
        return this.getComponent(componentString) ? true : false;
    };
    Entity.prototype.forEachComponent = function (fn, /* optional */ caller) {
        return this.__components.forEach(fn, caller);
    };
    Entity.prototype.set = function (data) {
        var baseClass = data;
        if (Object.getPrototypeOf(data).constructor.name === (function () { }).constructor.name) {
            baseClass = function pick() { };
        }
        if (data instanceof Primitive) {
            while (Object.getPrototypeOf(baseClass).constructor.name !== 'Object' && Object.getPrototypeOf(baseClass).constructor.name !== Primitive.name) {
                baseClass = Object.getPrototypeOf(baseClass);
            }
        }
        var modulePrefix = utils.modules.getModuleName(baseClass);
        var component = this.getComponent(`${modulePrefix}-component`);
        if (data instanceof DisplaySettings) {
            var DisplaySettingsType = utils.modules.require(`${modulePrefix}-display-settings`);
            component.getHandle().setDisplaySettings(data);
        } else {
            component.getHandle().setData(data);
        }
    };
    Entity.prototype.follow = function (entityToFollow, positionOffset) {
        var poseComponentToFollow = entityToFollow.getComponent('pose-component')
        var poseComponent = this.getComponent('pose-component');
        poseComponentToFollow.addEventListener('onpositionchange', this, function () {
            var position = poseComponentToFollow.getHandle().getPosition();
            var orientation = poseComponentToFollow.getHandle().getOrientation();
            var templateX = positionOffset.x;
            var templateY = positionOffset.y;
            var x = templateX * Math.cos(orientation) - templateY * Math.sin(orientation) + position.x;
            var y = templateX * Math.sin(orientation) + templateY * Math.cos(orientation) + position.y;
            poseComponent.getHandle().setPosition(new Position(x, y));
        });
        poseComponentToFollow.addEventListener('onorientationchange', poseComponent.getHandle(), function (newOrientation) {
            poseComponent.getHandle().setOrientation(newOrientation);
        });
    };

    return Entity;
});