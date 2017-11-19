define(['logic-element', 'circuits-constants', 'utils'],
function (LogicElement, constants, utils) {

    PowerSource.prototype = Object.create(LogicElement.prototype);
    PowerSource.prototype.constructor = PowerSource;
    function PowerSource() {
        LogicElement.call(this);
        // initialize high
        this.__state = constants.STATES.HIGH;
    };
    // public methods
    PowerSource.prototype.attachInput = function (inputTerminal) {
        utils.validator.throw(this, 'attachInput', 'This method is not permitted');
    };
    PowerSource.prototype.updateState = function (inputState) {
        utils.validator.throw(this, 'updateState', 'This method is not permitted');
    };
    PowerSource.prototype.getState = function (state) {
        return this.__state;
    };
    PowerSource.prototype.setState = function (state) {
        utils.validator.throw(this, 'setState', 'This method is not permitted');
    };
    
    return PowerSource;
});