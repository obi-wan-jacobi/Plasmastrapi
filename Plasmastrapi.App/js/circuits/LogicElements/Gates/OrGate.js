define(['gate', 'circuits-constants'],
function (Gate, constants) {

    OrGate.prototype = Object.create(Gate.prototype);
    OrGate.prototype.constructor = OrGate;
    function OrGate() {
        Gate.call(this);
    };
    OrGate.prototype.updateState = function () {
        var nextState = constants.STATES.NO_POWER;
        this.__inputs.forEach(function (input) {
            return input.getConnections().forEach(function (connection) {
                if (connection.isHigh) {
                    nextState = constants.STATES.HIGH;
                    return 'break';
                } else if (connection.isLow) {
                    nextState = constants.STATES.LOW;
                }
            }, this);
        }, this);
        this.setState(nextState);
    };

    return OrGate;
});