define(['gate', 'circuits-constants'],
function (Gate, constants) {

    AndGate.prototype = Object.create(Gate.prototype);
    AndGate.prototype.constructor = AndGate;
    function AndGate() {
        Gate.call(this);
    };
    AndGate.prototype.updateState = function () {
        var nextState = constants.STATES.NO_POWER;
        this.__inputs.forEach(function (input) {
            return input.getConnections().forEach(function (connection) {
                if (connection.isHigh) {
                    nextState = constants.STATES.HIGH;
                } else if (connection.isLow) {
                    nextState = constants.STATES.LOW;
                    return 'break';
                }
            }, this);
        }, this);
        this.setState(nextState);
    };
    
    return AndGate;
});
