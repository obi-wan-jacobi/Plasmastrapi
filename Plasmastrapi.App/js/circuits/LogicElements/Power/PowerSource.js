define(['logic-element', 'circuits-constants'],
function (LogicElement, CIRCUITS) {

    // CLASS PowerSource
    PowerSource.prototype = Object.create(LogicElement.prototype);
    PowerSource.prototype.constructor = PowerSource;
    function PowerSource() {
        LogicElement.call(this);
        // initialize high
        this.__state = CIRCUITS.STATES.HIGH;
    };
    
    return PowerSource;
});