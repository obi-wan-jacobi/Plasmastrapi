define(function () {

    function Wireable() {
        Object.defineProperties(this, {
            'isWireable': {
                get: function () {
                    return true;
                }
            }
        });
    };

    return Wireable;
});