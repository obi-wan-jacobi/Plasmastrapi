define(['base', 'helper-factory', 'hit-box', 'position', 'validator'],
function (Base, HelperFactory, HitBox, Position, validator) {

    InputHandler.prototype = Object.create(Base.prototype);
    InputHandler.prototype.constructor = InputHandler;
    function InputHandler(engine) {
        Base.call(this);
        this.__helperFactory = engine.getFactory(HelperFactory);
        // drag bounds before action on drag
        this.__beforeActionBoundary = null;
        // selection bounds before selection box on drag
        this.__beforeSelectionBoundary = null;
        this.__selectionBox = null;
    };
    // private methods
    InputHandler.prototype.__oninit = function () { };
    InputHandler.prototype.__onload = function () {
        this.__beforeActionBoundary = new HitBox();
        this.__beforeSelectionBoundary = new HitBox();
    };
    InputHandler.prototype.__onunload = function () {

    };
    InputHandler.prototype.__actionOnDrag = function () {
        validator.throwMethodMustBeOverridden(this, 'actionOnDrag');
    };
    InputHandler.prototype.__actionOnMouseUp = function () {
        validator.throwMethodMustBeOverridden(this, 'actionOnMouseUp');
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
    InputHandler.prototype.onmousemove = function (mouseHandle) {
        if (mouseHandle.isMouseDown) {
            if (!this.__beforeActionBoundary.contains(mouseHandle.getData())) {
                this.__actionOnDrag();
                if (!this.isLoaded) {
                    return;
                }
            }
            if (!this.__selectionBox && !this.__beforeSelectionBoundary.contains(mouseHandle.getData())) {
                this.__selectionBox = this.__helperFactory.createSelectionBox();
                this.__selectionBox.startAt(mouseHandle.getData());
            }
            if (this.__selectionBox) {
                this.__selectionBox.stretchTo(mouseHandle.getData());
            }
        }
    };
    InputHandler.prototype.onmousedown = function (mouseHandle) {
        this.__beforeActionBoundary.moveTo(mouseHandle.getData());
        this.__beforeSelectionBoundary.moveTo(mouseHandle.getData());
    };
    InputHandler.prototype.onmouseup = function () {
        this.__actionOnMouseUp();
    };
    InputHandler.prototype.onclick = function () {

    };

    return InputHandler;
});