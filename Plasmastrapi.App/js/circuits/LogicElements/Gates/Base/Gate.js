define(['logic-element'],
function (LogicElement) {

    Gate.prototype = Object.create(LogicElement.prototype);
    Gate.prototype.constructor = Gate;
    function Gate() {
        LogicElement.call(this);
    };
    
    return Gate;
});