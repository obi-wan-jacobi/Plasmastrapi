define([
],
function () {

    $ = {};

    $.CircuitElement = {
        spriteHandleDisplayLayer: 'ondrawgameentities'
    };

    $.WireElement = {
        displayLayer: 'ondrawgameentities',
        wireColour: '#FFFFFF',
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

    return $;
});