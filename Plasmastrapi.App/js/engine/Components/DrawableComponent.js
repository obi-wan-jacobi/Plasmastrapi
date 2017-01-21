define(["../Objects/Component"], function (Component) {

	// CLASS DrawableComponent
	DrawableComponent.prototype = Object.create(Component.prototype);
	DrawableComponent.prototype.constructor = DrawableComponent;
    function DrawableComponent() {
		// inherits from
		Component.call(this);
		// private variables
		this.__isVisible = false;
		// configure component
		this.addEventListener('onload', this, this.show);
		this.addEventListener('onunload', this, this.hide);
	};
    // private methods
    DrawableComponent.prototype.__ondrawgamebackground = function (ctx) {
        this.__fire('ondrawgamebackground', ctx);
    };
    DrawableComponent.prototype.__ondrawgameforeground = function (ctx) {
        this.__fire('ondrawgameforeground', ctx);
    };
    DrawableComponent.prototype.__ondrawgameentities = function (ctx) {
        this.__fire('ondrawgameentities', ctx);
    };
    DrawableComponent.prototype.__ondrawuibackground = function (ctx) {
        this.__fire('ondrawuibackground', ctx);
    };
    DrawableComponent.prototype.__ondrawuiforeground = function (ctx) {
        this.__fire('ondrawuiforeground', ctx);
    };
    DrawableComponent.prototype.__ondrawuientities = function (ctx) {
        this.__fire('ondrawuientities', ctx);
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
			this.__engine.drawSystem.addEventListener('ondrawgamebackground', this, this.__ondrawgamebackground);
			this.__engine.drawSystem.addEventListener('ondrawgameforeground', this, this.__ondrawgameforeground);
			this.__engine.drawSystem.addEventListener('ondrawgameentities', this, this.__ondrawgameentities);
			this.__engine.drawSystem.addEventListener('ondrawuibackground', this, this.__ondrawuibackground);
			this.__engine.drawSystem.addEventListener('ondrawuiforeground', this, this.__ondrawuiforeground);
			this.__engine.drawSystem.addEventListener('ondrawuientities', this, this.__ondrawuientities);
		}
	};
	DrawableComponent.prototype.hide = function() {
		if (this.__isVisible) {
			this.__isVisible = false;
			this.__engine.drawSystem.removeEventListener(this.__displayLayer, this, this.__draw);
			this.__fire('onhide');
		    // unwire subscriptions to draw system
			this.__engine.drawSystem.removeEventListener('ondrawgamebackground', this, this.__ondrawgamebackground);
			this.__engine.drawSystem.removeEventListener('ondrawgameforeground', this, this.__ondrawgameforeground);
			this.__engine.drawSystem.removeEventListener('ondrawgameentities', this, this.__ondrawgameentities);
			this.__engine.drawSystem.removeEventListener('ondrawuibackground', this, this.__ondrawuibackground);
			this.__engine.drawSystem.removeEventListener('ondrawuiforeground', this, this.__ondrawuiforeground);
			this.__engine.drawSystem.removeEventListener('ondrawuientities', this, this.__ondrawuientities);
		}
	};

	// events
    DrawableComponent.prototype.__registerEvents(
        'onshow',
        'onhide',
        'ondrawgamebackground',
		'ondrawgameforeground',
		'ondrawgameentities',
		'ondrawuibackground',
		'ondrawuiforeground',
		'ondrawuientities'
    );

	return DrawableComponent;
});