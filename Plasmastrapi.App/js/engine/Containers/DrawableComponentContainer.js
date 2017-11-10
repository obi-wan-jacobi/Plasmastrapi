define(['container', 'component-container', 'component', 'core-constants'], function (Container, ComponentContainer, Component, CORE) {

    DrawableComponentContainer.prototype = Object.create(Container.prototype);
    DrawableComponentContainer.prototype.constructor = DrawableComponentContainer;
    function DrawableComponentContainer() {
        this.__containers = {};
        for (var i = 0, L = CORE.DISPLAY_LAYERS.length; i < L; i++) {
            this.__containers[CORE.DISPLAY_LAYERS[i]] = new ComponentContainer(Component);
        }
    };
    // public methods
    DrawableComponentContainer.prototype.forEach = function (fn, caller) {
        for (var i = 0, L = CORE.DISPLAY_LAYERS.length; i < L; i++) {
            var result = this.__containers[CORE.DISPLAY_LAYERS[i]].forEach(fn, caller);
            if (result) {
                return result;
            }
        }
    };
    DrawableComponentContainer.prototype.get = function (component) {
        for (var i = 0, L = CORE.DISPLAY_LAYERS.length; i < L; i++) {
            var result = this.__containers[CORE.DISPLAY_LAYERS[i]].get(component);
            if (result) {
                return result;
            }
        }
    };
    DrawableComponentContainer.prototype.add = function (component) {
        var displayLayer = component.getHandle().getDisplaySettings().displayLayer;
        this.__containers[displayLayer].add(component);
    };
    DrawableComponentContainer.prototype.remove = function (component) {
        var displayLayer = component.getHandle().getDisplaySettings().displayLayer;
        this.__containers[displayLayer].remove(component);
    };

    return DrawableComponentContainer;
});