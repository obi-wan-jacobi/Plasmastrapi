define(['tool-action', 'utils'],
function (ToolAction, utils) {

    PlaceAction.prototype = Object.create(ToolAction.prototype);
    PlaceAction.prototype.constructor = PlaceAction;
    function PlaceAction() {
        ToolAction.call(this);
    };
    PlaceAction.prototype.undo = function () {
    };
    PlaceAction.prototype.redo = function () {
    };

    return PlaceAction;
});