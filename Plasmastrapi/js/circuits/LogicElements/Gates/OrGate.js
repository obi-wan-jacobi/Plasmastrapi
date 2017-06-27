define(['gate', 'circuit-constants'],
function (Gate, CIRCUITS) {

    // CLASS OrGate
    OrGate.prototype = Object.create(Gate.prototype);
    OrGate.prototype.constructor = OrGate;
    function OrGate() {
        Gate.call(this);
    };
    OrGate.prototype.updateState = function (inputState) {
        var STATES = CIRCUITS.STATES;
        var connections = this.__inputs;
        var nextState = STATES.LOW;
        var isPowered = false;
        // if this update was initiated by connection removal
        if (inputState === STATES.NOPOWER) {
            for (var i = 0, L = connections.length; i < L; i++) {
                if (connections[i].isPowered) {
                    isPowered = true;
                    nextState = nextState || connections[i].state;
                }
            }
            if (!isPowered) {
                this.outputTerminal.state = STATES.NOPOWER;
            } else {
                this.outputTerminal.state = nextState;
            }
        } else {
            if (!this.outputTerminal.isPowered) {
                this.outputTerminal.state = inputState;
            } else {
                this.outputTerminal.state = this.outputTerminal.state || inputState;
            }
        }
    };

    return OrGate;
});