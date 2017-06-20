define(['system'],
function (System) {

	// CLASS DrawSystem
	DrawSystem.prototype = Object.create(System.prototype);
	DrawSystem.prototype.constructor = DrawSystem;
	function DrawSystem(canvas) {
        System.call(this);
        this.__canvas = canvas;
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
		var ctx = this.__canvas.getContext("2d");
		ctx.width = this.__canvas.width = this.__canvas.clientWidth;
		ctx.height = this.__canvas.height = this.__canvas.clientHeight;
		ctx.clearRect(0, 0, ctx.width, ctx.height);
		this.emit('ondrawgamebackground', ctx);
		this.emit('ondrawgameentities', ctx);
		this.emit('ondrawgameforeground', ctx);
		this.emit('ondrawuibackground', ctx);
		this.emit('ondrawuientities', ctx);
		this.emit('ondrawuiforeground', ctx);
	};
	DrawSystem.prototype.__onwindowresize = function() {
		/*
		var ctx = this.__canvas.getContext("2d");
		ctx.width = this.__canvas.width = this.__canvas.clientWidth;
		ctx.height = this.__canvas.height = this.__canvas.clientHeight;
		this.emit();
		*/
	};

	return DrawSystem;
});