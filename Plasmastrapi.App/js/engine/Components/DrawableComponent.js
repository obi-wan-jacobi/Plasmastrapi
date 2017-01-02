define(["../Objects/Component", "./LineComponent", "./MeshComponent", "./ImageComponent", "./SpriteComponent"],
    function (Component, LineComponent, MeshComponent, ImageComponent, SpriteComponent) {

	// CLASS DrawableComponent
	DrawableComponent.prototype = Object.create(Component.prototype);
	DrawableComponent.prototype.constructor = DrawableComponent;
    function DrawableComponent(displayLayer) {
		// inherits from
		Component.call(this);
		// private variables
		this.__displayLayer = displayLayer;
		this.__isVisible = false;
		// configure component
		this.addEventListener('onload', this, this.show);
		this.addEventListener('onunload', this, this.hide);
	};
	// private methods
	DrawableComponent.prototype.__draw = function(ctx) {
		// extract components with draw methods and draw them
		var drawableComponents = [];
		drawableComponents.push(this.__entity.getComponent(LineComponent));
		drawableComponents.push(this.__entity.getComponent(MeshComponent));
		drawableComponents.push(this.__entity.getComponent(ImageComponent));
		drawableComponents.push(this.__entity.getComponent(SpriteComponent));
		if (!lineComponent && !meshComponent && !imageComponent && !spriteComponent) {
			throw new Error(this.constructor.name + ':draw - ' + this.__entity.constructor.name + ' does not contain any drawable components.');
		}
		for (var i = 0, L = drawableComponents.length; i < L; i++) {
			var component = drawableComponents[i];
			if(component) {
				component.__draw();
			}
		}
	};
	// public prototypal variables
	Object.defineProperties(DrawableComponent.prototype, {
		'isVisible': {
			get: function() {
				return this.__isVisible;
			}
		}
	});
	// public methods
	DrawableComponent.prototype.show = function() {
		if (!this.__isVisible) {
			this.__isVisible = true;
			this.__engine.drawSystem.addEventListener(this.__displayLayer, this, this.__draw);
			this.__fire('onshow');
		}
	};
	DrawableComponent.prototype.hide = function() {
		if (this.__isVisible) {
			this.__isVisible = false;
			this.__engine.drawSystem.removeEventListener(this.__displayLayer, this, this.__draw);
			this.__fire('onhide');
		}
	};

	// events
    DrawableComponent.prototype.__registerEvents(
        'onshow',
        'onhide'
    );

	return DrawableComponent;

});