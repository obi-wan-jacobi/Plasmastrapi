define([
    'ui-debug'
],
function (debug) {

    $ = { debug };

    $.Button = {
        displayLayer: 'ui-entity-midground'
    };

    $.Panel = {
        displayLayer: 'ui-entity-background'
    }
        
    return $;
});