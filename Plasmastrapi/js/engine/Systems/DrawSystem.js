define(['system', 'component-factory', 'core-constants'],
function (System, ComponentFactory, CORE) {

	// CLASS DrawSystem
	DrawSystem.prototype = Object.create(System.prototype);
	DrawSystem.prototype.constructor = DrawSystem;
	function DrawSystem(engine) {
        System.call(this);
        this.__viewport = engine.getViewport();
        this.__container = engine.getFactory(ComponentFactory).getDrawableComponentContainer();
	};
	DrawSystem.prototype.loopOnce = function () {
	    if (!this.__isLoaded) {
	        return;
	    }
		var ctx = this.__viewport.getContext("2d");
		ctx.width = this.__viewport.width = this.__viewport.clientWidth;
		ctx.height = this.__viewport.height = this.__viewport.clientHeight;
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        this.__container.forEach(function (component) {
            component.draw(ctx);
        }, this);
	};

	return DrawSystem;
});