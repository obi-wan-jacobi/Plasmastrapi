define([
    "./Base/Tool",
    "../../engine/Namespaces/$Components",
    "../Namespaces/$PickableTraits",
    "../../engine/Namespaces/$Data",
    "./Helpers/SelectionBox",
    "gameConfig"
],
function (Tool, $, $PickableTraits, $Data, SelectionBox, config) {

    PickingTool.prototype = Object.create(Tool.prototype);
    PickingTool.prototype.constructor = PickingTool;
    function PickingTool() {
        Tool.call(this);
        // drag bounds before pick on drag
        this.__pickableOnDrag = null;
        this.__beforeDragBounds = null;
        // selection bounds before selection box on drag
        this.__selectionBox = null;
        this.__pickableSelectionBox = null;
        this.__beforeSelectionBounds = null;
        this.__selectionAnchor = null;
    };
    PickingTool.prototype.__onequip = function () {
        this.__pickableOnDrag = null;
        // hack
        this.__isMouseDown = false;
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
                this.setPickableTraitListFilter(
                    new $PickableTraits.PickableTraitList($PickableTraits.DesignZone, $PickableTraits.Placeable)
                );
                this.__selectionBox = new SelectionBox();
                this.__selectionBox.startAt(this.__selectionAnchor);
                this.__engine.sceneController.addToCurrentScene(this.__selectionBox);
            }
        } else if (this.__selectionBox) {
            this.__selectionBox.stretchTo(cursor);
        }
    };
    PickingTool.prototype.__onmousedown = function (cursor) {
        Tool.prototype.__onmousedown.call(this, cursor);
        this.__beforeDragBounds = new $Data.Geometry.Rectangle(
            config.PickingTool.beforeDragBounds.width,
            config.PickingTool.beforeDragBounds.height
        );
        for (var i = 0, L = this.__beforeDragBounds.vertices.length; i < L; i++) {
            this.__beforeDragBounds.vertices[i].x += cursor.x;
            this.__beforeDragBounds.vertices[i].y += cursor.y;
        }
        this.__beforeSelectionBounds = new $Data.Geometry.Rectangle(
            config.PickingTool.beforeSelectionBounds.width,
            config.PickingTool.beforeSelectionBounds.height
        );
        this.__selectionAnchor = new $Data.Geometry.Position(cursor.x, cursor.y);
        for (var i = 0, L = this.__beforeSelectionBounds.vertices.length; i < L; i++) {
            this.__beforeSelectionBounds.vertices[i].x += cursor.x;
            this.__beforeSelectionBounds.vertices[i].y += cursor.y;
        }
    };
    PickingTool.prototype.__pick_onmousedown = function (entities) {
        var entity = null;
        for (var i = 0, L = entities.length; i < L; i++) {
            if ($PickableTraits.Draggable.resolve(entities[i].getComponent($.PickableComponent))) {
                this.__pickableOnDrag = entities[i].getComponent($.PickableComponent);
                entity = entities[i];
                break;
            }
        }
        if (this.__pickableSelectionBox && this.__pickableSelectionBox !== entity) {
            this.__pickableSelectionBox.destroy();
            this.__pickableSelectionBox = null;
        }
    };
    PickingTool.prototype.__pick_onmouseup = function (entities) {
        if (this.__selectionBox) {
            this.__selectionBox.fillContents();
            if (this.__selectionBox.contents.length == 0) {
                this.__selectionBox.destroy();
            } else {
                this.__pickableSelectionBox = this.__selectionBox;
            }
            this.__selectionBox = null;
            this.setPickableTraitListFilter(
                new $PickableTraits.PickableTraitList($PickableTraits.DesignZone, $PickableTraits.Default)
            );
            return;
        }
        for (var i = 0, L = entities.length; i < L; i++) {
            var pickableComponent = entities[i].getComponent($.PickableComponent);
            if ($PickableTraits.Default.resolve(pickableComponent) && !(entities[i] === this.__selectionBox)) {
                pickableComponent.pick();
                return;
            }
        }
        return;
    };

    return PickingTool;
});