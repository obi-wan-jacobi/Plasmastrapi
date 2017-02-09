define(["./Base/Tool", "../../engine/Namespaces/$Components", "../Namespaces/$PickableTraits", "../Namespaces/$Cursors"],
function (Tool, $, $PickableTraits, $Cursors) {

    TrashTool.prototype = Object.create(Tool.prototype);
    TrashTool.prototype.constructor = TrashTool;
    function TrashTool() {
        Tool.call(this, $Cursors.TrashToolCursor);
    };
    TrashTool.prototype.__onequip = function () {
        this.setPickableTraitListFilter(
            new $PickableTraits.PickableTraitList($PickableTraits.DesignZone, $PickableTraits.Trashable)
        );
    };
    TrashTool.prototype.__pick_onmousedown = function (entities) {
        for (var i = 0, L = entities.length; i < L; i++) {
            var pickableComponent = entities[i].getComponent($.PickableComponent);
            if ($PickableTraits.Trashable.resolve(pickableComponent)) {
                entities[i].destroy();
                return;
            }
        }
        this.__engine.toolController.equipPickingTool();
    };

    return TrashTool;
});