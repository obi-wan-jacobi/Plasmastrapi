define(['circuits-constants', 'circuits-debug'],
function (constants, debug) {

    $ = { constants, debug };

    $.DEBUG = false;

    $.LogicElement = {
        displayLayer: 'game-entity-midground'
    }

    $.WireElement = {
        displayLayer: 'game-entity-midground',
        wireColour: 'grey',
        lineThickness: 2
    };

    $.Wire = {
        collisionWidth: 25,
        collisionLengthModifier: 0.95,
        displayLayer: 'game-entity-midground',
        poweredLineWidth: 2,
        noPowerLineColour: 'white',
        lowLineColour: '#FF5AC8',
        highLineColour: '#00FF00',
        cuttingHoverColour: 'red'
    };

    $.Terminal = {
        displayLayer: 'game-entity-midground',
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