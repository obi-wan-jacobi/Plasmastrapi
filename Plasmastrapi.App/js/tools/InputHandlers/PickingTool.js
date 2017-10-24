define(['input-handler', 'compatibility-filter', 'pickable'],
function (InputHandler, CompatibilityFilter, Pickable) {

    PickingTool.prototype = Object.create(InputHandler.prototype);
    PickingTool.prototype.constructor = PickingTool;
    function PickingTool(engine) {
        InputHandler.call(this, engine);
    };
    PickingTool.prototype.onclick = function () {
        this.__pickController.setFilterByCompatibility(new CompatibilityFilter(new Pickable()));
    };

    return PickingTool;
});