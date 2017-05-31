define(['system', 'event-queue', 'position'],
function (System, EventQueue, Position) {

	// CLASS InputSystem
	InputSystem.prototype = Object.create(System.prototype);
	InputSystem.prototype.constructor = InputSystem;
	function InputSystem() {
		System.call(this);
		this.__inputQueue = new EventQueue(this);
	    // events
		this.registerEvents(
            'onmousemove',
            'onmousedown',
            'onmouseup',
            'onclick',
            'onkeydown',
            'onkeyup'
        );
	};
	InputSystem.prototype.__onload = function() {
		this.__engine.canvas.onmousemove = this.__domousemove.bind(this);
		this.__engine.canvas.onmousedown = this.__domousedown.bind(this);
		this.__engine.canvas.onmouseup = this.__domouseup.bind(this);
		this.__engine.canvas.onclick = this.__doclick.bind(this);
		this.__engine.canvas.onkeydown = this.__dokeydown.bind(this);
	    this.__engine.canvas.onkeyup = this.__dokeyup.bind(this);
	};
	InputSystem.prototype.__onunload = function() {
		this.__engine.canvas.onmousemove = null;
		this.__engine.canvas.onmousedown = null;
		this.__engine.canvas.onmouseup = null;
		this.__engine.canvas.onclick = null;
		this.__engine.canvas.onkeydown = null;
		this.__engine.canvas.onkeyup = null;
	};
	InputSystem.prototype.__onframe = function() {
		this.__inputQueue.process();
	};
	InputSystem.prototype.__domousemove = function(e) {
		var mouseX, mouseY;
		if (e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else if (e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}
		this.__inputQueue.push('onmousemove', new Position(mouseX, mouseY));
	};
	InputSystem.prototype.__domousedown = function(e) {
		var mouseX, mouseY;
		if (e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else if (e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}
		this.__inputQueue.push('onmousedown', new Position(mouseX, mouseY));
	};
	InputSystem.prototype.__domouseup = function(e) {
		var mouseX, mouseY;
		if (e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else if (e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}
		this.__inputQueue.push('onmouseup', new Position(mouseX, mouseY));
	};
	InputSystem.prototype.__doclick = function(e) {
		var mouseX, mouseY;
		if (e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else if (e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}
		this.__inputQueue.push('onclick', new Position(mouseX, mouseY));
	};
	InputSystem.prototype.__dokeydown = function (e) {
	    this.__inputQueue.push('onkeydown', e.keyCode);
	};
	InputSystem.prototype.__dokeyup = function(e) {
		this.__inputQueue.push('onkeyup', e.keyCode);
	};

	return InputSystem;
});

