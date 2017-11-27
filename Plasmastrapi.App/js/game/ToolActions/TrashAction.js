define(['tool-action', 'utils'],
function (ToolAction, utils) {

    TrashAction.prototype = Object.create(ToolAction.prototype);
    TrashAction.prototype.constructor = TrashAction;
    function TrashAction() {
        ToolAction.call(this);
    };
    TrashAction.prototype.undo = function () {
    };
    TrashAction.prototype.redo = function () {
    };

    return TrashAction;
});