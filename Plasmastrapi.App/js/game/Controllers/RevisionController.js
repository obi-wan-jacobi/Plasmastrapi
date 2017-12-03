define(['controller', 'container', 'utils'],
function (Controller, Container, utils) {

    RevisionController.prototype = Object.create(Controller.prototype);
    RevisionController.prototype.constructor = RevisionController;
    function RevisionController(engine) {
        Controller.call(this, engine);
        this.__undoContainer = new Container('tool-action');
        this.__redoContainer = new Container('tool-action');
    };
    // public methods
    RevisionController.prototype.addAction = function (action) {
        this.__undoContainer.add(action);
        this.__redoContainer = new Container('tool-action');
    };
    RevisionController.prototype.undo = function () {
        if (this.__undoContainer.length < 1) {
            return;
        }
        var action = this.__undoContainer.pop();
        action.undo();
        this.__redoContainer.add(action);
    };
    RevisionController.prototype.redo = function () {
        if (this.__redoContainer.length < 1) {
            return;
        }
        var action = this.__redoContainer.pop();
        action.redo();
        this.__undoContainer.add(action);
    };

    return RevisionController;
});