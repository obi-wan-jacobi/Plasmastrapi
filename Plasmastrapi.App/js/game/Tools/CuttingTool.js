﻿define(["./Base/Tool", "../../engine/Namespaces/$Components", "../Namespaces/$PickableTraits", "../Namespaces/$Cursors", "../../engine/Namespaces/$Data", "../UI/Shapes/Curve"],
function (Tool, $, $PickableTraits, $Cursors, $Data, Curve) {

    CuttingTool.prototype = Object.create(Tool.prototype);
    CuttingTool.prototype.constructor = CuttingTool;
    function CuttingTool() {
        Tool.call(this, $Cursors.CuttingToolCursor);
        this.__beforeCuttingBounds = null;
        this.__anchor = null;
        this.__cuttingCurve = null;
    };
    CuttingTool.prototype.__onequip = function () {
        this.__beforeCuttingBounds = new $Data.Geometry.Rectangle(50, 50);
        this.__anchor = null;
        this.__cuttingCurve = null;
        this.setPickableTraitListFilter(
            new $PickableTraits.PickableTraitList($PickableTraits.DesignZone, $PickableTraits.Cuttable)
        );
    };
    CuttingTool.prototype.__onmousemove = function (cursor) {
        if (!this.__cuttingCurve && this.isMouseDown) {
            if (!(
                cursor.x > this.__beforeCuttingBounds.vertices[1].x &&
                cursor.y > this.__beforeCuttingBounds.vertices[1].y &&
                cursor.x < this.__beforeCuttingBounds.vertices[3].x &&
                cursor.y < this.__beforeCuttingBounds.vertices[3].y
            )) {
                this.__cuttingCurve = new Curve(new $Data.Geometry.Position(cursor.x, cursor.y));
                this.__engine.sceneController.addToCurrentScene(this.__cuttingCurve);
            }
        } else if (this.__cuttingCurve) {
            this.__cuttingCurve.lineTo(new $Data.Geometry.Position(cursor.x, cursor.y));
        }
    };
    CuttingTool.prototype.__onmousedown = function (cursor) {
        Tool.prototype.__onmousedown.call(this, cursor);
        if (!this.__anchor) {
            this.__anchor = new $Data.Geometry.Position(cursor.x, cursor.y);
            for (var i = 0, L = this.__beforeCuttingBounds.vertices.length; i < L; i++) {
                this.__beforeCuttingBounds.vertices[i].x += cursor.x;
                this.__beforeCuttingBounds.vertices[i].y += cursor.y;
            }
        }
    };
    CuttingTool.prototype.__pick_onmouseup = function (entities) {
        if (this.__cuttingCurve) {
            //this.__cuttingCurve.cutOnWireIntersections();
            this.__cuttingCurve.destroy();
            this.__cuttingCurve = null;
            return;
        }
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