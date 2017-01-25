define(["../Objects/System"],function(System) {

	// CLASS DrawSystem
	DrawSystem.prototype = Object.create(System.prototype);
	DrawSystem.prototype.constructor = DrawSystem;
	function DrawSystem() {
	    System.call(this);
	    // events
	    this.__registerEvents(
            'onwindowresize',
            'ondrawgamebackground',
            'ondrawgameforeground',
            'ondrawgameentities',
            'ondrawuibackground',
            'ondrawuiforeground',
            'ondrawuientities'
        );
	};
	DrawSystem.prototype.__onload = function() {
		window.addEventListener('onwindowresize', this.__$onwindowresize);
	};
	DrawSystem.prototype.__onunload = function() {
		window.removeEventListener('onwindowresize', this.__$onwindowresize);
	};
	DrawSystem.prototype.__onframe = function() {
		var ctx = this.__engine.canvas.getContext("2d");
		ctx.width = this.__engine.canvas.width = this.__engine.canvas.clientWidth;
		ctx.height = this.__engine.canvas.height = this.__engine.canvas.clientHeight;
		ctx.clearRect(0, 0, ctx.width, ctx.height);
		this.__fire('ondrawgamebackground', ctx);
		this.__fire('ondrawgameforeground', ctx);
		this.__fire('ondrawgameentities', ctx);
		this.__fire('ondrawuibackground', ctx);
		this.__fire('ondrawuiforeground', ctx);
		this.__fire('ondrawuientities', ctx);
	};
	DrawSystem.prototype.__onwindowresize = function() {
		/*
		var ctx = this.__engine.canvas.getContext("2d");
		ctx.width = this.__engine.canvas.width = this.__engine.canvas.clientWidth;
		ctx.height = this.__engine.canvas.height = this.__engine.canvas.clientHeight;
		this.__fire();
		*/
	};

	return DrawSystem;
});