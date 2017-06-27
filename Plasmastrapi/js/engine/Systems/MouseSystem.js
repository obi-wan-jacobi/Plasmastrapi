define(['system', 'linked-list', 'position'],
function (System, LinkedList, Position) {

	// CLASS MouseSystem
	MouseSystem.prototype = Object.create(System.prototype);
	MouseSystem.prototype.constructor = MouseSystem;
	function MouseSystem(canvas) {
        System.call(this);
        this.__canvas = canvas;
        this.__inputBuffer = {
            'mousemove': new LinkedList(Position),
            'mousedown': new LinkedList(Position),
            'mouseup': new LinkedList(Position),
            'click': new LinkedList(Position)
        };
    };
    // private methods
	MouseSystem.prototype.__onload = function() {
		this.__canvas.onmousemove = this.__onmousemove.bind(this);
		this.__canvas.onmousedown = this.__onmousedown.bind(this);
		this.__canvas.onmouseup = this.__onmouseup.bind(this);
		this.__canvas.onclick = this.__onclick.bind(this);
	};
	MouseSystem.prototype.__onunload = function() {
		this.__canvas.onmousemove = null;
		this.__canvas.onmousedown = null;
		this.__canvas.onmouseup = null;
		this.__canvas.onclick = null;
    };
    MouseSystem.prototype.__onmousemove = function (e) {
        this.__inputBuffer['mousemove'].push(this.__getMousePosition(e));
    };
    MouseSystem.prototype.__onmousedown = function (e) {
        this.__inputBuffer['mousedown'].push(this.__getMousePosition(e));
    };
    MouseSystem.prototype.__onmouseup = function (e) {
        this.__inputBuffer['mouseup'].push(this.__getMousePosition(e));
    };
    MouseSystem.prototype.__onclick = function (e) {
        this.__inputBuffer['click'].push(this.__getMousePosition(e));
    };
    MouseSystem.prototype.__getMousePosition = function (e) {
        var mouseX, mouseY;
        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        } else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
        return new Position(mouseX, mouseY);
    };
    // public methods
	MouseSystem.prototype.loopOnce = function() {
        this.__inputBuffer['mousemove'].forEach(function (position) {
            this.__container.forEach(function (component) {
                component.getHandle().mousemove(position);
            }, this);
        }, this);
        this.__inputBuffer['mousedown'].forEach(function (position) {
            this.__container.forEach(function (component) {
                component.getHandle().mousedown(position);
            }, this);
        }, this);
        this.__inputBuffer['mouseup'].forEach(function (position) {
            this.__container.forEach(function (component) {
                component.getHandle().mouseup(position);
            }, this);
        }, this);
        this.__inputBuffer['click'].forEach(function (position) {
            this.__container.forEach(function (component) {
                component.getHandle().click(position);
            }, this);
        }, this);
	};

	return MouseSystem;
});

