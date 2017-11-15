define(['gate', 'circuits-constants'],
function (Gate, CIRCUITS) {

    // CLASS OrGate
    XorGate.prototype = Object.create(Gate.prototype);
    XorGate.prototype.constructor = XorGate;
    function XorGate() {
        Gate.call(this);
    };
    XorGate.prototype.updateState = function (inputState) {
        var STATES = CIRCUITS.STATES;
        var connections = this.__inputs;
        var nextState = STATES.LOW;
        var isPowered = false;
        // if this update was initiated by connection removal
        if (inputState === STATES.NO_POWER) {
            for (var i = 0, L = connections.length; i < L; i++) {
                if (connections[i].isPowered) {
                    isPowered = true;
                    nextState = (nextState || connections[i].state) && (!(nextState && connections[i].state) | 0);
                }
            }
            if (!isPowered) {
                this.outputTerminal.state = STATES.NO_POWER;
            } else {
                this.outputTerminal.state = nextState;
            }
        } else {
            if (!this.outputTerminal.isPowered) {
                this.outputTerminal.state = inputState;
            } else {
                this.outputTerminal.state = (this.outputTerminal.state || inputState) && (!(this.outputTerminal.state && inputState) | 0);
            }
        }
    };

    return XorGate;
});