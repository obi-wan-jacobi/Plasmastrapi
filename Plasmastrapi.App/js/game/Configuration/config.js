define([
    'game-debug'
],
function (debug) {

    $ = { debug };

    // Tools

    $.InputHandler = {
        cursorOffsetX: 35,
        cursorOffsetY: 35
    };

    $.Cursor = {
        displayLayer: 'ondrawuiforeground'
    };

    $.CuttingTool = {
        beforeCuttingBounds: { width: 10, height: 10 },
        curveDisplayLayer: 'ondrawuientities', 
        curveDisplayColour: 'red', 
        curveLineThickness: 2
    };

    $.PickingTool = {
        // selection box fillStyle '#51ED39'
        beforeDragBounds: { width: 20, height: 20 },
        beforeSelectionBounds: { width: 40, height: 40 }
    };

    $.SelectionBox = {
        displayLayer: 'ondrawgameentities'
    };

    $.TrashTool = {
        beforeSelectionBounds: { width: 50, height: 50 }
    };

    return $;
});