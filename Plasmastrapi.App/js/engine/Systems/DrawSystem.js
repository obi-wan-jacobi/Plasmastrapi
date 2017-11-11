define(['system'],
function (System) {

    // CLASS DrawSystem
    DrawSystem.prototype = Object.create(System.prototype);
    DrawSystem.prototype.constructor = DrawSystem;
    function DrawSystem(engine) {
        System.call(this);
        this.__viewportController = engine.getController('viewport-controller');
        this.__container = engine.getFactory('component-factory').getDrawableComponentContainer();
    };
    DrawSystem.prototype.loopOnce = function () {
        if (!this.__isLoaded) {
            return;
        }
        var viewport = this.__viewportController.getViewport();
	    var ctx = viewport.getContext("2d");
	    ctx.width = viewport.width = viewport.clientWidth;
	    ctx.height = viewport.height = viewport.clientHeight;
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        this.__container.forEach(function (component) {
            component.draw(ctx);
        }, this);
    };

	return DrawSystem;
});