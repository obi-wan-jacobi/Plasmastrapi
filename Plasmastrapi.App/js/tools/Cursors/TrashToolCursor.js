define([
    'cursor'
],
function (Cursor) {

    TrashToolCursor.prototype = Object.create(Cursor.prototype);
    TrashToolCursor.prototype.constructor = TrashToolCursor;
    function TrashToolCursor(x, y, offsetX, offsetY, tool) {
        Cursor.call(this, x, y, offsetX, offsetY, tool);
    };

    return TrashToolCursor;
});