define(['container', 'component-container', 'core-config'],
function (Container, ComponentContainer, config) {

    DrawableComponentContainer.prototype = Object.create(Container.prototype);
    DrawableComponentContainer.prototype.constructor = DrawableComponentContainer;
    function DrawableComponentContainer() {
        this.__containers = {};
        for (var i = 0, L = config.constants.DISPLAY_LAYERS.length; i < L; i++) {
            this.__containers[config.constants.DISPLAY_LAYERS[i]] = new ComponentContainer('component');
        }
    };
    // public methods
    DrawableComponentContainer.prototype.forEach = function (fn, caller) {
        for (var i = 0, L = config.constants.DISPLAY_LAYERS.length; i < L; i++) {
            var result = this.__containers[config.constants.DISPLAY_LAYERS[i]].forEach(fn, caller);
            if (result) {
                return result;
            }
        }
    };
    DrawableComponentContainer.prototype.add = function (component) {
        var displayLayer = component.getDisplaySettings().displayLayer;
        this.__containers[displayLayer].add(component);
    };
    DrawableComponentContainer.prototype.remove = function (component) {
        var displayLayer = component.getDisplaySettings().displayLayer;
        this.__containers[displayLayer].remove(component);
    };

    return DrawableComponentContainer;
});