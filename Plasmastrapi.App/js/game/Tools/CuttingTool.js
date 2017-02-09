define(["./Base/Tool", "../../engine/Namespaces/$Components", "../Namespaces/$PickableTraits", "../Namespaces/$Cursors"],
function (Tool, $, $PickableTraits, $Cursors) {

    CuttingTool.prototype = Object.create(Tool.prototype);
    CuttingTool.prototype.constructor = CuttingTool;
    function CuttingTool() {
        Tool.call(this, $Cursors.CuttingToolCursor);
    };
    CuttingTool.prototype.__onequip = function () {
        this.setPickableTraitListFilter(
            new $PickableTraits.PickableTraitList($PickableTraits.DesignZone, $PickableTraits.Cuttable)
        );
    };
    CuttingTool.prototype.__pick_onmousedown = function (entities) {
        for (var i = 0, L = entities.length; i < L; i++) {
            var pickableComponent = entities[i].getComponent($.PickableComponent);
            if ($PickableTraits.Cuttable.resolve(pickableComponent)) {
                entities[i].destroy();
                return;
            }
        }
        this.__engine.toolController.equipPickingTool();
    };

    return CuttingTool;
});