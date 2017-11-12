define(['factory'],
function (Factory) {

    PrimitiveFactory.prototype = Object.create(Factory.prototype);
    PrimitiveFactory.prototype.constructor = PrimitiveFactory;
    function PrimitiveFactory(engine) {
        Factory.call(this, engine, 'primitive');
    };

    return PrimitiveFactory;
});