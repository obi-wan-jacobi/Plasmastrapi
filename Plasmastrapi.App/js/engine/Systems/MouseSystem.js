define(['system', 'linked-list', 'position'],
function (System, LinkedList, Position) {

	// CLASS MouseSystem
	MouseSystem.prototype = Object.create(System.prototype);
	MouseSystem.prototype.constructor = MouseSystem;
	function MouseSystem(engine) {
        System.call(this, engine);
        this.__viewport = null;
        this.__container = null;
        this.__inputBuffer = {
            'mousemove': new LinkedList('position'),
            'mousedown': new LinkedList('position'),
            'mouseup': new LinkedList('position'),
            'click': new LinkedList('position')
        };
    };
    // private methods
	MouseSystem.prototype.__oninit = function () {
	    System.prototype.__oninit.call(this);
	    this.__viewport = this.__engine.getController('viewport-controller').getViewport();
	    this.__container = this.__engine.getFactory('component-factory').getContainer('mouse-component');
	};
	MouseSystem.prototype.__onload = function () {
	    System.prototype.__onload.call(this);
        this.__viewport.onmousemove = this.__buildInputEventCallback('mousemove');
        this.__viewport.onmousedown = this.__buildInputEventCallback('mousedown');
        this.__viewport.onmouseup = this.__buildInputEventCallback('mouseup');
        this.__viewport.onclick = this.__buildInputEventCallback('click');
	};
	MouseSystem.prototype.__onunload = function () {
	    System.prototype.__onunload.call(this);
		this.__viewport.onmousemove = null;
		this.__viewport.onmousedown = null;
		this.__viewport.onmouseup = null;
		this.__viewport.onclick = null;
    };
    MouseSystem.prototype.__buildInputEventCallback = function (inputBufferKey) {
        return (function (e) {
            this.__inputBuffer[inputBufferKey].push(this.__getMousePosition(e));
        }).bind(this);
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
    MouseSystem.prototype.loopOnce = function () {
        if (!this.__isLoaded) {
            return;
        }
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
        this.__inputBuffer = {
            'mousemove': new LinkedList('position'),
            'mousedown': new LinkedList('position'),
            'mouseup': new LinkedList('position'),
            'click': new LinkedList('position')
        };
	};

	return MouseSystem;
});

