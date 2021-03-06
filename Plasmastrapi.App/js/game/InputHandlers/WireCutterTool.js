﻿define(['input-handler'],
function (InputHandler) {

    WireCutterTool.prototype = Object.create(InputHandler.prototype);
    WireCutterTool.prototype.constructor = WireCutterTool;
    function WireCutterTool(engine) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__logicElementContainer = this.__engine.getFactory('logic-element-factory').getContainer();
        this.__wireContainer = this.__engine.getFactory('wire-factory').getContainer();
        this.__inputTerminalContainer = this.__engine.getFactory('terminal-factory').getInputTerminalContainer();
        this.__outputTerminalContainer = this.__engine.getFactory('terminal-factory').getOutputTerminalContainer();
        this.__wireCutter = null;
        this.__isWireCutterPrioritized = false;
    };
    // private methods
    WireCutterTool.prototype.__oninit = function () {
    };
    WireCutterTool.prototype.__onload = function () {
        // Disable everything except for wires
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__logicElementContainer.forEach(disableElement);
        this.__inputTerminalContainer.forEach(disableElement);
        this.__outputTerminalContainer.forEach(disableElement);
    };
    WireCutterTool.prototype.__onunload = function () {
        // Re-enable everything
        function enableElement(element) {
            element.getComponent('pick-component').enable();
        };
        this.__logicElementContainer.forEach(enableElement);
        this.__inputTerminalContainer.forEach(enableElement);
        this.__outputTerminalContainer.forEach(enableElement);
    };
    WireCutterTool.prototype.__initWireCutter = function () {
        if (this.__selectionBox) {
            utils.validator.throw(this, 'initWireCutter', 'A wire cutter has already been initialized');
        }
        this.__wireCutter = this.__engine.getFactory('ui-element-factory').create('wire-cutter');
    };
    WireCutterTool.prototype.__prioritizeWireCutter = function () {
        this.__isWireCutterPrioritized = true;
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__wireContainer.forEach(disableElement);
    };
    WireCutterTool.prototype.__destroyWireCutter = function () {
        if (this.__isWireCutterPrioritized) {
            function enableElement(element) {
                element.getComponent('pick-component').enable();
            };
            this.__wireContainer.forEach(enableElement);
        }
        this.__wireCutter.destroy();
        this.__wireCutter = null;
        this.__isWireCutterPrioritized = false;
    };
    // public methods
    WireCutterTool.prototype.keydown = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOn();
        } else {
            this.__labController.hotkey(keyboardHandle.getKeyString());
        }
    };
    WireCutterTool.prototype.keyup = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOff();
            this.__labController.idle();
        }
    };
    WireCutterTool.prototype.enter = function () {
    };
    WireCutterTool.prototype.escape = function () {
    };
    WireCutterTool.prototype.mousemove = function (position) {
        if (!this.__wireCutter) {
            return;
        } else {
            this.__wireCutter.lineTo(position);
            if (!this.__isWireCutterPrioritized) {
                this.__prioritizeWireCutter();
            }
        }
    };
    WireCutterTool.prototype.mousedown = function () {
        if (!this.__wireCutter) {
            this.__initWireCutter();
        }
    };
    WireCutterTool.prototype.mouseup = function () {
    };
    WireCutterTool.prototype.click = function () {
        var target = this.__labController.flushTarget();
        if (target) {
            target.destroy();
        }
        if (this.__wireCutter) {
            this.__destroyWireCutter();
        }
        this.__labController.idle();
    };
    WireCutterTool.prototype.dispose = function () {
        this.unload();
        if (this.__wireCutter) {
            this.__destroyWireCutter();
        }
        this.__labController.setRepeatLastActionOff();
    };

    return WireCutterTool;
});