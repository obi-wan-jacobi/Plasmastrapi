define(function () {

    // CLASS Drawable
    Drawable.prototype = Object.create(Component.prototype);
    Drawable.prototype.constructor = Drawable;
    function Drawable(displayLayer) {
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
    Drawable.prototype.__draw = function (ctx) {
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
            if (component) {
                component.__draw();
            }
        }
    };

    // events
    Drawable.prototype.__registerEvents(
        'onshow',
        'onhide'
    );

    function Drawable(ClassPrototype) {
        var target = ClassPrototype || this;
        if (!(target.injectEntity)) {
            throw new Error(Drawable.name + ':constructor - Target must be an instance of Component');
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
        target.injectEngine = function (engine) {
            target.injectEngine(engine);
            Drawable.prototype.injectEngine.call(this);
        };
        target.destroy = Drawable.prototype.destroy;
        target.__registerEvents(
            'onshow',
            'onhide'
        );
    };
    Drawable.prototype.injectEngine = function (engine) {
        this.__engine.addEventListener('ondestroy', this, this.destroy);
    };
    Drawable.prototype.show = function () {
        if (!this.__draw) {
            throw new Error(this.constructor.name + ':show - ' + this.__entity.constructor.name + ' Does not possess a draw method.');
        }
        if (!this.__isVisible) {
            this.__isVisible = true;
            this.__engine.drawSystem.addEventListener(this.__displayLayer, this, this.__draw);
            this.__fire('onshow');
        }
    };
    Drawable.prototype.hide = function () {
        if (this.__isVisible) {
            this.__isVisible = false;
            this.__engine.drawSystem.removeEventListener(this.__displayLayer, this, this.__draw);
            this.__fire('onhide');
        }
    };

    return Drawable;
});