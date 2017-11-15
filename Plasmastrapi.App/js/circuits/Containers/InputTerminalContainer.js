define(['entity-container'],
function (EntityContainer) {

    // CLASS InputTerminalContainer
    InputTerminalContainer.prototype = Object.create(EntityContainer.prototype);
    InputTerminalContainer.prototype.constructor = InputTerminalContainer;
    function InputTerminalContainer() {
        EntityContainer.call(this, 'input-terminal');
    };

    return InputTerminalContainer;
});