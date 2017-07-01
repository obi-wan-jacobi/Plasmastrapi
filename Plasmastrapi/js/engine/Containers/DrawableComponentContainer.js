define(['container', 'component', 'core-constants'], function (Container, Component, CORE) {

    DrawableComponentContainer.prototype = Object.create(Container.prototype);
    DrawableComponentContainer.prototype.constructor = DrawableComponentContainer;
    function DrawableComponentContainer() {
        this.__containers = {};
        for (var i = 0, L = CORE.DISPLAYLAYERS.length; i < L; i++) {
            this.__containers[CORE.DISPLAYLAYERS[i]] = new Container(Component);
        }
    };
    // private methods
    DrawableComponentContainer.prototype.forEach = function (fn, caller) {
        for (var i = 0, L = CORE.DISPLAYLAYERS.length; i < L; i++) {
            var result = this.__containers[CORE.DISPLAYLAYERS[i]].forEach(fn, caller);
            if (result) {
                return result;
            }
        }
    };
    DrawableComponentContainer.prototype.find = function (member) {
        for (var i = 0, L = CORE.DISPLAYLAYERS.length; i < L; i++) {
            var result = this.__containers[CORE.DISPLAYLAYERS[i]].get(member);
            if (result) {
                return result;
            }
        }
    };
    DrawableComponentContainer.prototype.add = function (member) {
        var displayLayer = member.getHandle().getDisplaySettings().displayLayer;
        this.__containers[displayLayer].add(member);
    };
    DrawableComponentContainer.prototype.remove = function (member) {
        var displayLayer = member.getHandle().getDisplaySettings().displayLayer;
        this.__containers[displayLayer].remove(member);
    };

    return DrawableComponentContainer;
});