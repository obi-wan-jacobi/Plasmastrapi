define(['component'],
function (Component) {

    // CLASS InputComponent
	InputComponent.prototype = Object.create(Component.prototype);
	InputComponent.prototype.constructor = InputComponent;
	function InputComponent(inputHandle) {
	    // inherits from
        Component.call(this, inputHandle); // TODO:
        // private variables
        this.__isHovered = false;
        // events
        this.__registerEvents(
            'onmousemove',
            'onmouseenter',
            'onmousehover',
            'onmouseleave',
            'onmousedown',
            'onmouseup',
            'onclick'
        );
    };
    // private methods
    InputComponent.prototype.__isCursorWithinMeshBoundary = function (cursor) {
        var meshComponent = this.__entity.getComponent(MeshComponent);
        return meshComponent.getHandle().checkPointCollision(cursor);
    };
    InputComponent.prototype.__ondisable = function () {
        this.unhover();
    };
    // public prototypal variables
    Object.defineProperties(PickComponent.prototype, {
        'isHovered': {
            get: function () {
                return this.__isHovered;
            }
        }
    });
    // public methods
    InputComponent.prototype.mousemove = function (cursor) {
        if (this.__isCursorWithinMeshBoundary(cursor)) {
            this.hover();
        } else {
            this.unhover();
        }
    };
    InputComponent.prototype.hover = function () {
        if (!this.__isHovered) {
            this.__isHovered = true;
            this.emit('onmouseenter');
        }
        this.emit('onmousehover');
    };
    InputComponent.prototype.unhover = function () {
        if (this.__isHovered) {
            this.__isHovered = false;
            this.emit('onmouseleave');
        }
    };
    InputComponent.prototype.mousedown = function (cursor) {
        if (this.__isCursorWithinMeshBoundary(cursor)) {
            this.emit('onmousedown', this.__entity);
        }
    };
    InputComponent.prototype.mouseup = function (cursor) {
        if (this.__isCursorWithinMeshBoundary(cursor)) {
            this.emit('onmouseup', this.__entity);
        }
    };
    InputComponent.prototype.click = function (cursor) {
        if (this.__isCursorWithinMeshBoundary(cursor)) {
            this.emit('onclick', this.__entity);
        }
    };

    return InputComponent;
});