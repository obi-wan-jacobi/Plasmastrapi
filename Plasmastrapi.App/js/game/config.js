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

    $.Wire = {
        collisionWidth: 25,
        collisionLengthModifier: 0.95,
        displayLayer: 'ondrawgameentities',
        poweredLineWidth: 2,
        noPowerLineColour: 'white',
        lowLineColour: '#FF5AC8',
        highLineColour: '#00FF00',
        cuttingHoverColour: 'red'
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

    $.CircuitDesignBlueprintPanel = {
        displayLayer: 'ondrawgamebackground'
    };

    $.ToolbarButton = {
        textLabelDisplayLayer: 'ondrawuientities',
        textLabelOffsetBufferY: 3
    };

    $.SpawnerButton = {
        imageHandleDisplayLayer: 'ondrawuientities'
    };

    $.ToolButton = {
        displayLayer: 'ondrawuientities'
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