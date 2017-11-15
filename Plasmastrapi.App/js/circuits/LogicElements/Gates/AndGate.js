define(['gate', 'circuits-constants'],
function (Gate, constants) {

    AndGate.prototype = Object.create(Gate.prototype);
    AndGate.prototype.constructor = AndGate;
    function AndGate() {
        Gate.call(this);
    };
    AndGate.prototype.updateState = function (incomingState) {
        var nextState;
        if (!this.isPowered) {
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
