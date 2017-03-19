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
        var nextState = true;
        var isPowered = false;
        // if this update was initiated by connection removal
        if (inputState === null) {
            for (var i = 0, L = connections.length; i < L; i++) {
                if (connections[i].state.isPowered) {
                    isPowered = true;
                    nextState = nextState && connections[i].state;
                }
            }
            if (!isPowered) {
                this.outputTerminal.state = states.NOPOWER;
                return;
            }
            this.outputTerminal.state = nextState;
            return;
        } else {
            if (!this.outputTerminal.isPowered) {
                this.outputTerminal.state = inputState;
                return;
            } else if (inputState > states.NOPOWER) {
                this.outputTerminal.state = this.outputTerminal.state && inputState;
                return;
            }
        }
    };
    
    return AndGate;
});
