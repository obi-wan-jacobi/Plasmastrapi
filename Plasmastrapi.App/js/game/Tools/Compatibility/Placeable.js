define(function () {

    function Placeable() {
        Object.defineProperties(this, {
            'isPlaceable': {
                get: function () {
                    return true;
                }
            }
        });
    };

    return Placeable;
});