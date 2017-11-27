define(['gate', 'circuits-constants'],
function (Gate, constants) {

    XorGate.prototype = Object.create(Gate.prototype);
    XorGate.prototype.constructor = XorGate;
    function XorGate() {
        Gate.call(this);
    };
    XorGate.prototype.updateState = function () {
        var nextState = constants.STATES.NO_POWER;
        var numberOfHighInputs = 0;
        this.__inputs.forEach(function (input) {
            return input.getConnections().forEach(function (connection) {
                if (connection.isHigh) {
                    numberOfHighInputs++;
                    if (numberOfHighInputs > 1) {
                        nextState = constants.STATES.LOW;
                        return 'break';
                    }
                } else if (connection.isLow) {
                    nextState = constants.STATES.LOW;
                }
            }, this);
        }, this);
        if (numberOfHighInputs === 1) {
            nextState = constants.STATES.HIGH;
        }
        this.setState(nextState);
    };

    return XorGate;
});