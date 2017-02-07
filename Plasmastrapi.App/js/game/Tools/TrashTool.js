define(["./Base/Tool", "../../engine/Namespaces/$Components", "../Namespaces/$PickableTraits", "../Namespaces/$Cursors"], function (Tool, $, $PickableTraits, $Cursors) {

    TrashTool.prototype = Object.create(Tool.prototype);
    TrashTool.prototype.constructor = TrashTool;
    function TrashTool(x, y) {
        Tool.call(this, x, y, $Cursors.TrashToolCursor);
    };
    TrashTool.prototype.__onequip = function () {
        this.setPickableTraitListFilter(
            new $PickableTraits.PickableTraitList($PickableTraits.DesignZone, $PickableTraits.DestructionZone, $PickableTraits.Default, $PickableTraits.Trashable)
        );
    };
    TrashTool.prototype.__pick_onmousedown = function (entities) {
        var firstTrashableEntity = null;
        for (var i = 0, L = entities.length; i < L; i++) {
            var pickableComponent = entities[i].getComponent($.PickableComponent);
            if (!firstTrashableEntity && $PickableTraits.Trashable.resolve(pickableComponent)) {
                firstTrashableEntity = entities[i];
                break;
            }
        }
        if (firstTrashableEntity) {
            firstTrashableEntity.destroy();
        } else {
            this.__engine.toolController.equipPickingTool();
        }
    };

    return TrashTool;
});