define(['container', 'component', 'core-constants'], function (Container, Component, CORE) {

    DrawContainer.prototype = Object.create(Container.prototype);
    DrawContainer.prototype.constructor = DrawContainer;
    function DrawContainer() {
        for (var i = 0, L = CORE.DISPLAYLAYERS.length; i < L; i++) {
            this.__containers[CORE.DISPLAYLAYERS[i]] = new Container(Component);
        }
    };
    // private methods
    DrawContainer.prototype.forEach = function (fn, caller) {
        for (var i = 0, L = CORE.DISPLAYLAYERS.length; i < L; i++) {
            var result = this.__containers[CORE.DISPLAYLAYERS[i]].forEach(fn, caller);
            if (result) {
                return result;
            }
        }
    };
    DrawContainer.prototype.find = function (member) {
        for (var i = 0, L = CORE.DISPLAYLAYERS.length; i < L; i++) {
            var result = this.__containers[CORE.DISPLAYLAYERS[i]].get(member);
            if (result) {
                return result;
            }
        }
    };
    DrawContainer.prototype.add = function (member) {
        var displayLayer = member.getHandle().getDisplaySettings().displayLayer;
        this.__containers[displayLayer].add(member);
    };
    DrawContainer.prototype.remove = function (member) {
        var displayLayer = member.getHandle().getDisplaySettings().displayLayer;
        this.__containers[displayLayer].remove(member);
    };

    return DrawContainer;
});