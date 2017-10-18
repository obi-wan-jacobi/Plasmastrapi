define(['base', 'pose-component', 'position', 'validator'],
function (Base, PoseComponent, Position, validator) {

    InputHandler.prototype = Object.create(Base.prototype);
    InputHandler.prototype.constructor = InputHandler.constructor;
    function InputHandler() {
        Base.call(this);
        // drag bounds before action on drag
        this.__beforeActionBoundary = null;
        // selection bounds before selection box on drag
        this.__beforeSelectionBoundary = null;
        this.__selectionBox = null;
        this.__selectionAnchor = null;
        // mouse tracking
        this.__isMouseDown = false;
        this.__mousePosition = new Position();
        this.__previousMousePosition = new Position();
    };
    // private methods
    InputHandler.prototype.__onload = function () {

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
    InputHandler.prototype.onmousemove = function (cursor) {
        this.__updateMousePosition(cursor);
        if (this.__isMouseDown) {
            if (!this.__beforeActionBoundary.contains(cursor)) {
                this.__actionOnDrag();
                if (!this.isLoaded) {
                    return;
                }
            }
            if (!this.__selectionBox && !this.__beforeSelectionBoundary.contains(cursor)) {
                this.__selectionBox = new SelectionBox();
                this.__selectionBox.startAt(this.__selectionAnchor);
            }
            if (this.__selectionBox) {
                this.__selectionBox.stretchTo(cursor);
            }
        }
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

PickingTool.prototype.onmousedown = function (cursor) {
    InputHandler.prototype.onmousedown.call(this, cursor);
    this.__beforeActionBoundary = new Rectangle(
        config.PickingTool.beforeDragBounds.width,
        config.PickingTool.beforeDragBounds.height
    );
    for (var i = 0, L = this.__beforeActionBoundary.vertices.length; i < L; i++) {
        this.__beforeActionBoundary.vertices[i].x += cursor.x;
        this.__beforeActionBoundary.vertices[i].y += cursor.y;
    }
    this.__beforeSelectionBoundary = new Rectangle(
        config.PickingTool.beforeSelectionBounds.width,
        config.PickingTool.beforeSelectionBounds.height
    );
    this.__selectionAnchor = new Position(cursor.x, cursor.y);
    for (var i = 0, L = this.__beforeSelectionBoundary.vertices.length; i < L; i++) {
        this.__beforeSelectionBoundary.vertices[i].x += cursor.x;
        this.__beforeSelectionBoundary.vertices[i].y += cursor.y;
    }
};
PickingTool.prototype.onmousedown = function (entities) {
    var entity = null;
    for (var i = 0, L = entities.length; i < L; i++) {
        if (Draggable.resolve(entities[i])) {
            this.__pickableOnDrag = entities[i].getComponent(PickComponent);
            entity = entities[i];
            break;
        }
    }
    if (this.__pickableSelectionBox && this.__pickableSelectionBox !== entity) {
        this.__pickableSelectionBox.destroy();
        this.__pickableSelectionBox = null;
    }
};
PickingTool.prototype.onmouseup = function (entities) {
    if (this.__selectionBox) {
        this.__selectionBox.fillContents();
        if (this.__selectionBox.contents.length == 0) {
            this.__selectionBox.destroy();
        } else {
            this.__pickableSelectionBox = this.__selectionBox;
        }
        this.__selectionBox = null;
        this.setFilter(
            new Filter(DesignZone, Pickable)
        );
        return;
    }
    for (var i = 0, L = entities.length; i < L; i++) {
        var entity = entities[i];
        if (Pickable.resolve(entity) && !(entity === this.__selectionBox)) {
            var pickComponent = entity.getComponent(PickComponent);
            pickComponent.pick();
            return;
        }
    }
    return;
};