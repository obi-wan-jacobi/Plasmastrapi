define(['tool-handler', 'utils'],
function (ToolHandler, utils) {

    // *** CLEAN ME ***

    SelectionTool.prototype = Object.create(ToolHandler.prototype);
    SelectionTool.prototype.constructor = SelectionTool;
    function SelectionTool(engine) {
        ToolHandler.call(this, engine);
        this.__selectionBox = null;
        this.__isSelectionBoxInitialized = false;
    };
    // private methods
    SelectionTool.prototype.__oninit = function () {
    };
    SelectionTool.prototype.__onload = function () {
        // Enable logic elements + terminals
        this.__enableAll('logic-element');
        this.__enableAll('input-terminal');
        this.__enableAll('output-terminal');
    };
    SelectionTool.prototype.__onunload = function () {
        // Disable logic elements + terminals
        this.__disableAll('logic-element');
        this.__disableAll('input-terminal');
        this.__disableAll('output-terminal');
    };
    SelectionTool.prototype.__createSelectionBox = function (position) {
        if (this.__selectionBox) {
            utils.validator.throw(this, 'createSelectionBox', 'A selection box has already been initialized');
        }
        this.__selectionBox = this.__engine.getFactory('ui-element-factory').create('selection-box');
        this.__selectionBox.startAt(position);
    };
    SelectionTool.prototype.__initSelectionBox = function () {
        this.__isSelectionBoxInitialized = true;
        var designArea = this.__labController.getDesignArea();
        // *** closures ***
        function pullSelectionBox() {
            this.__selectionBox.getComponent('pick-component').disable();
            this.__selectionBox.getComponent('pick-component').removeEventListener('onpick', this);
            designArea.getComponent('pick-component').removeEventListener('onpick', this.__selectionBox);
            designArea.getComponent('pick-component').addEventListener('onpick', this.__selectionBox, destroySelectionBox);
            this.__labController.setTarget(this.__selectionBox);
        };
        function placeSelectionBox() {
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
        this.__disableAll('logic-element');
        this.__disableAll('input-terminal');
        this.__disableAll('output-terminal');
    };
    SelectionTool.prototype.__destroySelectionBox = function () {
        var selections = this.__selectionBox.flushContents();
        selections.forEach(function (element) {
            element.getComponent('pick-component').deselect();
        });
        this.__selectionBox.destroy();
        this.__selectionBox = null;
    };
    // public methods
    SelectionTool.prototype.keydown = function (keyboardHandle) {
        ToolHandler.prototype.keydown.call(this, keyboardHandle);
    };
    SelectionTool.prototype.keyup = function (keyboardHandle) { 
    };
    SelectionTool.prototype.enter = function () {
    };
    SelectionTool.prototype.escape = function () {
    };
    SelectionTool.prototype.mousemove = function (position) {
        if (!this.__selectionBox) {
            return;
        } else {
            this.__selectionBox.stretchTo(position);
            if (!this.__isSelectionBoxInitialized && (this.__selectionBox.getWidth() >= 1 || this.__selectionBox.getHeight() >= 1)) {
                this.__initSelectionBox();
            }
        }
    };
    SelectionTool.prototype.mousedown = function (position) {
        this.__createSelectionBox(position);
    };
    SelectionTool.prototype.mouseup = function () {
    };
    SelectionTool.prototype.click = function () {
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
    SelectionTool.prototype.dispose = function () {
        this.unload();
        if (this.__selectionBox && (!this.__isSelectionBoxInitialized || this.__selectionBox.isEmpty)) {
            this.__destroySelectionBox();
        }
    };

    return SelectionTool;
});