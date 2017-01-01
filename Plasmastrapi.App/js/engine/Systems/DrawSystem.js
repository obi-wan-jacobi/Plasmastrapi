define(["./System"],function(System) {

	// CLASS DrawSystem
	DrawSystem.prototype = Object.create(System.prototype);
	DrawSystem.prototype.constructor = DrawSystem;
	function DrawSystem() {
		System.call(this);
		this.addEventListener('onload', this, this.__onload);
		this.addEventListener('onunload', this, this.__onunload);
		this.addEventListener('onframe', this, this.__onframe);
	};
	DrawSystem.prototype.__onload = function() {
		window.addEventListener('onresize', this.__onresize);
	};
	DrawSystem.prototype.__onunload = function() {
		window.removeEventListener('onresize', this.__onresize);
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
	DrawSystem.prototype.__onresize = function() {
		/*
		var ctx = this.__engine.canvas.getContext("2d");
		ctx.width = this.__engine.canvas.width = this.__engine.canvas.clientWidth;
		ctx.height = this.__engine.canvas.height = this.__engine.canvas.clientHeight;
		this.__fire();
		*/
	};

	// events
    DrawSystem.prototype.__registerEvents(
        'ondrawgamebackground',
		'ondrawgameforeground',
		'ondrawgameentities',
		'ondrawuibackground',
		'ondrawuiforeground',
		'ondrawuientities'
    );

	// display layers
	DrawSystem.prototype.DISPLAYLAYERS = {
		GAMEBACKGROUND: 'ondrawgamebackground',
		GAMEFOREGROUND: 'ondrawgameforeground',
		GAMEENTITIES: 'ondrawgameentities',
		UIBACKGROUND: 'ondrawuibackground',
		UIFOREGROUND: 'ondrawuiforeground',
		UIENTITIES: 'ondrawuientities'
	};

	return DrawSystem;
	
});