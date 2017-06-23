define(['handle', 'curve', 'line-display-settings'],
function (DataHandle, Curve, LineDisplaySettings) {

    CurveHandle.prototype = Object.create(DataHandle.prototype);
    CurveHandle.prototype.constructor = CurveHandle;
    function CurveHandle(curve, displaySettings) {
        DataHandle.call(this, curve, displaySettings, Curve, LineDisplaySettings);
    };
    CurveHandle.prototype.lineTo = function (position) {
        if (!(position instanceof Position)) {
            validator.throw(this, 'lineTo', position.constructor.name + ' must be an instance of Position');
        }
        this.curve.vertices.push(position);
    };
    CurveHandle.prototype.draw = function (ctx) {
        var displaySettings = this.__displaySettings;
        var vertices = this.__data.vertices;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (var i = 1, L = vertices.length; i < L; i++) {
            ctx.lineTo(vertices[i].x, vertices[i].y);
        }
        ctx.strokeStyle = displaySettings.strokeStyle;
        ctx.lineWidth = displaySettings.lineWidth;
        ctx.stroke()
        ctx.restore();
    };

    return CurveHandle;
});