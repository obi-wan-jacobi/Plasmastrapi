define(['container', 'logic-element'],
function (Container, LogicElement) {

    // CLASS LogicElementContainer
    LogicElementContainer.prototype = Object.create(Container.prototype);
    LogicElementContainer.prototype.constructor = LogicElementContainer;
    function LogicElementContainer() {
        Container.call(this, LogicElement);
    };
    LogicElementContainer.prototype.add = function (logicElement) {
        Container.prototype.add.call(this, logicElement);
        logicElement.addEventListener('ondestroy', this, this.remove.bind(this, logicElement));
    };

    return LogicElementContainer;
});