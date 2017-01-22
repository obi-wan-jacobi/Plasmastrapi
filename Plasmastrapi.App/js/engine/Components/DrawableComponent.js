define(["../Objects/Component"], function (Component) {

	// CLASS DrawableComponent
	DrawableComponent.prototype = Object.create(Component.prototype);
	DrawableComponent.prototype.constructor = DrawableComponent;
    function DrawableComponent() {
		// inherits from
		Component.call(this);
		// private variables
		this.__isVisible = false;
        // events
		this.__registerEvents(
            'onshow',
            'onhide',
            'ondrawgamebackground',
            'ondrawgameforeground',
            'ondrawgameentities',
            'ondrawuibackground',
            'ondrawuiforeground',
            'ondrawuientities'
        );
	};
    // private methods
    DrawableComponent.prototype.__onload = function () {
        this.show();
    };
    DrawableComponent.prototype.__onunload = function () {
        this.hide();
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
		    // wire subscriptions to draw system
			this.__engine.drawSystem.addEventListener('ondrawgamebackground', this, this.__$ondrawgamebackground);
			this.__engine.drawSystem.addEventListener('ondrawgameforeground', this, this.__$ondrawgameforeground);
			this.__engine.drawSystem.addEventListener('ondrawgameentities', this, this.__$ondrawgameentities);
			this.__engine.drawSystem.addEventListener('ondrawuibackground', this, this.__$ondrawuibackground);
			this.__engine.drawSystem.addEventListener('ondrawuiforeground', this, this.__$ondrawuiforeground);
			this.__engine.drawSystem.addEventListener('ondrawuientities', this, this.__$ondrawuientities);
		}
	};
	DrawableComponent.prototype.hide = function () {
	    if (this.__isVisible) {
	        this.__isVisible = false;
	        this.__engine.drawSystem.removeEventListener(this.__displayLayer, this, this.__draw);
	        this.__fire('onhide');
	        // unwire subscriptions to draw system
	        this.__engine.drawSystem.removeEventListener('ondrawgamebackground', this, this.__$ondrawgamebackground);
	        this.__engine.drawSystem.removeEventListener('ondrawgameforeground', this, this.__$ondrawgameforeground);
	        this.__engine.drawSystem.removeEventListener('ondrawgameentities', this, this.__$ondrawgameentities);
	        this.__engine.drawSystem.removeEventListener('ondrawuibackground', this, this.__$ondrawuibackground);
	        this.__engine.drawSystem.removeEventListener('ondrawuiforeground', this, this.__$ondrawuiforeground);
	        this.__engine.drawSystem.removeEventListener('ondrawuientities', this, this.__$ondrawuientities);
	    }
	};

	return DrawableComponent;
});