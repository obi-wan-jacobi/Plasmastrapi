define(['gate', 'circuits-constants'],
function (Gate, constants) {

    NandGate.prototype = Object.create(Gate.prototype);
    NandGate.prototype.constructor = NandGate;
    function NandGate() {
        Gate.call(this);
    };
    NandGate.prototype.updateState = function () {
        var nextState = constants.STATES.NO_POWER;
        this.__inputs.forEach(function (input) {
            return input.getConnections().forEach(function (connection) {
                if (connection.isHigh) {
                    nextState = constants.STATES.LOW;
                } else if (connection.isLow) {
                    nextState = constants.STATES.HIGH;
                    return 'break'
                }
            }, this);
        }, this);
        if (nextState !== this.getState()) {
            this.setState(nextState);
        }
    };

    return NandGate;
});