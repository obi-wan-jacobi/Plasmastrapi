define(['terminal', 'circuit-constants'],
function (Terminal, CIRCUITCONSTANTS) {

    // CLASS OutputTerminal
    OutputTerminal.prototype = Object.create(Terminal.prototype);
    OutputTerminal.prototype.constructor = OutputTerminal;
    function OutputTerminal(circuitElement) {

        Terminal.call(this, circuitElement);



        // state
        this.__state = CIRCUITCONSTANTS.STATES.NOPOWER;

        // events
        this.__registerEvents(
            'onstatechange'
        );
    };
    // public prototypal variables
    Object.defineProperties(OutputTerminal.prototype, {
        'isPowered': {
            get: function () {
                return this.__state > CIRCUITCONSTANTS.STATES.NOPOWER;
            }
        },
        'isHigh': {
            get: function () {
                return this.__state === CIRCUITCONSTANTS.STATES.HIGH;
            }
        },
        'isLow': {
            get: function () {
                return this.__state === CIRCUITCONSTANTS.STATES.LOW;
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
        this.__fire('onstatechange', this.__state);
    };

    return OutputTerminal;
});