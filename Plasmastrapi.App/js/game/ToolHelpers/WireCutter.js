define(['ui-element', 'container', 'utils'],
function (UIElement, Container, utils) {

    WireCutter.prototype = Object.create(UIElement.prototype);
    WireCutter.prototype.constructor = WireCutter;
    function WireCutter(engine) {
        UIElement.call(this, engine);
        var wires = this.__engine.getFactory('wire-factory').getContainer().toArray();
        this.__wireContainer = new Container('wire');
        for (var i = 0, L = wires.length; i < L; i++) {
            this.__wireContainer.add(wires[i]);
        }
        this.__contents = new Container('wire');
        this.__curveComponent = this.set('curve-component');
        this.__previousPosition = null;
        this.__currentPosition = null;
    };
    // private methods
    WireCutter.prototype.__ondestroy = function () {
        if (this.__contents) {
            this.__contents.forEach(function (wire) {
                wire.destroy();
            }, this);
        }
    };
    WireCutter.prototype.__collectWireIntersections = function () {
        function euclideanDistance(p1, p2) {
            return Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2));
        };
        this.__wireContainer.forEach(function (wire) {
            var wireTailPosition = wire.outputTerminal.getComponent('pose-component').getHandle().getPosition();
            var wireHeadPosition = wire.inputTerminal.getComponent('pose-component').getHandle().getPosition();
            var wireSlope = (wireHeadPosition.y - wireTailPosition.y) / (wireHeadPosition.x - wireTailPosition.x);
            wireSlope = isFinite(wireSlope) ? wireSlope : 9999;
            var wireYIntercept = wireHeadPosition.y - wireSlope * wireHeadPosition.x;
            var lineSlope = (this.__currentPosition.y - this.__previousPosition.y) / (this.__currentPosition.x - this.__previousPosition.x);
            lineSlope = isFinite(lineSlope) ? lineSlope : 9999;
            var lineYIntercept = this.__currentPosition.y - lineSlope * this.__currentPosition.x;
            var xIntersection = (lineYIntercept - wireYIntercept) / (wireSlope - lineSlope);
            var yIntersection = lineSlope * xIntersection + lineYIntercept;
            var intersection = { x: xIntersection, y: yIntersection };
            if (euclideanDistance(this.__currentPosition, intersection) < euclideanDistance(this.__currentPosition, this.__previousPosition) &&
                euclideanDistance(this.__previousPosition, intersection) < euclideanDistance(this.__previousPosition, this.__currentPosition) &&
                euclideanDistance(wireHeadPosition, intersection) < euclideanDistance(wireHeadPosition, wireTailPosition) &&
                euclideanDistance(wireTailPosition, intersection) < euclideanDistance(wireTailPosition, wireHeadPosition)) {
                wire.getComponent('pick-component').select();
                this.__contents.add(wire);
                this.__wireContainer.remove(wire);
            }
        }, this);
    };
    // public methods
    WireCutter.prototype.lineTo = function (position) {
        this.__currentPosition = position;
        this.__curveComponent.getHandle().lineTo(position);
        if (!this.__previousPosition) {
            this.__previousPosition = this.__currentPosition;
            return;
        }
        this.__collectWireIntersections();
        this.__previousPosition = this.__currentPosition;
    };

    return WireCutter;
});