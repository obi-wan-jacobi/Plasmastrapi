define(["../Base/Gate"], function (Gate) {

    // CLASS OrGate
    OrGate.prototype = Object.create(Gate.prototype);
    OrGate.prototype.constructor = OrGate;
    function OrGate(x, y) {
        Gate.call(this, x, y);
    };
    OrGate.prototype.updateState = function (inputState) {
        var connections = this.inputTerminal.__connections;
        var states = this.outputTerminal.states;
        var nextState = false;
        var isPowered = false;
        // if this update was initiated by connection removal
        if (inputState === null) {
            for (var i = 0, L = connections.length; i < L; i++) {
                if (connections[i].state.isPowered) {
                    isPowered = true;
                    nextState = nextState || connections[i].state;
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
                this.outputTerminal.state = this.outputTerminal.state || inputState;
                return;
            }
        }
    };

    return OrGate;
});