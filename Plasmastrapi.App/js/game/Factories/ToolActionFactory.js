define(['factory'],
function (Factory) {

    ToolActionFactory.prototype = Object.create(Factory.prototype);
    ToolActionFactory.prototype.constructor = ToolActionFactory;
    function ToolActionFactory(engine) {
        Factory.call(this, engine, 'tool-action', 'container');
    };
    ToolActionFactory.prototype.create = function (toolActionString) {
        return Factory.prototype.create.call(this, toolActionString, [this.__engine]);
    };

    return ToolActionFactory;
});