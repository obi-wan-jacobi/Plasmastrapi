define(["./Base/Tool", "../../engine/Namespaces/$Components", "../Namespaces/$PickableTraits", "../../engine/Namespaces/$Data"], function (Tool, $, $PickableTraits, $Data) {

    PickingTool.prototype = Object.create(Tool.prototype);
    PickingTool.prototype.constructor = PickingTool;
    function PickingTool() {
        Tool.call(this);
        this.__beforeDragBounds = null;
        this.__anchor = null;
        this.__pickableOnDrag = null;
    };
    PickingTool.prototype.__onequip = function () {
        this.__beforeDragBounds = new $Data.Geometry.Rectangle(20, 20);
        this.__anchor = null;
        this.__pickableOnDrag = null;
        this.setPickableTraitListFilter(new $PickableTraits.PickableTraitList($PickableTraits.Default));
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
        }
    };
    PickingTool.prototype.__onmousedown = function (cursor) {
        if (!this.__anchor) {
            this.__anchor = new $Data.Geometry.Position(cursor.x, cursor.y);
            for (var i = 0, L = this.__beforeDragBounds.vertices.length; i < L; i++) {
                this.__beforeDragBounds.vertices[i].x += cursor.x;
                this.__beforeDragBounds.vertices[i].y += cursor.y;
            }
        }
    };
    PickingTool.prototype.__pick_onmousedown = function (entities) {
        if ($PickableTraits.Draggable.resolve(entities[0].getComponent($.PickableComponent))) {
            this.__pickableOnDrag = entities[0].getComponent($.PickableComponent);
        }
    };
    PickingTool.prototype.__pick_onmouseup = function (entities) {
        entities[0].getComponent($.PickableComponent).pick();
    };

    return PickingTool;
});