define(["./EventEmitter", "./Component", "./AtomicArray"], function (EventEmitter, Component, AtomicArray) {

    // CLASS Entity
    Entity.prototype = Object.create(EventEmitter.prototype);
    Entity.prototype.constructor = Entity;
    function Entity() {
        // inherits from
        EventEmitter.call(this);
        // private variables
        this.__parent = null;
        this.__components = new AtomicArray(Component);
        // apply event mixins
        EventEmitter.Mixins.Loadable.call(this);
        EventEmitter.Mixins.Destructible.call(this);
    };
    // private methods
    Entity.prototype.__validateNoDuplicateComponentNames = function(component) {
        this.__components.forEach(function(ownedComponent) {
            if (ownedComponent.constructor.name === component.constructor.name) {
                throw new Error(this.constructor.name + ':validateNoDuplicateComponentNames - This entity already contains a ' + component.name + '.');
            }
        }, this);
    };
    Entity.prototype.__ondestroy = function () {
        this.__engine.entityContainer.remove(this);
    };
    Entity.prototype.__addParent = function (parent) {
        if (this.__parent) {
            throw new Error(this.constructor.name + ':addParent - This entity already has a parent.');
        }
        if (!(parent instanceof Entity)) {
            throw new Error(this.constructor.name + ':addParent - Parent must be of type Entity.');
        }
        this.__parent = parent;
        // wire up event subscriptions
        this.__parent.addEventListener('oninstantiate', this, this.instantiate);
        this.__parent.addEventListener('onload', this, this.load);
        this.__parent.addEventListener('onunload', this, this.unload);
        this.__parent.addEventListener('ondestroy', this, this.destroy);
    };
    Entity.prototype.__removeParent = function () {
        this.__parent = null;
        // unwire event subscription
        this.__parent.removeEventListener('oninstantiate', this, this.instantiate);
        this.__parent.removeEventListener('onload', this, this.load);
        this.__parent.removeEventListener('onunload', this, this.unload);
        this.__parent.removeEventListener('ondestroy', this, this.destroy);
    };
    // public methods
    Entity.prototype.instantiate = function (engine) {
        EventEmitter.prototype.instantiate.call(this, engine);
        this.__engine.entityContainer.add(this);
        this.__components.forEach(function (component) {
            if (!component.isInstantiated) {
                component.instantiate(this);
            }
        });
    };
    Entity.prototype.addComponent = function(component) {
        this.__validateNoDuplicateComponentNames(component);
        if (this.isInstantiated && !component.isInstantiated) {
            component.instantiate(this);
        }
        this.__components.push(component);
        if (this.isLoaded) {
            this.reload();
        }
    };
    Entity.prototype.removeComponent = function(component) {
        var removedComponent = this.__components.splice(component);
        if (removedComponent) {
            removedComponent.destroy();
        }
    };
    Entity.prototype.getComponent = function(componentClass) {
        return this.__components.forEach(function(ownedComponent) {
            if (ownedComponent.constructor.name === componentClass.name) {
                return ownedComponent;
            }
        }, this);
    };
    Entity.prototype.hasComponent = function(componentClass) {
        return this.getComponent(componentClass) ? true : false;
    };
    Entity.prototype.addChild = function(childEntity) {
        childEntity.__addParent(this);
    };

    return Entity;
});