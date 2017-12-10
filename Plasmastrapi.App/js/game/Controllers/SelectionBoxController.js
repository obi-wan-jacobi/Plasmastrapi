define(['controller', 'utils'],
function (Controller, utils) {

    SelectionBoxController.prototype = Object.create(Controller.prototype);
    SelectionBoxController.prototype.constructor = SelectionBoxController;
    function SelectionBoxController(engine) {
        Controller.call(this, engine);
        this.__labController = null;
        this.__cursorController = null;
        this.__revisionController = null;
        this.__toolActionFactory = null;
        this.__selectionBox = null;
        this.__isSelectionBoxPersistent = false;
    };
    // private methods
    SelectionBoxController.prototype.__oninit = function () {
        Controller.prototype.__oninit.call(this);
        this.__labController = this.__engine.getController('lab-controller');
        this.__cursorController = this.__engine.getController('cursor-controller');
        this.__revisionController = this.__engine.getController('revision-controller');
        this.__toolActionFactory = this.__engine.getFactory('tool-action-factory');
    };
    SelectionBoxController.prototype.__createSelectionBox = function (position) {
        if (this.__selectionBox) {
            utils.validator.throw(this, 'createSelectionBox', 'A selection box has already been initialized');
        }
        this.__selectionBox = this.__engine.getFactory('ui-element-factory').create('selection-box');
        this.__selectionBox.startAt(position);
    };
    SelectionBoxController.prototype.__persistSelectionBox = function () {
        this.__isSelectionBoxPersistent = true;
        var designArea = this.__labController.getDesignArea();
        // *** closures ***
        function onmouseenter() {
            this.__cursorController.setPointer();
        };
        function onmouseleave() {
            this.__cursorController.setDefault();
        };
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
        var self = this;
        function destroySelectionBox() {
            self.__destroySelectionBox();
        };
        this.__selectionBox.getComponent('pick-component').addEventListener('onmouseenter', this, onmouseenter);
        this.__selectionBox.getComponent('pick-component').addEventListener('onmouseleave', this, onmouseleave);
        this.__selectionBox.getComponent('pick-component').addEventListener('onpull', this, pullSelectionBox);
        this.__selectionBox.getComponent('pick-component').addEventListener('onpick', this, placeSelectionBox);
        designArea.getComponent('pick-component').addEventListener('onmouseleave', this.__selectionBox, destroySelectionBox);
        designArea.getComponent('pick-component').addEventListener('onpick', this.__selectionBox, function () {
            if (!this.getComponent('pick-component').isProdded) {
                self.__destroySelectionBox();
            }
        });
    };
    SelectionBoxController.prototype.__destroySelectionBox = function (isContentAlsoToBeDestroyed) {
        if (isContentAlsoToBeDestroyed && !this.__selectionBox.isEmpty) {
            var batch = this.__toolActionFactory.create('batch-tool-action');
            this.__selectionBox.forEach(function (logicElement) {
                var action = this.__toolActionFactory.create('trash-action');
                action.setTarget(logicElement);
                batch.addAction(action);
            }, this);
            this.__revisionController.addAction(batch);
        } else {
            var selections = this.__selectionBox.flushContents();
            selections.forEach(function (element) {
                element.getComponent('pick-component').deselect();
            });
        }
        if (this.__isSelectionBoxPersistent) {
            this.__labController.getDesignArea().getComponent('pick-component').removeEventListener('onmouseleave', this.__selectionBox);
        }
        this.__selectionBox.destroy();
        this.__selectionBox = null;
        this.__isSelectionBoxPersistent = false;
    };
    // public methods
    SelectionBoxController.prototype.createSelectionBox = function (position) {
        if (!this.__selectionBox) {
            this.__createSelectionBox(position);
            return true;
        } else {
            return false;
        }
    };
    SelectionBoxController.prototype.persistSelectionBox = function () {
        if (this.__selectionBox && !this.__isSelectionBoxPersistent &&
            (this.__selectionBox.getWidth() >= 1 || this.__selectionBox.getHeight() >= 1)
        ) {
            this.__persistSelectionBox();
            return true;
        } else {
            return false;
        }
    };
    SelectionBoxController.prototype.destroySelectionBox = function (isContentAlsoToBeDestroyed) {
        if (this.__selectionBox) {
            this.__destroySelectionBox(isContentAlsoToBeDestroyed);
            return true;
        } else {
            return false;
        }
    };
    SelectionBoxController.prototype.isSelectionBoxCreated = function () {
        return !utils.validator.isNullOrUndefined(this.__selectionBox);
    };
    SelectionBoxController.prototype.isSelectionBoxPersistent = function () {
        return this.__isSelectionBoxPersistent;
    };
    SelectionBoxController.prototype.isSelectionBoxEmpty = function () {
        return this.__selectionBox ? this.__selectionBox.isEmpty : true;
    };
    SelectionBoxController.prototype.stretchSelectionBoxTo = function (position) {
        if (this.__selectionBox) {
            this.__selectionBox.stretchTo(position);
            return true;
        } else {
            return false;
        }
    };

    return SelectionBoxController;
});