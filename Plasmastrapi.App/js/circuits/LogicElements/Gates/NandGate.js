define(['gate', 'circuits-constants'],
function (Gate, CIRCUITS) {

    // CLASS NandGate
    NandGate.prototype = Object.create(Gate.prototype);
    NandGate.prototype.constructor = NandGate;
    function NandGate() {
        Gate.call(this);
    };
    NandGate.prototype.updateState = function (inputState) {
        var STATES = CIRCUITS.STATES;
        var connections = this.__inputs;
        var nextState = STATES.HIGH;
        var isPowered = false;
        // if this update was initiated by connection removal
        if (inputState === STATES.NOPOWER) {
            for (var i = 0, L = connections.length; i < L; i++) {
                if (connections[i].isPowered) {
                    isPowered = true;
                    nextState = nextState && connections[i].state;
                }
            }
            if (!isPowered) {
                this.outputTerminal.state = STATES.NOPOWER;
            } else {
                this.outputTerminal.state = !nextState | 0;
            }
        } else {
            if (!this.outputTerminal.isPowered) {
                this.outputTerminal.state = !inputState | 0;
            } else if (this.outputTerminal.isLow && inputState === STATES.LOW) {
                this.outputTerminal.state = STATES.HIGH;
            }
        }
    };

    return NandGate;
});