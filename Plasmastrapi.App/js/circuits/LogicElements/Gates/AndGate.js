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
            var isConnectedToALow = input.getConnections().find(function (connection) {
                return connection.isLow;
            });
            if (isConnectedToALow) {
                nextState = constants.STATES.LOW;
                return false;
            }
            var isConnectedToAHigh = input.getConnections().find(function (connection) {
                return connection.isHigh;
            });
            if (isConnectedToAHigh) {
                nextState = constants.STATES.HIGH;
                return false;
            }
        }, this);
        this.setState(nextState);
    };
    
    return AndGate;
});
