define(['entity-container'],
function (EntityContainer) {

    OutputTerminalContainer.prototype = Object.create(EntityContainer.prototype);
    OutputTerminalContainer.prototype.constructor = OutputTerminalContainer;
    function OutputTerminalContainer() {
        EntityContainer.call(this, 'output-terminal');
    };

    return OutputTerminalContainer;
});