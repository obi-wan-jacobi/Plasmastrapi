define(['factory'],
function (Factory) {

    WireFactory.prototype = Object.create(Factory.prototype);
    WireFactory.prototype.constructor = WireFactory;
    function WireFactory() {

    };

    return WireFactory;
});