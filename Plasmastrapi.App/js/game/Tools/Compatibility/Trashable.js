define(function () {

    function Trashable() {
        Object.defineProperties(this, {
            'isTrashable': {
                get: function () {
                    return true;
                }
            }
        });
    };

    return Trashable;
});