define(['gate', 'circuits-constants'],
function (Gate, constants) {

    OrGate.prototype = Object.create(Gate.prototype);
    OrGate.prototype.constructor = OrGate;
    function OrGate() {
        Gate.call(this);
    };
    OrGate.prototype.updateState = function (incomingState) {
        var nextState;
        if (!this.isPowered) {
            nextState = incomingState;
        } else if (incomingState > constants.STATES.NO_POWER) {
            nextState = this.getState() || incomingState;
        }
        if (nextState !== this.getState()) {
            this.setState(nextState);
        }
    };

    return OrGate;
});