define(['gate', 'circuit-constants'],
function (Gate, CIRCUITCONSTANTS) {

    // CLASS OrGate
    XorGate.prototype = Object.create(Gate.prototype);
    XorGate.prototype.constructor = XorGate;
    function XorGate() {
        Gate.call(this);
    };
    XorGate.prototype.updateState = function (inputState) {
        var STATES = CIRCUITCONSTANTS.STATES;
        var connections = this.__getInputConnections();
        var nextState = STATES.LOW;
        var isPowered = false;
        // if this update was initiated by connection removal
        if (inputState === STATES.NOPOWER) {
            for (var i = 0, L = connections.length; i < L; i++) {
                if (connections[i].isPowered) {
                    isPowered = true;
                    nextState = (nextState || connections[i].state) && (!(nextState && connections[i].state) | 0);
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
                this.outputTerminal.state = (this.outputTerminal.state || inputState) && (!(this.outputTerminal.state && inputState) | 0);
            }
        }
    };

    return XorGate;
});