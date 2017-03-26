define(["../Base/Gate"], function (Gate) {

    // CLASS AndGate
    AndGate.prototype = Object.create(Gate.prototype);
    AndGate.prototype.constructor = AndGate;
    function AndGate(x, y) {
        Gate.call(this, x, y);
    };
    AndGate.prototype.updateState = function (inputState) {
        var connections = this.inputTerminal.__connections;
        var states = this.outputTerminal.states;
        var nextState = states.HIGH;
        var isPowered = false;
        // if this update was initiated by connection removal
        if (inputState === states.NOPOWER) {
            for (var i = 0, L = connections.length; i < L; i++) {
                if (connections[i].isPowered) {
                    isPowered = true;
                    nextState = nextState && connections[i].state;
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
                this.outputTerminal.state = this.outputTerminal.state && inputState;
            }
        }
    };
    
    return AndGate;
});
