define(['gate', 'circuits-constants', 'utils'],
function (Gate, constants, utils) {

    NandGate.prototype = Object.create(Gate.prototype);
    NandGate.prototype.constructor = NandGate;
    function NandGate() {
        Gate.call(this);
    };
    NandGate.prototype.updateState = function (incomingState) {
        var nextState;
        if (this.isPowered && utils.validator.isNullOrUndefined(incomingState)) {
            nextState = constants.STATES.NO_POWER;
            this.__inputs.forEach(function (input) {
                return input.getConnections(function (connection) {
                    if (connection.isHigh) {
                        nextState = constants.STATES.LOW;
                    } else if (connection.isLow) {
                        nextState = constants.STATES.HIGH;
                        return 'break'
                    }
                }, this);
            }, this);
        } else if (this.isPowered && incomingState > constants.STATES.NO_POWER) {
            nextState = !(!this.getState() && incomingState) | 0;
        } else if (!utils.validator.isNullOrUndefined(incomingState)) {
            nextState = incomingState;
        }
        if (nextState !== this.getState()) {
            this.setState(nextState);
        }
    };

    return NandGate;
});