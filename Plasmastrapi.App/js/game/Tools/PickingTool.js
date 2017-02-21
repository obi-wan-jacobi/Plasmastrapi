define(["./Base/Tool", "../../engine/Namespaces/$Components", "../Namespaces/$PickableTraits", "../../engine/Namespaces/$Data", "./Helpers/SelectionBox"],
function (Tool, $, $PickableTraits, $Data, SelectionBox) {

    PickingTool.prototype = Object.create(Tool.prototype);
    PickingTool.prototype.constructor = PickingTool;
    function PickingTool() {
        Tool.call(this);
        // drag bounds before pick on drag
        this.__pickableOnDrag = null;
        this.__beforeDragBounds = new $Data.Geometry.Rectangle(20, 20);
        this.__beforeDragAnchor = null;
        // selection bounds before selection box on drag
        this.__selectionBox = null;
        this.__beforeSelectionBounds = new $Data.Geometry.Rectangle(30, 30);
        this.__beforeSelectionAnchor = null;
    };
    PickingTool.prototype.__onequip = function () {
        this.setPickableTraitListFilter(
            new $PickableTraits.PickableTraitList($PickableTraits.DesignZone, $PickableTraits.Default)
        );
    };
    PickingTool.prototype.__onmousemove = function (cursor) {
        if (this.__pickableOnDrag) {
            if (!(
                cursor.x > this.__beforeDragBounds.vertices[1].x &&
                cursor.y > this.__beforeDragBounds.vertices[1].y &&
                cursor.x < this.__beforeDragBounds.vertices[3].x &&
                cursor.y < this.__beforeDragBounds.vertices[3].y
            )) {
                this.__pickableOnDrag.pick();
            }
        } else if (!this.__selectionBox && this.isMouseDown) {
            if (!(
                cursor.x > this.__beforeSelectionBounds.vertices[1].x &&
                cursor.y > this.__beforeSelectionBounds.vertices[1].y &&
                cursor.x < this.__beforeSelectionBounds.vertices[3].x &&
                cursor.y < this.__beforeSelectionBounds.vertices[3].y
            )) {
                this.__selectionBox = new SelectionBox();
                this.__selectionBox.startAt(cursor);
                this.__engine.sceneController.addToCurrentScene(this.__selectionBox);
            }
        } else if (this.__selectionBox) {
            this.__selectionBox.stretchTo(cursor);
        }
    };
    PickingTool.prototype.__onmousedown = function (cursor) {
        Tool.prototype.__onmousedown.call(this, cursor);
        if (!this.__beforeDragAnchor) {
            this.__beforeDragAnchor = new $Data.Geometry.Position(cursor.x, cursor.y);
            for (var i = 0, L = this.__beforeDragBounds.vertices.length; i < L; i++) {
                this.__beforeDragBounds.vertices[i].x += cursor.x;
                this.__beforeDragBounds.vertices[i].y += cursor.y;
            }
        }
        if (!this.__beforeSelectionAnchor) {
            this.__beforeSelectionAnchor = new $Data.Geometry.Position(cursor.x, cursor.y);
            for (var i = 0, L = this.__beforeSelectionBounds.vertices.length; i < L; i++) {
                this.__beforeSelectionBounds.vertices[i].x += cursor.x;
                this.__beforeSelectionBounds.vertices[i].y += cursor.y;
            }
        }
    };
    PickingTool.prototype.__pick_onmousedown = function (entities) {
        if ($PickableTraits.Draggable.resolve(entities[0].getComponent($.PickableComponent))) {
            this.__pickableOnDrag = entities[0].getComponent($.PickableComponent);
        }
    };
    PickingTool.prototype.__pick_onmouseup = function (entities) {
        if (this.__selectionBox) {
            this.__selectionBox.fillContents();
            this.__selectionBox = null;
        }
        for (var i = 0, L = entities.length; i < L; i++) {
            var pickableComponent = entities[i].getComponent($.PickableComponent);
            if ($PickableTraits.Default.resolve(pickableComponent)) {
                pickableComponent.pick();
                return;
            }
        }
        this.__engine.toolController.equipPickingTool();
    };

    return PickingTool;
});