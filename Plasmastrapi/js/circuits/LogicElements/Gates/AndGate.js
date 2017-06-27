define(['gate', 'circuit-constants'],
function (Gate, CIRCUITS) {

    // CLASS AndGate
    AndGate.prototype = Object.create(Gate.prototype);
    AndGate.prototype.constructor = AndGate;
    function AndGate() {
        Gate.call(this);
    };
    AndGate.prototype.updateState = function (inputState) {
        var STATES = CIRCUITS.STATES;
        var connections = this.__inputs;
        var nextState = STATES.HIGH;
        var isPowered = false;

        if (this.__state > STATES.NOPOWER) {

        } else {
            this.__state = inputState;
        }

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
