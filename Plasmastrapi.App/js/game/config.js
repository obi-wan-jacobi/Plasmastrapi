define(["game/debug", "engine/Namespaces/$Data"], function (debug, $Data) {

    $ = { debug };

    // Circuits

    $.BaseElement = {
        spriteHandleDisplayLayer: 'ondrawgameentities'
    };

    $.WireElement = {
        lineDisplayOptions: new $Data.Graphics.LineDisplayOptions('ondrawgameentities', '#FFFFFF', 2)
    };

    $.Terminal = {
        collisionBounds: new $Data.Geometry.Rectangle(20, 20),
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
        beforeCuttingBounds: new $Data.Geometry.Rectangle(50, 50),
        curveDisplayOptions: new $Data.Graphics.LineDisplayOptions('ondrawuientities', 'red', 2)
    };

    $.PickingTool = {
        beforeDragBounds: new $Data.Geometry.Rectangle(20, 20),
        beforeSelectionBounds: new $Data.Geometry.Rectangle(50, 50)
    };

    $.TrashTool = {
        beforeSelectionBounds: new $Data.Geometry.Rectangle(50, 50)
    };

    return $;
});