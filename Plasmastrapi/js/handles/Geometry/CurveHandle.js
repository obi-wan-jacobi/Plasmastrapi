define([],
function () {

    function CurveHandle(curve, curveDisplaySettings) {
        this.curve = curve;
        this.curveDisplaySettings = curveDisplaySettings;
    };
    CurveHandle.prototype.lineTo = function (position) {
        if (!(position instanceof Position)) {
            throw new Error(this.constructor.name + ':lineTo - ' + position.constructor.name + ' must be an instance of Position!');
        }
        this.curve.positions.push(position);
    };
    CurveHandle.prototype.draw = function (ctx) {
        // draw line and apply options
        var curveDisplaySettings = this.curveDisplaySettings;
        var positions = this.curve.positions;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(positions[0].x, positions[0].y);
        for (var i = 1, L = positions.length; i < L; i++) {
            ctx.lineTo(positions[i].x, positions[i].y);
        }
        ctx.strokeStyle = curveDisplaySettings.strokeStyle;
        ctx.lineWidth = curveDisplaySettings.lineWidth;
        ctx.stroke()
        ctx.restore();
    };

    return CurveHandle;
});