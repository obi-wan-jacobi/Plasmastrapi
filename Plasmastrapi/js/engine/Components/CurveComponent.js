define(['component', 'position', 'physics'],
function (Component, Position, Physics) {

    // CLASS CurveComponent
    CurveComponent.prototype = Object.create(Component.prototype);
    CurveComponent.prototype.constructor = CurveComponent;
    function CurveComponent(startPosition, lineDisplayOptions) {
        if (!(startPosition instanceof Position)) {
            throw new Error(this.constructor.name + ':constructor - Starting position must be an instance of Position!');
        }
        // inherits from
        Component.call(this);
        // private variables
        this.__positions = [startPosition];
        this.__options = lineDisplayOptions,
        // apply mixins
        Component.Mixins.Drawable.call(this, this.__options.displayLayer);
    };
    // public methods
    CurveComponent.prototype.lineTo = function (position) {
        if (!(position instanceof Position)) {
            throw new Error(this.constructor.name + ':lineTo - Position must be an instance of Position!');
        }
        this.__positions.push(position);
    };
    CurveComponent.prototype.draw = function (ctx) {
        // draw line and apply options
        var options = this.__options;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.__positions[0].x, this.__positions[0].y);
        for (var i = 1, L = this.__positions.length; i < L; i++) {
            ctx.lineTo(this.__positions[i].x, this.__positions[i].y);
        }
        ctx.strokeStyle = options.strokeStyle;
        ctx.lineWidth = options.lineWidth;
        ctx.stroke()
        ctx.restore();
    };

    return CurveComponent;
});