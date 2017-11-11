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
    InputHandler.prototype.onkeydown = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.onkeyup = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.onkeypress = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.onenter = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.onescape = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.onmousemove = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.onmousedown = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.onmouseup = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.onclick = function () {
        validator.throwMethodMustBeOverridden();
    };
    InputHandler.prototype.dispose = function () {
        validator.throwMethodMustBeOverridden();
    };

    return InputHandler;
});