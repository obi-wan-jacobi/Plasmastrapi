define(['gate', 'circuits-constants'],
function (Gate, constants) {

    // CLASS XorGate
    XorGate.prototype = Object.create(Gate.prototype);
    XorGate.prototype.constructor = XorGate;
    function XorGate() {
        Gate.call(this);
    };
    XorGate.prototype.updateState = function (incomingState) {
        var nextState;
        if (!this.isPowered) {
            nextState = incomingState;
        } else if (incomingState > constants.STATES.NO_POWER) {
            nextState = (this.getState() || incomingState) && !(this.getState() && incomingState);
        }
        if (nextState !== this.getState()) {
            this.setState(nextState);
        }
    };

    return XorGate;
});