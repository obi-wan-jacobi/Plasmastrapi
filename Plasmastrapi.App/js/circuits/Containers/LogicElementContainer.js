define(['entity-container'],
function (EntityContainer) {

    // CLASS LogicElementContainer
    LogicElementContainer.prototype = Object.create(EntityContainer.prototype);
    LogicElementContainer.prototype.constructor = LogicElementContainer;
    function LogicElementContainer() {
        EntityContainer.call(this, 'logic-element');
    };

    return LogicElementContainer;
});