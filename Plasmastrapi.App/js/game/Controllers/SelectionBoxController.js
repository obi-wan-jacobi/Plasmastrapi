define(['controller', 'dictionary', 'utils'],
function (Controller, Dictionary, utils) {

    SelectionBoxController.prototype = Object.create(Controller.prototype);
    SelectionBoxController.prototype.constructor = SelectionBoxController;
    function SelectionBoxController(engine) {
        Controller.call(this, engine);
        this.__labController = null;
        this.__cursorController = null;
        this.__revisionController = null;
        this.__toolActionFactory = null;
        this.__wireContainer = null;
        this.__selectionBox = null;
        this.__isSelectionBoxPersistent = false;
        this.__isSelectionBoxBeingPlaced = false;
        this.__initialPositions = new Dictionary('position');
    };
    // private methods
    SelectionBoxController.prototype.__validateSelectionBoxHasBeenCreated = function () {
        if (!this.__selectionBox) {
            utils.validator.throw(this, 'validateSelectionBoxHasBeenCreated', 'Selection box has not been created');
        }
    };
    SelectionBoxController.prototype.__oninit = function () {
        Controller.prototype.__oninit.call(this);
        this.__labController = this.__engine.getController('lab-controller');
        this.__cursorController = this.__engine.getController('cursor-controller');
        this.__revisionController = this.__engine.getController('revision-controller');
        this.__toolActionFactory = this.__engine.getFactory('tool-action-factory');
        this.__wireContainer = this.__engine.getFactory('augmented-wire-factory').getContainer();
    };
    SelectionBoxController.prototype.__createSelectionBox = function (position) {
        if (this.__selectionBox) {
            utils.validator.throw(this, 'createSelectionBox', 'A selection box has already been created');
        }
        this.__selectionBox = this.__engine.getFactory('ui-element-factory').create('selection-box');
        this.__selectionBox.startAt(position);
    };
    SelectionBoxController.prototype.__persistSelectionBox = function () {
        this.__validateSelectionBoxHasBeenCreated();
        if (this.__isSelectionBoxPersistent) {
            utils.validator.throw(this, 'persistSelectionBox', 'Selection box has already been persisted');
        }
        if (!(this.__selectionBox.getWidth() >= 1 || this.__selectionBox.getHeight() >= 1)) {
            return;
        }
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
        this.__validateSelectionBoxHasBeenCreated();
        if (isContentAlsoToBeDestroyed && !this.__selectionBox.isEmpty) {
            var batch = this.__toolActionFactory.create('batch-destroy-logic-elements-action');
            var selections = this.__selectionBox.flushContents();
            selections.forEach(function (logicElement) {
                var action = this.__toolActionFactory.create('destroy-logic-element-action');
                action.setTarget(logicElement);
                batch.addAction(action);
            }, this);
            this.__wireContainer.forEach(function (wire) {
                if (this.__selectionBox.contains(wire.inputTerminal) || this.__selectionBox.contains(wire.outputTerminal)) {
                    var action = this.__toolActionFactory.create('destroy-wire-action');
                    action.setTarget(wire);
                    batch.addAction(action);
                }
            }, this);
            this.__revisionController.addAction(batch);
            batch.execute();
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
        this.__createSelectionBox(position);
    };
    SelectionBoxController.prototype.persistSelectionBox = function () {
        this.__persistSelectionBox();
    };
    SelectionBoxController.prototype.destroySelectionBox = function (isContentAlsoToBeDestroyed) {
        this.__destroySelectionBox(isContentAlsoToBeDestroyed);
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
        this.__validateSelectionBoxHasBeenCreated();
        this.__selectionBox.stretchTo(position);
    };
    SelectionBoxController.prototype.beginSelectionBoxPlacement = function () {
        this.__validateSelectionBoxHasBeenCreated();
        if (this.__isSelectionBoxBeingPlaced) {
            utils.validator.throw(this, 'beginSelectionBoxPlacement', 'Selection box is already being placed');
        }
        this.__isSelectionBoxBeingPlaced = true;
        this.__initialPositions = new Dictionary('position');
        this.__selectionBox.forEach(function (element) {
            var data = element.getComponent('pose-component').getHandle().getPosition();
            this.__initialPositions.add(element, data);
        }, this);
    };
    SelectionBoxController.prototype.moveSelectionBoxTo = function (position) {
        this.__validateSelectionBoxHasBeenCreated();
        if (!this.__isSelectionBoxBeingPlaced) {
            utils.validator.throw(this, 'moveSelectionBoxTo', 'beginSelectionBoxPlacement() must be called before this method');
        }
        this.__selectionBox.pullTo(position);
        var designArea = this.__labController.getDesignArea();
        this.__selectionBox.forEach(designArea.confine, designArea);
    };
    SelectionBoxController.prototype.endSelectionBoxPlacement = function () {
        if (!this.__isSelectionBoxBeingPlaced) {
            utils.validator.throw(this, 'endSelectionBoxPlacement', 'beginSelectionBoxPlacement() must be called before this method');
        }
        this.__isSelectionBoxBeingPlaced = false;
        var batch = this.__toolActionFactory.create('batch-tool-action');
        this.__initialPositions.forEach(function (element, position) {
            var action = this.__toolActionFactory.create('place-action');
            action.setTarget(element);
            action.setInitialPosition(position);
            batch.addAction(action);
        }, this);
        this.__revisionController.addAction(batch);
    };

    return SelectionBoxController;
});