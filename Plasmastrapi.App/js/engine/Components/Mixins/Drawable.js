define(function () {

    function Drawable(displayLayer) {
        var target = this;
        if (!target.registerEvents) {
            throw new Error(target.constructor.name + ':' + Drawable.constructor.name + ' - Target must be an instance of EventEmitter');
        }
        if (!target.draw) {
            throw new Error(target.constructor.name + ':' + Drawable.constructor.name + ' - Target must implement a draw method');
        }
        if (!displayLayer) {
            throw new Error(target.constructor.name + ':' + Drawable.constructor.name + ' - A display layer must be specified');
        }
        target.__displayLayer = displayLayer;
        target.__isVisible = false;
        Object.defineProperties(target, {
            'isDrawable': {
                get: function () {
                    return true;
                }
            },
            'isVisible': {
                get: function () {
                    return this.__isVisible;
                }
            }
        });
        target.show = Drawable.prototype.show;
        target.hide = Drawable.prototype.hide;
        this.registerEvents(
            'onshow',
            'onhide'
        );
        var fnOnLoadProxy = target.__onload || function () { };
        target.__onload = function () {
            fnOnLoadProxy.call(this);
	        this.show();
	    };
	    var fnOnUnloadProxy = target.__onunload || function () { };
	    target.__onunload = function () {
	        fnOnUnloadProxy.call(this);
	        this.hide();
	    };
	};
    // public methods
	Drawable.prototype.show = function () {
	    if (!this.__isVisible) {
	        this.__isVisible = true;
	        this.__engine.drawSystem.addEventListener(this.__displayLayer, this, this.draw);
	        this.__fire('onshow');
	    }
	};
	Drawable.prototype.hide = function () {
	    if (this.__isVisible) {
	        this.__isVisible = false;
	        this.__engine.drawSystem.removeEventListener(this.__displayLayer, this, this.draw);
	        this.__fire('onhide');
	    }
	};

	return Drawable;
});