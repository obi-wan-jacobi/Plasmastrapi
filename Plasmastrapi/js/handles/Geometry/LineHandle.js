define(['handle', 'line', 'line-display-settings', 'position', 'rectangle'],
function (Handle, Line, LineDisplaySettings, Position, Rectangle) {

    LineHandle.prototype = Object.create(Handle.prototype);
    LineHandle.prototype.constructor = LineHandle;
    function LineHandle(line, displaySettings, lineCollisionSettings) {
        Handle.call(this, line, displaySettings, Line, LineDisplaySettings);
    };
    // public prototypal variables
    LineHandle.prototype.getPosition = function () {
        var head = this.target.headVertex;
        var tail = this.target.tailVertex;
        var x = Math.abs(head.x + tail.x) / 2;
        var y = Math.abs(head.y + tail.y) / 2;
        return new Position(x, y);
    };
    LineHandle.prototype.getOrientation = function () {
        // heading from tail to head
        var head = this.target.headVertex;
        var tail = this.target.tailVertex;
        var x = (head.x - tail.x);
        var y = (head.y - tail.y);
        if (x < 0) {
            return Math.PI + Math.atan(y / x);
        }
        return Math.atan(y / x);
    };
    LineHandle.prototype.getLength = function () {
        // euclidean distance from tail to head
        return euclideanDistance(this.target.headVertex, this.target.tailVertex);
    };
    LineHandle.prototype.getMesh = function () {
        // line converted into static rectangular mesh
        return new Rectangle(
            this.getLength() * lineCollisionSettings.lengthModifier,
            lineCollisionSettings.collisionWidth
        );
    };
    LineHandle.prototype.draw = function (ctx) {
        // draw line and apply options
        var head = this.target.headVertex;
        var tail = this.target.tailVertex;
        var displaySettings = this.displaySettings;
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