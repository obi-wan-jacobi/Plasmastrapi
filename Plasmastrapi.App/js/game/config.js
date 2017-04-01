define(["game/debug"], function (debug) {

    $ = { debug };

    // Circuits

    $.BaseElement = {
        spriteHandleDisplayLayer: 'ondrawgameentities'
    };

    $.WireElement = {
        displayLayer: 'ondrawgameentities',
        wireColour:'#FFFFFF',
        lineThickness: 2
    };

    $.Terminal = {
        collisionBounds: { width: 20, height: 20 },
        frameOnMouseEnter: 2
    };

    $.InputTerminal = {
        defaultFrameIndex: 1
    };

    $.OutputTerminal = {
        defaultFrameIndex: 0
    };

    $.Gate = {
        terminalOffsetMarginY: 35
    };

    // UI

    $.ToolbarButton = {
        textLabelDisplayLayer: 'ondrawuientities',
        textLabelOffsetBufferY: 3
    };

    $.SpawnerButton = {
        imageHandleDisplayLayer: 'ondrawuientities'
    };

    // Tools

    $.CuttingTool = {
        beforeCuttingBounds: { width: 10, height: 10 },
        curveDisplayLayer: 'ondrawuientities', 
        curveDisplayColour: 'red', 
        curveLineThickness: 2
    };

    $.PickingTool = {
        beforeDragBounds: { width: 20, height: 20 },
        beforeSelectionBounds: { width: 40, height: 40 }
    };

    $.TrashTool = {
        beforeSelectionBounds: { width: 50, height: 50 }
    };

    return $;
});