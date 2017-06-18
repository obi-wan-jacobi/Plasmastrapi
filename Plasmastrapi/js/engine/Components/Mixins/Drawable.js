define(['pose-component'], function (PoseComponent) {

    function Drawable() {
        var target = this;
        validator.validateType(target, target, Emitter);
        if (!target.getHandle) {
            validator.throw(target.constructor.name, Drawable.constructor.name, 'Target must implement a getHandle method');
        }
        if (!target.getHandle().draw) {
            validator.throw(target.constructor.name, Drawable.constructor.name, 'Target\'s handle must implement a draw method');
        }
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
        target.draw = Drawable.prototype.draw;
        this.__registerEvents(
            'onshow',
            'onhide'
        );
        var fnOnLoadProxy = target.__onload || function () { };
        target.__onload = function (isVisibleByDefault) {
            fnOnLoadProxy.call(this);
            if (isVisibleByDefault || isVisibleByDefault === undefined) {
                this.show();
            }
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
	        this.__engine.drawSystem.addEventListener(this.__handle.displaySettings.displayLayer, this, this.draw);
	        this.__fire('onshow');
	    }
	};
	Drawable.prototype.hide = function () {
	    if (this.__isVisible) {
	        this.__isVisible = false;
	        this.__engine.drawSystem.removeEventListener(this.__handle.displaySettings.displayLayer, this, this.draw);
	        this.__fire('onhide');
	    }
    };
    Drawable.prototype.draw = function (ctx) {
        var poseHandle = this.__entity.getComponent(PoseComponent).getHandle();
        var position = poseHandle.getPosition();
        var orientation = poseHandle.getOrientation();
        this.__handle.draw(ctx, position, orientation);
    };

	return Drawable;
});