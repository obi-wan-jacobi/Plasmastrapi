define(["../Base/Cursor"], function (Cursor) {

    CuttingToolCursor.prototype = Object.create(Cursor.prototype);
    CuttingToolCursor.prototype.constructor = CuttingToolCursor;
    function CuttingToolCursor(x, y, offsetX, offsetY, tool) {
        Cursor.call(this, x, y, offsetX, offsetY, tool);
    };

    return CuttingToolCursor;
});