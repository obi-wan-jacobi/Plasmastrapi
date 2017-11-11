define(['container'],
function (Container) {

    // CLASS LogicElementContainer
    LogicElementContainer.prototype = Object.create(Container.prototype);
    LogicElementContainer.prototype.constructor = LogicElementContainer;
    function LogicElementContainer() {
        Container.call(this, 'logic-element');
    };
    LogicElementContainer.prototype.add = function (logicElement) {
        Container.prototype.add.call(this, logicElement);
        logicElement.addEventListener('ondestroy', this, this.remove.bind(this, logicElement));
    };

    return LogicElementContainer;
});