define(['tool-handler'],
function (ToolHandler) {

    TrashTool.prototype = Object.create(ToolHandler.prototype);
    TrashTool.prototype.constructor = TrashTool;
    function TrashTool(engine) {
        ToolHandler.call(this, engine);
        this.__isSelectionBoxStretchedOnce = false;
    };
    // private methods
    TrashTool.prototype.__oninit = function () {
    };
    TrashTool.prototype.__onload = function () {
        this.__enableAll('logic-element');
    };
    TrashTool.prototype.__onunload = function () {
        if (!this.__isSelectionBoxStretchedOnce) {
            this.__disableAll('logic-element');
        }
    };
    // public methods
    TrashTool.prototype.keydown = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOn();
        } else {
            ToolHandler.prototype.keydown.call(this, keyboardHandle);
        }
    };
    TrashTool.prototype.keyup = function (keyboardHandle) {
        var keyString = keyboardHandle.getKeyString();
        if (keyString === 'shift') {
            this.__labController.setRepeatLastActionOff();
            this.__labController.idle();
        }
    };
    TrashTool.prototype.enter = function () {
    };
    TrashTool.prototype.escape = function () {
    };
    TrashTool.prototype.mousemove = function (position) {
        if (!this.__selectionBoxController.isSelectionBoxCreated()) {
            return;
        } else {
            this.__selectionBoxController.stretchSelectionBoxTo(position);
            if (!this.__isSelectionBoxStretchedOnce) {
                this.__isSelectionBoxStretchedOnce = true;
                this.__disableAll('logic-element');
            }
        }
    };
    TrashTool.prototype.mousedown = function (position) {
        if (!this.__selectionBoxController.isSelectionBoxCreated()) {
            this.__selectionBoxController.createSelectionBox(position);
        }
    };
    TrashTool.prototype.mouseup = function () {
        this.__labController.flushTarget();
    };
    TrashTool.prototype.click = function () {
        var target = this.__labController.flushTarget();
        if (target) {
            var action = this.__toolActionFactory.create('trash-action');
            action.setTarget(target);
            this.__revisionController.addAction(action);
            target.destroy();
        }
        this.__labController.idle();
    };
    TrashTool.prototype.dispose = function () {
        this.unload();
        this.__selectionBoxController.destroySelectionBox(true);
        this.__labController.setRepeatLastActionOff();
    };

    return TrashTool;
});