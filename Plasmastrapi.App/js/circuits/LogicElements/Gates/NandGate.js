define(['gate', 'circuits-constants'],
function (Gate, constants) {

    NandGate.prototype = Object.create(Gate.prototype);
    NandGate.prototype.constructor = NandGate;
    function NandGate() {
        Gate.call(this);
    };
    NandGate.prototype.updateState = function (incomingState) {
        var nextState;
        if (incomingState > constants.STATES.NO_POWER) {
            nextState = !(!this.getState() && incomingState) | 0;
        } else {
            return;
        }
        if (nextState !== this.getState()) {
            this.setState(nextState);
        }
    };

    return NandGate;
});