define(['input-handler', 'utils'],
function (InputHandler, utils) {

    SelectHandler.prototype = Object.create(InputHandler.prototype);
    SelectHandler.prototype.constructor = SelectHandler;
    function SelectHandler(engine) {
        InputHandler.call(this, engine);
        this.__labController = this.__engine.getController('lab-controller');
        this.__logicElementContainer = this.__engine.getFactory('logic-element-factory').getContainer();
        this.__wireContainer = this.__engine.getFactory('wire-factory').getContainer();
        this.__inputTerminalContainer = this.__engine.getFactory('terminal-factory').getInputTerminalContainer();
        this.__outputTerminalContainer = this.__engine.getFactory('terminal-factory').getOutputTerminalContainer();
        this.__selectionBox = null;
        this.__isSelectionBoxPrioritized = false;
        this.__isSelectionBoxPersistent = false;
        this.__isSelectionBoxReadyForPlacing = false;
        this.__isSelectionBoxBeingPlaced = false;
    };
    // private methods
    SelectHandler.prototype.__oninit = function () {
    };
    SelectHandler.prototype.__onload = function () {
        // Disable wires
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__wireContainer.forEach(disableElement);
    };
    SelectHandler.prototype.__onunload = function () {
        // Re-enable wires
        function enableElement(element) {
            element.getComponent('pick-component').enable();
        };
        this.__wireContainer.forEach(enableElement);
    };
    SelectHandler.prototype.__initSelectionBox = function (position) {
        if (this.__selectionBox) {
            utils.validator.throw(this, 'initSelectionBox', 'A selection box has already been initialized');
        }
        this.__selectionBox = this.__engine.getFactory('ui-element-factory').create('selection-box');
        this.__selectionBox.startAt(position);
    };
    SelectHandler.prototype.__prioritizeSelectionBox = function () {
        this.__isSelectionBoxPrioritized = true;
        function pullSelectionBox() {
            this.__isSelectionBoxBeingPlaced = true;
            this.__selectionBox.getComponent('pick-component').disable();
        };
        function placeSelectionBox() {
            this.__isSelectionBoxReadyForPlacing = true;
            this.__selectionBox.getComponent('pick-component').disable();
        };
        this.__selectionBox.getComponent('pick-component').addEventListener('onpull', this, pullSelectionBox);
        this.__selectionBox.getComponent('pick-component').addEventListener('onpick', this, placeSelectionBox);
        // Disable everything else (in addition to wires)
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__logicElementContainer.forEach(disableElement);
        this.__inputTerminalContainer.forEach(disableElement);
        this.__outputTerminalContainer.forEach(disableElement);
    };
    SelectHandler.prototype.__destroySelectionBox = function () {
        if (this.__isSelectionBoxPrioritized) {
            // Re-enable everything else (except wires; they get re-enabled later already)
            function enableElement(element) {
                element.getComponent('pick-component').enable();
            };
            this.__logicElementContainer.forEach(enableElement);
            this.__inputTerminalContainer.forEach(enableElement);
            this.__outputTerminalContainer.forEach(enableElement);
        }
        var selections = this.__selectionBox.flushContents();
        selections.forEach(function (element) {
            element.getComponent('pick-component').deselect();
        });
        this.__selectionBox.destroy();
        this.__selectionBox = null;
        this.__isSelectionBoxPrioritized = false;
        this.__isSelectionBoxPersistent = false;
        this.__isSelectionBoxReadyForPlacing = false;
        this.__isSelectionBoxBeingPlaced = false;
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
        if (this.__isSelectionBoxBeingPlaced) {
            this.__selectionBox.pullTo(position);
        } else if (!this.__selectionBox || this.__isSelectionBoxPersistent) {
            return;
        } else {
            this.__selectionBox.stretchTo(position);
            if (!this.__isSelectionBoxPrioritized && (this.__selectionBox.getWidth() >= 1 || this.__selectionBox.getHeight() >= 1)) {
                this.__prioritizeSelectionBox();
            }
        }
    };
    SelectHandler.prototype.mousedown = function (position) {
        if (this.__selectionBox) {
            if (!this.__selectionBox.getComponent('pick-component').isPoked) {
                this.__destroySelectionBox();
            }
        }
        if (!this.__selectionBox) {
            this.__initSelectionBox(position);
        }
    };
    SelectHandler.prototype.mouseup = function () {
    };
    SelectHandler.prototype.click = function () {
        if (this.__selectionBox) {
            if (this.__selectionBox.isEmpty || this.__isSelectionBoxBeingPlaced) {
                this.__destroySelectionBox();
            }
        } else if (this.__isSelectionBoxReadyForPlacing) {
            this.__isSelectionBoxBeingPlaced = true;
        } else {
            this.__isSelectionBoxPersistent = true;
        }
    };
    SelectHandler.prototype.dispose = function () {
        this.unload();
        if (this.__selectionBox) {
            this.__destroySelectionBox();
        }
    };

    return SelectHandler;
});