define(['base', 'pose-component', 'position', 'validator'],
function (Base, PoseComponent, Position, validator) {

    InputHandler.prototype = Object.create(Base.prototype);
    InputHandler.prototype.constructor = InputHandler.constructor;
    function InputHandler() {
        Base.call(this);
    };
    // private methods
    InputHandler.prototype.__onload = function () {
        validator.throwMethodMustBeOverridden(this, 'onload');
    };
    InputHandler.prototype.__onunload = function () {
        validator.throwMethodMustBeOverridden(this, 'onunload');
    };
    // public methods
    InputHandler.prototype.onkeydown = function () {
        validator.throwMethodMustBeOverridden(this, 'onkeydown');
    };
    InputHandler.prototype.onkeyup = function () {
        validator.throwMethodMustBeOverridden(this, 'onkeyup');
    };
    InputHandler.prototype.onkeypress = function () {
        validator.throwMethodMustBeOverridden(this, 'onkeypress');
    };
    InputHandler.prototype.onenter = function () {
        validator.throwMethodMustBeOverridden(this, 'onenter');
    };
    InputHandler.prototype.onescape = function () {
        validator.throwMethodMustBeOverridden(this, 'onescape');
    };
    InputHandler.prototype.onmousemove = function () {
        validator.throwMethodMustBeOverridden(this, 'onmousemove');
    };
    InputHandler.prototype.onmousedown = function () {
        validator.throwMethodMustBeOverridden(this, 'onmousedown');
    };
    InputHandler.prototype.onmouseup = function () {
        validator.throwMethodMustBeOverridden(this, 'onmouseup');
    };
    InputHandler.prototype.onclick = function () {
        validator.throwMethodMustBeOverridden(this, 'onclick');
    };

    return InputHandler;
});