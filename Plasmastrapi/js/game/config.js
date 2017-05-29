define([
    'game-debug'
],
function (debug) {

    $ = { debug };

    // UI

    $.MainMenuBackgroundPanel = {
        displayLayer: 'ondrawuibackground'
    };

    $.MainMenuNavigationPanel = {
        x: 650,
        y: 350,
        width: 1000,
        height: 400,
        displayLayer: 'ondrawuibackground',
        strokeStyle: 'white',
        //fillStyle: 'black',
        lineWidth: 2
    };

    $.MainMenuNavigationPanel.btnCircuitDesigner = {
        x: 650,
        y: 350,
        width: 500,
        height: 50,
        labelText: 'Circuit Designer'
    };

    $.CircuitDesignBlueprintPanel = {
        displayLayer: 'ondrawgamebackground'
    };

    $.SpawnerButton = {
        // image
        imageHandleDisplayLayer: 'ondrawuientities',
        // text-label
        textLabelDisplayLayer: 'ondrawuientities',
        textLabelOffsetBufferY: 3
    };

    $.ToolButton = {
        // image
        imageHandleDisplayLayer: 'ondrawuientities',
        // text-label
        textLabelDisplayLayer: 'ondrawuientities',
        textLabelOffsetBufferY: 3
    };

    $.MenuButton = {
        displayLayer: 'ondrawuientities'
    };

    // Tools

    $.Tool = {
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