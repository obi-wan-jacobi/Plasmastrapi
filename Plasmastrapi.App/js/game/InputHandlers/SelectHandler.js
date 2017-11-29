﻿define(['input-handler', 'utils'],
function (InputHandler, utils) {

    // *** CLEAN ME ***

    SelectHandler.prototype = Object.create(InputHandler.prototype);
    SelectHandler.prototype.constructor = SelectHandler;
    function SelectHandler(engine) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__logicElementContainer = this.__engine.getFactory('logic-element-factory').getContainer();
        this.__inputTerminalContainer = this.__engine.getFactory('terminal-factory').getInputTerminalContainer();
        this.__outputTerminalContainer = this.__engine.getFactory('terminal-factory').getOutputTerminalContainer();
        this.__selectionBox = null;
        this.__isSelectionBoxInitialized = false;
    };
    // private methods
    SelectHandler.prototype.__oninit = function () {
    };
    SelectHandler.prototype.__onload = function () {
        // Enable logic elements + terminals
        function enableElement(element) {
            element.getComponent('pick-component').enable();
        };
        this.__logicElementContainer.forEach(enableElement);
        this.__inputTerminalContainer.forEach(enableElement);
        this.__outputTerminalContainer.forEach(enableElement);
    };
    SelectHandler.prototype.__onunload = function () {
        // Disable logic elements + terminals
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__logicElementContainer.forEach(disableElement);
        this.__inputTerminalContainer.forEach(disableElement);
        this.__outputTerminalContainer.forEach(disableElement);
    };
    SelectHandler.prototype.__createSelectionBox = function (position) {
        if (this.__selectionBox) {
            utils.validator.throw(this, 'createSelectionBox', 'A selection box has already been initialized');
        }
        this.__selectionBox = this.__engine.getFactory('ui-element-factory').create('selection-box');
        this.__selectionBox.startAt(position);
    };
    SelectHandler.prototype.__initSelectionBox = function () {
        this.__isSelectionBoxInitialized = true;
        var isSelectionBoxBeingPlaced = false;
        var designArea = this.__labController.getDesignArea();
        function pullSelectionBox() {
            isSelectionBoxBeingPlaced = true;
            this.__selectionBox.getComponent('pick-component').disable();
            this.__selectionBox.getComponent('pick-component').removeEventListener('onpick', this);
            designArea.getComponent('pick-component').removeEventListener('onpick', this.__selectionBox);
            designArea.getComponent('pick-component').addEventListener('onpick', this.__selectionBox, destroySelectionBox);
            this.__labController.setTarget(this.__selectionBox);
        };
        function placeSelectionBox() {
            isSelectionBoxBeingPlaced = true;
            this.__selectionBox.getComponent('pick-component').disable();
            this.__selectionBox.getComponent('pick-component').removeEventListener('onpick', this);
            designArea.getComponent('pick-component').removeEventListener('onpick', this.__selectionBox);
            designArea.getComponent('pick-component').addEventListener('onpick', this.__selectionBox, destroySelectionBox);
            this.__labController.setTarget(this.__selectionBox);
        };
        function destroySelectionBox() {
            var selections = this.flushContents();
            selections.forEach(function (element) {
                element.getComponent('pick-component').deselect();
            });
            this.destroy();
        };
        this.__selectionBox.getComponent('pick-component').addEventListener('onpull', this, pullSelectionBox);
        this.__selectionBox.getComponent('pick-component').addEventListener('onpick', this, placeSelectionBox);
        this.__labController.getDesignArea().getComponent('pick-component').addEventListener('onmouseleave', this.__selectionBox, destroySelectionBox);
        var handler = this;
        function destroySelectionBox() {
            var selections = this.flushContents();
            selections.forEach(function (element) {
                element.getComponent('pick-component').deselect();
            });
            var designArea = handler.__labController.getDesignArea();
            designArea.getComponent('pick-component').removeEventListener('onpick', this);
            this.destroy();
            handler.__selectionBox = null;
        };
        // Disable logic elements + terminals
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__logicElementContainer.forEach(disableElement);
        this.__inputTerminalContainer.forEach(disableElement);
        this.__outputTerminalContainer.forEach(disableElement);
    };
    SelectHandler.prototype.__destroySelectionBox = function () {
        var selections = this.__selectionBox.flushContents();
        selections.forEach(function (element) {
            element.getComponent('pick-component').deselect();
        });
        this.__selectionBox.destroy();
        this.__selectionBox = null;
    };
    // public methods
    SelectHandler.prototype.keydown = function (keyboardHandle) {
        this.__labController.hotkey(keyboardHandle.getKeyString());
    };
    SelectHandler.prototype.keyup = function (keyboardHandle) { 
    };
    SelectHandler.prototype.enter = function () {
    };
    SelectHandler.prototype.escape = function () {
    };
    SelectHandler.prototype.mousemove = function (position) {
        if (!this.__selectionBox) {
            return;
        } else {
            this.__selectionBox.stretchTo(position);
            if (!this.__isSelectionBoxInitialized && (this.__selectionBox.getWidth() >= 1 || this.__selectionBox.getHeight() >= 1)) {
                this.__initSelectionBox();
            }
        }
    };
    SelectHandler.prototype.mousedown = function (position) {
        this.__createSelectionBox(position);
    };
    SelectHandler.prototype.mouseup = function () {
    };
    SelectHandler.prototype.click = function () {
        // If mouse down outside of design area, but mouse up inside design area...
        if (!this.__selectionBox) {
            return;
        } else if (this.__selectionBox.isEmpty) {
            this.__destroySelectionBox();
        } else {
            var handler = this;
            var designArea = this.__labController.getDesignArea();
            designArea.getComponent('pick-component').addEventListener('onpick', this.__selectionBox, function () {
                if (!this.getComponent('pick-component').isProdded) {
                    handler.__destroySelectionBox();
                }
            });
            this.__labController.idle();
        }
    };
    SelectHandler.prototype.dispose = function () {
        this.unload();
        if (this.__selectionBox && (!this.__isSelectionBoxInitialized || this.__selectionBox.isEmpty)) {
            this.__destroySelectionBox();
        }
    };

    return SelectHandler;
});