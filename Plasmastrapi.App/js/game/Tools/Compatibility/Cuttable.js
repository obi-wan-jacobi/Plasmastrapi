define(function () {

    function Cuttable() {
        Object.defineProperties(this, {
            'isCuttable': {
                get: function () {
                    return true;
                }
            }
        });
    };

    return Cuttable;
});