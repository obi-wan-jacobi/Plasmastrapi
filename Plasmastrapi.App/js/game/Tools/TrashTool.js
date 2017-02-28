define(["./Base/Tool", "../../engine/Namespaces/$Components", "../../engine/Namespaces/$Data", "../Namespaces/$PickableTraits", "../Namespaces/$Cursors", "./Helpers/SelectionBox"],
function (Tool, $, $Data, $PickableTraits, $Cursors, SelectionBox) {

    TrashTool.prototype = Object.create(Tool.prototype);
    TrashTool.prototype.constructor = TrashTool;
    function TrashTool() {
        Tool.call(this, $Cursors.TrashToolCursor);
        this.__selectionBox = null;
        this.__beforeSelectionBounds = null;
        this.__anchor = null;
    };
    TrashTool.prototype.__onequip = function () {
        this.setPickableTraitListFilter(
            new $PickableTraits.PickableTraitList($PickableTraits.DesignZone, $PickableTraits.Trashable)
        );
    };
    TrashTool.prototype.__onmousemove = function (cursor) {
        if (!this.__selectionBox && this.isMouseDown) {
            if (!(
                cursor.x > this.__beforeSelectionBounds.vertices[1].x &&
                cursor.y > this.__beforeSelectionBounds.vertices[1].y &&
                cursor.x < this.__beforeSelectionBounds.vertices[3].x &&
                cursor.y < this.__beforeSelectionBounds.vertices[3].y
            )) {
                this.__selectionBox = new SelectionBox();
                this.__selectionBox.startAt(this.__anchor);
                this.__engine.sceneController.addToCurrentScene(this.__selectionBox);
            }
        } else if (this.__selectionBox) {
            this.__selectionBox.stretchTo(cursor);
        }
    };
    TrashTool.prototype.__onmousedown = function (cursor) {
        Tool.prototype.__onmousedown.call(this, cursor);
        this.__beforeSelectionBounds = new $Data.Geometry.Rectangle(50, 50);
        this.__anchor = new $Data.Geometry.Position(cursor.x, cursor.y);
        for (var i = 0, L = this.__beforeSelectionBounds.vertices.length; i < L; i++) {
            this.__beforeSelectionBounds.vertices[i].x += cursor.x;
            this.__beforeSelectionBounds.vertices[i].y += cursor.y;
        }
    };
    TrashTool.prototype.__pick_onmouseup = function (entities) {
        if (this.__selectionBox) {
            this.__selectionBox.fillContents();
            var contentSize = this.__selectionBox.contents.length;
            this.__selectionBox.destroyContents();
            this.__selectionBox.destroy();
            this.__selectionBox = null;
            if (contentSize > 0) {
                return;
            }
        } else {
            for (var i = 0, L = entities.length; i < L; i++) {
                var pickableComponent = entities[i].getComponent($.PickableComponent);
                if ($PickableTraits.Trashable.resolve(pickableComponent)) {
                    entities[i].destroy();
                    return;
                }
            }
        }
        if (this.isShiftKeyDown) {
            return;
        } else {
            this.__engine.toolController.equipPickingTool();
        }
    };
    TrashTool.prototype.__onkeyup = function (keyCode) {
        Tool.prototype.__onkeyup.call(this, keyCode);
        if (this.keyCodes.shift === keyCode) {
            this.__engine.toolController.equipPickingTool();
        }
    };

    return TrashTool;
});