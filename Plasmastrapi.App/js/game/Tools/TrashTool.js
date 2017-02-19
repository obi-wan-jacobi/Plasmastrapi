define(["./Base/Tool", "../../engine/Namespaces/$Components", "../Namespaces/$PickableTraits", "../Namespaces/$Cursors", "./Helpers/SelectionBox"],
function (Tool, $, $PickableTraits, $Cursors, SelectionBox) {

    TrashTool.prototype = Object.create(Tool.prototype);
    TrashTool.prototype.constructor = TrashTool;
    function TrashTool() {
        Tool.call(this, $Cursors.TrashToolCursor);
        this.__selectionBox = null;
    };
    TrashTool.prototype.__onequip = function () {
        this.setPickableTraitListFilter(
            new $PickableTraits.PickableTraitList($PickableTraits.DesignZone, $PickableTraits.Trashable)
        );
    };
    TrashTool.prototype.__onmousemove = function (position) {
        if (!this.__selectionBox && this.isMouseDown) {
            this.__selectionBox = new SelectionBox()
            this.__selectionBox.startAt(position);
            this.__engine.sceneController.addToCurrentScene(this.__selectionBox);
        } else if (this.__selectionBox) {
            this.__selectionBox.stretchTo(position);
        }
    };
    TrashTool.prototype.__pick_onmouseup = function (entities) {
        if (this.__selectionBox) {
            this.__selectionBox.fillContents();
            this.__selectionBox.destroyContents();
            this.__selectionBox.destroy();
            this.__selectionBox = null;
            return;
        }
        for (var i = 0, L = entities.length; i < L; i++) {
            var pickableComponent = entities[i].getComponent($.PickableComponent);
            if ($PickableTraits.Trashable.resolve(pickableComponent)) {
                entities[i].destroy();
                return;
            }
        }
        if (this.isShiftKeyDown) {
            this.__engine.toolController.equipTrashTool();
        } else {
            this.__engine.toolController.equipPickingTool();
        }
    };

    return TrashTool;
});