define(['tool-handler', 'utils'],
function (ToolHandler, utils) {

    SelectionTool.prototype = Object.create(ToolHandler.prototype);
    SelectionTool.prototype.constructor = SelectionTool;
    function SelectionTool(engine) {
        ToolHandler.call(this, engine);
        this.__isSelectionBoxStretchedOnce = false;
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
        if (!this.__isSelectionBoxStretchedOnce) {
            // Disable logic elements + terminals
            this.__disableAll('logic-element');
            this.__disableAll('input-terminal');
            this.__disableAll('output-terminal');
        }
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
        if (!this.__selectionBoxController.isSelectionBoxCreated()) {
            return;
        } else if (!this.__selectionBoxController.isSelectionBoxPersistent()) {
            this.__selectionBoxController.stretchSelectionBoxTo(position);
            if (!this.__isSelectionBoxStretchedOnce) {
                this.__isSelectionBoxStretchedOnce = true;
                // Disable logic elements + terminals
                this.__disableAll('logic-element');
                this.__disableAll('input-terminal');
                this.__disableAll('output-terminal');
            }
        }
    };
    SelectionTool.prototype.mousedown = function (position) {
        if (!this.__selectionBoxController.isSelectionBoxCreated()) {
            this.__selectionBoxController.createSelectionBox(position);
        }
    };
    SelectionTool.prototype.mouseup = function () {
    };
    SelectionTool.prototype.click = function () {
        // NB: SelectionTool has a life-cycle that accommodates multiple click()'s
        if (!this.__selectionBoxController.isSelectionBoxCreated()) {
            // If mouse down outside of design area, but mouse up inside design area...
            return;
        } else if (this.__selectionBoxController.isSelectionBoxEmpty()) {
            this.__selectionBoxController.destroySelectionBox(false);
            this.__isSelectionBoxStretchedOnce = false;
            // Enable logic elements + terminals
            this.__enableAll('logic-element');
            this.__enableAll('input-terminal');
            this.__enableAll('output-terminal');
        } else if (!this.__selectionBoxController.isSelectionBoxPersistent()) {
            this.__selectionBoxController.persistSelectionBox();
        }
    };
    SelectionTool.prototype.dispose = function () {
        this.unload();
        if (this.__selectionBoxController.isSelectionBoxCreated() && !this.__selectionBoxController.isSelectionBoxPersistent()) {
            this.__selectionBoxController.destroySelectionBox(false);
        }
    };

    return SelectionTool;
});