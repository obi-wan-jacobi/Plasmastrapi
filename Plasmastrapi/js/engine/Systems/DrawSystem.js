define(['system', 'core-constants'],
function (System, CORE) {

	// CLASS DrawSystem
	DrawSystem.prototype = Object.create(System.prototype);
	DrawSystem.prototype.constructor = DrawSystem;
	function DrawSystem(engine) {
        System.call(this);
        this.__canvas = engine.getViewport();
	};
	DrawSystem.prototype.loopOnce = function() {
		var ctx = this.__canvas.getContext("2d");
		ctx.width = this.__canvas.width = this.__canvas.clientWidth;
		ctx.height = this.__canvas.height = this.__canvas.clientHeight;
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        this.__container.forEach(function (component) {
            component.getHandle().draw(ctx);
        }, this);
	};

	return DrawSystem;
});