define(['entity', 'mesh-component', 'pick-component', 'pose-component', 'mesh', 'position', 'rectangle'],
function (Entity, MeshComponent, PickComponent, PoseComponent, Mesh, Position, Rectangle, MeshDisplaySettings) {

    SelectionBox.prototype = Object.create(Entity.prototype);
    SelectionBox.prototype.constructor = SelectionBox;
    function SelectionBox() {
        Entity.call(this);
        this.__contents = [];
        this.__startPosition = new Position(0, 0)
        this.__endPosition = new Position(0, 0);
    };
    SelectionBox.prototype.__onpick = function () {
        this.__engine.toolController.equipPlacingTool(this);
    };
    SelectionBox.prototype.__onpositionchange = function (newPosition, oldPosition) {
        for (var i = 0, L = this.__contents.length; i < L; i++) {
            var poseComponent = this.__contents[i].getComponent(PoseComponent);
            poseComponent.position = new Position(
                poseComponent.position.x + newPosition.x - oldPosition.x,
                poseComponent.position.y + newPosition.y - oldPosition.y
            )
        }
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
        this.getComponent(PoseComponent).getHandle().setData(new Position(
            (this.__startPosition.x + this.__endPosition.x) / 2,
            (this.__startPosition.y + this.__endPosition.y) / 2
        ));

        var rectangle = new Rectangle(
            Math.abs(this.__startPosition.x - this.__endPosition.x),
            Math.abs(this.__startPosition.y - this.__endPosition.y)
        );
        var mesh = new Mesh(rectangle.vertices);
        this.getComponent(MeshComponent).getHandle().setData(mesh);
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