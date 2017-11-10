define(['core-constants', 'core-debug'], function (constants, debug) {

    $ = { constants, debug };

    $.DEBUG = false;

    $.LineHandle = {
        collisionWidth: 20,
        lengthModifier: 1
    };

    return $;
});