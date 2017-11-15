define(['base', 'validator'],
function (Base, validator) {

    InputHandler.prototype = Object.create(Base.prototype);
    InputHandler.prototype.constructor = InputHandler;
    function InputHandler(engine) {
        Base.call(this, engine);
    };
    // private methods
    InputHandler.prototype.__oninit = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.__onload = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.__onunload = function () {
        validator.throwMethodMustBeOverridden();
    };
    // public methods
    InputHandler.prototype.keydown = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.keyup = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.enter = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.escape = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.mousemove = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.mousedown = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.mouseup = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.click = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.dispose = function () {
        validator.throwMethodMustBeOverridden();
    };

    return InputHandler;
});