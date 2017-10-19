define(['base', 'helper-factory', 'hit-box', 'position', 'validator'],
function (Base, HelperFactory, HitBox, Position, validator) {

    InputHandler.prototype = Object.create(Base.prototype);
    InputHandler.prototype.constructor = InputHandler;
    function InputHandler() {
        Base.call(this);
        // drag bounds before action on drag
        this.__beforeActionBoundary = null;
        // selection bounds before selection box on drag
        this.__beforeSelectionBoundary = null;
        this.__selectionBox = null;
        this.__selectionBoxAnchor = null;
        // mouse tracking
        this.__isMouseDown = false;
        this.__mousePosition = new Position();
        this.__previousMousePosition = new Position();
    };
    // private methods
    InputHandler.prototype.__oninit = function () { };
    InputHandler.prototype.__onload = function () {
        this.__beforeActionBoundary = new HitBox();
        this.__beforeSelectionBoundary = new HitBox();
    };
    InputHandler.prototype.__onunload = function () {
        this.__isMouseDown = false;
        this.__mousePosition = new Position();
        this.__previousMousePosition = new Position();
    };
    InputHandler.prototype.__updateMousePosition = function (position) {
        validator.validateInstanceType(this, position, Position);
        this.__previousMousePosition.x = this.__mousePosition.x;
        this.__previousMousePosition.y = this.__mousePosition.y;
        this.__mousePosition.x = position.x;
        this.__mousePosition.y = position.y;
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
        this.__updateMousePosition(mouseHandle.getData());
        if (this.__isMouseDown) {
            if (!this.__beforeActionBoundary.contains(mouseHandle.getData())) {
                this.__actionOnDrag();
                if (!this.isLoaded) {
                    return;
                }
            }
            if (!this.__selectionBox && !this.__beforeSelectionBoundary.contains(mouseHandle.getData())) {
                this.__selectionBox = HelperFactory.createSelectionBox();
                this.__selectionBox.startAt(this.__selectionBoxAnchor);
            }
            if (this.__selectionBox) {
                this.__selectionBox.stretchTo(mouseHandle.getData());
            }
        }
    };
    InputHandler.prototype.onmousedown = function (mouseHandle) {
        this.__isMouseDown = true;
        this.__selectionBoxAnchor = new Position(mouseHandle.getData().x, mouseHandle.getData().y);
        this.__beforeActionBoundary.moveTo(mouseHandle.getData());
        this.__beforeSelectionBoundary.moveTo(mouseHandle.getData());
    };
    InputHandler.prototype.onmouseup = function () {
        this.__isMouseDown = false;
        this.__actionOnMouseUp();
    };
    InputHandler.prototype.onclick = function () {

    };

    return InputHandler;
});