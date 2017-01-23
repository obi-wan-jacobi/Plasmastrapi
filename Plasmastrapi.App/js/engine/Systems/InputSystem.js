define(["../Objects/System", "../Objects/EventQueue", "../Data/Geometry"], function(System, EventQueue, Geometry) {

	// CLASS InputSystem
	InputSystem.prototype = Object.create(System.prototype);
	InputSystem.prototype.constructor = InputSystem;
	function InputSystem() {
		System.call(this);
		this.__inputQueue = new EventQueue(this);
	    // events
		this.__registerEvents(
            'onmousemove',
            'onmousedown',
            'onmouseup',
            'onclick',
            'onkeydown',
            'onkeyup'
        );
	};
	InputSystem.prototype.__onload = function() {
		this.__engine.canvas.onmousemove = this.__$onmousemove.bind(this);
		this.__engine.canvas.onmousedown = this.__$onmousedown.bind(this);
		this.__engine.canvas.onmouseup = this.__$onmouseup.bind(this);
		this.__engine.canvas.onclick = this.__$onclick.bind(this);
		window.onkeydown = this.__$onkeydown.bind(this);
		window.onkeyup = this.__$onkeyup.bind(this);
	};
	InputSystem.prototype.__onunload = function() {
		this.__engine.canvas.onmousemove = null;
		this.__engine.canvas.onmousedown = null;
		this.__engine.canvas.onmouseup = null;
		this.__engine.canvas.onclick = null;
		window.onkeydown = null;
		window.onkeyup = null;
	};
	InputSystem.prototype.__onframe = function() {
		this.__inputQueue.process();
	};
	InputSystem.prototype.__onmousemove = function(e) {
		var mouseX, mouseY;
		if (e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else if (e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}
		this.__inputQueue.push('onmousemove', new Geometry.Position(mouseX, mouseY));
	};
	InputSystem.prototype.__onmousedown = function(e) {
		var mouseX, mouseY;
		if (e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else if (e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}
		this.__inputQueue.push('onmousedown', new Geometry.Position(mouseX, mouseY));
	};
	InputSystem.prototype.__onmouseup = function(e) {
		var mouseX, mouseY;
		if (e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else if (e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}
		this.__inputQueue.push('onmouseup', new Geometry.Position(mouseX, mouseY));
	};
	InputSystem.prototype.__onclick = function(e) {
		var mouseX, mouseY;
		if (e.offsetX) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		} else if (e.layerX) {
			mouseX = e.layerX;
			mouseY = e.layerY;
		}
		this.__inputQueue.push('onclick', new Geometry.Position(mouseX, mouseY));
	};
	InputSystem.prototype.__onkeydown = function(e) {
		this.__inputQueue.push('onkeydown', e.keyCode);
	};
	InputSystem.prototype.__onkeyup = function(e) {
		this.__inputQueue.push('onkeyup', e.keyCode);
	};

	return InputSystem;
});

