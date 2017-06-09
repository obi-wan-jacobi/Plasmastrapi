define(['gate'],
function (Gate) {

    // CLASS OrGate
    OrGate.prototype = Object.create(Gate.prototype);
    OrGate.prototype.constructor = OrGate;
    function OrGate(inputTerminal, outputTerminal) {
        Gate.call(this, inputTerminal, outputTerminal);
    };
    OrGate.prototype.updateState = function (inputState) {
        var connections = this.inputTerminal.__connections;
        var states = this.outputTerminal.states;
        var nextState = states.LOW;
        var isPowered = false;
        // if this update was initiated by connection removal
        if (inputState === states.NOPOWER) {
            for (var i = 0, L = connections.length; i < L; i++) {
                if (connections[i].isPowered) {
                    isPowered = true;
                    nextState = nextState || connections[i].state;
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
                this.outputTerminal.state = this.outputTerminal.state || inputState;
            }
        }
    };

    return OrGate;
});