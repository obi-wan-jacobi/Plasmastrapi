define(function () {

    function Drawable() {
        var target = this;
        validator.validateType(target, target, Component); 
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
	    if (this.__isVisible) {
            return;
        }
        this.__isVisible = true;
        this.emit('onshow');
	};
	Drawable.prototype.hide = function () {
	    if (!this.__isVisible) {
            return;
        }
        this.__isVisible = false;
        this.emit('onhide');
    };
    Drawable.prototype.draw = function (ctx) {
        var poseHandle = this.__entity.getComponentByName('PoseComponent').getHandle();
        var position = poseHandle.getPosition();
        var orientation = poseHandle.getOrientation();
        this.__handle.draw(ctx, position, orientation);
    };

	return Drawable;
});