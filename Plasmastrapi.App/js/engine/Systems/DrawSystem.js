define(['system'],
function (System) {

    // CLASS DrawSystem
    DrawSystem.prototype = Object.create(System.prototype);
    DrawSystem.prototype.constructor = DrawSystem;
    function DrawSystem(engine) {
        System.call(this, engine);
        this.__viewportController = null;
        this.__container = null;
    };
    // private methods
    DrawSystem.prototype.__oninit = function () {
        System.prototype.__oninit.call(this);
        this.__viewportController = this.__engine.getController('viewport-controller');
        this.__container = this.__engine.getFactory('component-factory').getDrawableComponentContainer();
    };
    // public methods
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