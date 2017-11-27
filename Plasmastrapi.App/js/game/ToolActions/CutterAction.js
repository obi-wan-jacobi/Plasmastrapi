define(['tool-action', 'utils'],
function (ToolAction, utils) {

    CutterAction.prototype = Object.create(ToolAction.prototype);
    CutterAction.prototype.constructor = CutterAction;
    function CutterAction() {
        ToolAction.call(this);
    };
    CutterAction.prototype.undo = function () {
    };
    CutterAction.prototype.redo = function () {
    };

    return CutterAction;
});