define(['gate', 'circuits-constants', 'utils'],
function (Gate, constants, utils) {

    AndGate.prototype = Object.create(Gate.prototype);
    AndGate.prototype.constructor = AndGate;
    function AndGate() {
        Gate.call(this);
    };
    AndGate.prototype.updateState = function (incomingState) {
        var nextState;
        if (this.isPowered && utils.validator.isNullOrUndefined(incomingState)) {
            nextState = constants.STATES.NO_POWER;
            this.__inputs.forEach(function (input) {
                input.getConnections().forEach(function (connection) {
                    var state = connection.getState();
                    if (nextState === constants.STATES.NO_POWER) {
                        nextState = state;
                    } else if (connection.isPowered) {
                        nextState = nextState && state;
                    }
                }, this);
            }, this);
        } else if (!this.isPowered) {
            nextState = incomingState;
        } else if (this.isLow) {
            return;
        } else {
            nextState = this.getState() && incomingState;
        }
        if (nextState !== this.getState()) {
            this.setState(nextState);
        }
    };
    
    return AndGate;
});
