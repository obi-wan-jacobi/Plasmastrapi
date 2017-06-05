define(['pose-component'], function (PoseComponent) {

    function Drawable() {
        var target = this;
        if (!target.registerEvents) {
            throw new Error(target.constructor.name + ':' + Drawable.constructor.name + ' - Target must be an instance of EventEmitter');
        }
        if (!target.getHandle) {
            throw new Error(target.constructor.name + ':' + Drawable.constructor.name + ' - Target must implement a getHandle method');
        }
        if (!target.getHandle().draw) {
            throw new Error(target.constructor.name + ':' + Drawable.constructor.name + ' - Target\'s handle must implement a draw method');
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
        this.registerEvents(
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
    // private methods
    Drawable.prototype.__validatePoseComponent = function () {
        if (!this.__entity.getComponent(PoseComponent)) {
            throw new Error(target.constructor.name + ':' + Drawable.constructor.name + ' - Target\'s entity must be composed of a ' + PoseComponent.name);
        }
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
    Drawable.prototype.draw = function (ctx) {
        var handle = this.getHandle();
        var pose = this.__entity.getComponent(PoseComponent);
        handle.draw(ctx, pose.position, pose.orientation);
    };

	return Drawable;
});