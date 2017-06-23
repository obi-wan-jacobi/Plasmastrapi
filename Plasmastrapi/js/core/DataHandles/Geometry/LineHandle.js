define(['handle', 'line', 'line-display-settings', 'position', 'rectangle', 'core-constants', 'validator'],
function (DataHandle, Line, LineDisplaySettings, Position, Rectangle, CORE, validator) {

    LineHandle.prototype = Object.create(DataHandle.prototype);
    LineHandle.prototype.constructor = LineHandle;
    function LineHandle(line, displaySettings) {
        DataHandle.call(this, line, displaySettings, Line, LineDisplaySettings);
    };
    // public prototypal variables
    LineHandle.prototype.getPosition = function () {
        var head = this.__data.headVertex;
        var tail = this.__data.tailVertex;
        var x = Math.abs(head.x + tail.x) / 2;
        var y = Math.abs(head.y + tail.y) / 2;
        return new Position(x, y);
    };
    LineHandle.prototype.getOrientation = function () {
        // heading from tail to head
        var head = this.__data.headVertex;
        var tail = this.__data.tailVertex;
        var x = (head.x - tail.x);
        var y = (head.y - tail.y);
        if (x < 0) {
            return Math.PI + Math.atan(y / x);
        }
        return Math.atan(y / x);
    };
    LineHandle.prototype.getLength = function () {
        // euclidean distance from tail to head
        return euclideanDistance(this.__data.headVertex, this.__data.tailVertex);
    };
    LineHandle.prototype.getMesh = function () {
        // line converted into static rectangular mesh
        return new Rectangle(
            this.getLength() * CORE.LineHandle.lengthModifier,
            CORE.LineHandle.collisionWidth
        );
    };
    LineHandle.prototype.draw = function (ctx) {
        // draw line and apply options
        var head = this.__data.headVertex;
        var tail = this.__data.tailVertex;
        var displaySettings = this.__displaySettings;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.strokeStyle = displaySettings.strokeStyle;
        ctx.lineWidth = displaySettings.lineWidth;
        ctx.stroke()
        ctx.restore();
    };

    function pow2(arg) {
        return Math.pow(arg, 2);
    };

    function euclideanDistance(p1, p2) {
        return Math.sqrt(pow2(p2.x - p1.x) + pow2(p2.y - p1.y));
    };

    return LineHandle;
});