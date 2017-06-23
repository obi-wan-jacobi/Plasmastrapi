define(['terminal', 'circuit-constants'],
function (Terminal, CIRCUITS) {

    // CLASS OutputTerminal
    OutputTerminal.prototype = Object.create(Terminal.prototype);
    OutputTerminal.prototype.constructor = OutputTerminal;
    function OutputTerminal(circuitElement) {

        Terminal.call(this, circuitElement);



        // state
        this.__state = CIRCUITS.STATES.NOPOWER;

        // events
        this.__registerEvents(
            'onstatechange'
        );
    };
    // public prototypal variables
    Object.defineProperties(OutputTerminal.prototype, {
        'isPowered': {
            get: function () {
                return this.__state > CIRCUITS.STATES.NOPOWER;
            }
        },
        'isHigh': {
            get: function () {
                return this.__state === CIRCUITS.STATES.HIGH;
            }
        },
        'isLow': {
            get: function () {
                return this.__state === CIRCUITS.STATES.LOW;
            }
        }
    });
    // public methods
    OutputTerminal.prototype.getState = function (state) {
        return this.__state;
    };
    OutputTerminal.prototype.setState = function () {
        if (!(state >= -1 && state <= 1)) {
            validator.throw(this, 'setState', 'State ' + state + ' is not valid');
        }
        this.__state = state;
        this.emit('onstatechange', this.__state);
    };

    return OutputTerminal;
});