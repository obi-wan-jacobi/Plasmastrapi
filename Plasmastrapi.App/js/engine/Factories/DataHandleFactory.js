define(['factory'],
function (Factory) {

    DataHandleFactory.prototype = Object.create(Factory.prototype);
    DataHandleFactory.prototype.constructor = DataHandleFactory;
    function DataHandleFactory(engine) {
        Factory.call(this, engine, 'data-handle');
    };

    return DataHandleFactory;
});