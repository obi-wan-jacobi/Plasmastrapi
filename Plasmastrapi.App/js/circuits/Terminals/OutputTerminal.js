define(['terminal', 'circuits-constants'],
function (Terminal, constants) {

    OutputTerminal.prototype = Object.create(Terminal.prototype);
    OutputTerminal.prototype.constructor = OutputTerminal;
    function OutputTerminal() {
        // inherits from
        Terminal.call(this);
    };
    // private methods
    OutputTerminal.prototype.addParent = function (parent) {
        Terminal.prototype.addParent.call(this, parent);
        // initialize pass-through event handling
        this.__parent.addEventListener('onstatechange', this, this.__$onstatechange);
    };
    // public prototypal variables
    Object.defineProperties(OutputTerminal.prototype, {
        'isPowered': {
            get: function () {
                return this.getState() > constants.STATES.NO_POWER;
            }
        },
        'isHigh': {
            get: function () {
                return this.getState() === constants.STATES.HIGH;
            }
        },
        'isLow': {
            get: function () {
                return this.getState() === constants.STATES.LOW;
            }
        }
    });
    // public methods
    OutputTerminal.prototype.getState = function () {
        return this.__parent.getState();
    };

    return OutputTerminal;
});