define(['handle', 'line', 'line-display-settings'],
function (Handle, Line, LineDisplaySettings) {

    LineHandle.prototype = Object.create(Handle.prototype);
    LineHandle.prototype.constructor = LineHandle;
    function LineHandle(line, displaySettings, lineCollisionSettings) {
        Handle.call(this, line, displaySettings, Line, LineDisplaySettings);
    };
    // public prototypal variables
    Object.defineProperties(LineHandle.prototype, {
        'position': { // location of line's center
            get: function () {
                var head = this.target.headPosition;
                var tail = this.target.tailPosition;
                var x = Math.abs(head.x + tail.x) / 2;
                var y = Math.abs(head.y + tail.y) / 2;
                return new Position(x, y);
            }
        },
        'orientation': { // heading from tail to head
            get: function () {
                var head = this.target.headPosition;
                var tail = this.target.tailPosition;
                var x = (head.x - tail.x);
                var y = (head.y - tail.y);
                if (x < 0) {
                    return Math.PI + Math.atan(y / x);
                }
                return Math.atan(y / x);
            }
        },
        'length': { // euclidean distance from tail to head
            get: function () {
                return euclideanDistance(this.target.headPosition, this.target.tailPosition);
            }
        },
        'mesh': { // line converted into static rectangular mesh
            get: function () {
                var rectangle = new Rectangle(
                    this.length * lineCollisionSettings.lengthModifier,
                    lineCollisionSettings.collisionWidth
                );
                return new Mesh(rectangle);
            }
        }
    });
    LineHandle.prototype.draw = function (ctx) {
        // draw line and apply options
        var head = this.target.headPosition;
        var tail = this.target.tailPosition;
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