define(['system'],
function (System) {

    LogicElementStateSystem.prototype = Object.create(System.prototype);
    LogicElementStateSystem.prototype.constructor = LogicElementStateSystem;
    function LogicElementStateSystem(engine) {
        System.call(this, engine);
        this.__logicElementContainer = null;
    };
    // private methods
    LogicElementStateSystem.prototype.__oninit = function () {
        System.prototype.__oninit.call(this);
        this.__logicElementContainer = this.__engine.getFactory('logic-element-factory').getContainer();
    };
    // public methods
    LogicElementStateSystem.prototype.loopOnce = function () {
        this.__logicElementContainer.forEach(function (element) {
            element.signalStateTransition();
        });
        return true;
    };

    return LogicElementStateSystem;
});