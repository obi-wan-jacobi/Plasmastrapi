﻿define([
    // Base
    'input-handle',
    // Objects
    'cutting-tool-cursor',
    'curve',
    // Data
    'position',
    'rectangle',
    'line-display-settings',
    // Configs
    'cuttable',
    'design-zone',
    'game-config'
],
function (InputHandler, CuttingToolCursor, Curve, Position, Rectangle, LineDisplaySettings, Cuttable, DesignZone, config) {

    CuttingTool.prototype = Object.create(InputHandler.prototype);
    CuttingTool.prototype.constructor = CuttingTool;
    function CuttingTool(engine) {
        InputHandler.call(this, engine);
        this.__beforeCuttingBounds = new Rectangle(
            config.CuttingTool.beforeCuttingBounds.width,
            config.CuttingTool.beforeCuttingBounds.height
        );
        this.__anchor = null;
        this.__cuttingCurve = null;
    };
    CuttingTool.prototype.__onequip = function () {
        this.setFilter(DesignZone, Cuttable);
    };
    CuttingTool.prototype.__onmousemove = function (cursor) {
        if (!this.__cuttingCurve && this.isMouseDown) {
            if (!(
                cursor.x > this.__beforeCuttingBounds.vertices[1].x &&
                cursor.y > this.__beforeCuttingBounds.vertices[1].y &&
                cursor.x < this.__beforeCuttingBounds.vertices[3].x &&
                cursor.y < this.__beforeCuttingBounds.vertices[3].y
            )) {
                this.__cuttingCurve = new Curve(
                    new Position(cursor.x, cursor.y),
                    new LineDisplaySettings(
                        config.CuttingTool.curveDisplayLayer,
                        config.CuttingTool.curveDisplayColour,
                        config.CuttingTool.curveLineThickness
                    )
                );
                this.__engine.sceneController.addToCurrentScene(this.__cuttingCurve);
            }
        } else if (this.__cuttingCurve) {
            this.__cuttingCurve.lineTo(new Position(cursor.x, cursor.y));
        }
    };
    CuttingTool.prototype.__onmousedown = function (cursor) {
        InputHandler.prototype.__onmousedown.call(this, cursor);
        if (!this.__anchor) {
            this.__anchor = new Position(cursor.x, cursor.y);
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
        }
        for (var i = 0, L = entities.length; i < L; i++) {
            if (Cuttable.resolve(entities[i])) {
                entities[i].destroy();
                return;
            }
        }
        if (this.isShiftKeyDown) {
            return;
        } else {
            this.__engine.toolController.equipPickingTool();
        }
         
    };
    CuttingTool.prototype.__onkeyup = function (keyCode) {
        InputHandler.prototype.__onkeyup.call(this, keyCode);
        if (this.keyCodes.shift === keyCode) {
            this.__engine.toolController.equipPickingTool();
        }
    };

    return CuttingTool;
});