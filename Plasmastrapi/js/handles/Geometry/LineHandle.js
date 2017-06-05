define([],
function () {

    function LineHandle(line, lineDisplaySettings, lineCollisionSettings) {
        this.line = line;
        this.lineDisplaySettings = lineDisplaySettings;
        this.lineCollisionSettings = lineCollisionSettings;
    };
    // public prototypal variables
    Object.defineProperties(LineHandle.prototype, {
        'position': { // location of line's center
            get: function () {
                var head = this.line.headPosition;
                var tail = this.line.tailPosition;
                var x = Math.abs(head.x + tail.x) / 2;
                var y = Math.abs(head.y + tail.y) / 2;
                return new Position(x, y);
            }
        },
        'orientation': { // heading from tail to head
            get: function () {
                var head = this.line.headPosition;
                var tail = this.line.tailPosition;
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
                return euclideanDistance(this.line.headPosition, this.line.tailPosition);
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
        var head = this.line.headPosition;
        var tail = this.line.tailPosition;
        var lineDisplaySettings = this.lineDisplaySettings;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(head.x, head.y);
        ctx.strokeStyle = lineDisplaySettings.strokeStyle;
        ctx.lineWidth = lineDisplaySettings.lineWidth;
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