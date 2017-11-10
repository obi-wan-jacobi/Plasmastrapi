define(['ui-debug'],
function (debug) {

    $ = { debug };

    $.DEBUG = false;

    $.Button = {
        displayLayer: 'ui-entity-midground'
    };

    $.Panel = {
        displayLayer: 'ui-entity-background'
    }
        
    return $;
});