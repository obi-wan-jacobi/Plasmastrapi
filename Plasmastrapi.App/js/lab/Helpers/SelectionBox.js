define(['entity', 'polygon-component', 'pick-component', 'pose-component', 'polygon', 'position', 'pose', 'rectangle', 'polygon-display-settings'],
function (Entity, PolygonComponent, PickComponent, PoseComponent, Polygon, Position, Pose, Rectangle, PolygonDisplaySettings) {

    SelectionBox.prototype = Object.create(Entity.prototype);
    SelectionBox.prototype.constructor = SelectionBox;
    function SelectionBox() {
        Entity.call(this);
        this.__contents = [];
        this.__startPosition = new Position(0, 0)
        this.__endPosition = new Position(0, 0);
    };
    Object.defineProperties(SelectionBox.prototype, {
        'contents': {
            get: function () {
                return this.__contents;
            }
        }
    });
    SelectionBox.prototype.startAt = function (startPosition) {
        this.__startPosition = startPosition;
    };
    SelectionBox.prototype.stretchTo = function(endPosition) {
        this.__endPosition = endPosition;
        this.getComponent(PoseComponent).getHandle().setData(new Pose(
            (this.__startPosition.x + this.__endPosition.x) / 2,
            (this.__startPosition.y + this.__endPosition.y) / 2
        ));
        var rectangle = new Rectangle(
            Math.abs(this.__startPosition.x - this.__endPosition.x),
            Math.abs(this.__startPosition.y - this.__endPosition.y)
        );
        var polygon = new Polygon(rectangle.vertices);
        this.getComponent(PolygonComponent).getHandle().setData(polygon);
    };
    SelectionBox.prototype.fillContents = function () {
        // pass selection box boundary to pick controller
    };
    SelectionBox.prototype.destroyContents = function () {
        for (var i = 0, L = this.__contents.length; i < L; i++) {
            this.__contents[i].destroy();
        }
    };

    return SelectionBox;
});