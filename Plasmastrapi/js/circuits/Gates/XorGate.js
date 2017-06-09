define(['gate'],
function (Gate) {

    // CLASS OrGate
    XorGate.prototype = Object.create(Gate.prototype);
    XorGate.prototype.constructor = XorGate;
    function XorGate(inputTerminal, outputTerminal) {
        Gate.call(this, inputTerminal, outputTerminal);
    };
    XorGate.prototype.updateState = function (inputState) {
        var connections = this.inputTerminal.__connections;
        var states = this.outputTerminal.states;
        var nextState = states.LOW;
        var isPowered = false;
        // if this update was initiated by connection removal
        if (inputState === states.NOPOWER) {
            for (var i = 0, L = connections.length; i < L; i++) {
                if (connections[i].isPowered) {
                    isPowered = true;
                    nextState = (nextState || connections[i].state) && (!(nextState && connections[i].state) | 0);
                }
            }
            if (!isPowered) {
                this.outputTerminal.state = states.NOPOWER;
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