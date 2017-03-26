define(["../Base/Gate"], function (Gate) {

    // CLASS NandGate
    NandGate.prototype = Object.create(Gate.prototype);
    NandGate.prototype.constructor = NandGate;
    function NandGate(x, y) {
        Gate.call(this, x, y);
    };
    NandGate.prototype.updateState = function (inputState) {
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
                this.outputTerminal.state = !nextState | 0;
            }
        } else {
            if (!this.outputTerminal.isPowered) {
                this.outputTerminal.state = !inputState | 0;
            } else if (this.outputTerminal.isLow && inputState === states.LOW) {
                this.outputTerminal.state = states.HIGH;
            }
        }
    };

    return NandGate;
});