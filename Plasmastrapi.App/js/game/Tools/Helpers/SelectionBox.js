define(["../../../engine/Namespaces/$Objects", "../../../engine/Namespaces/$Components", "../../../engine/Namespaces/$Data", "../../Namespaces/$Circuits", "../../Namespaces/$PickableTraits"],
function ($Objects, $, $Data, $Circuits, $PickableTraits) {

    SelectionBox.prototype = Object.create($Objects.Entity.prototype);
    SelectionBox.prototype.constructor = SelectionBox;
    function SelectionBox() {

        $Objects.Entity.call(this);

        this.__contents = new $Objects.Container($Circuits.CircuitElement);

        this.__startPosition = new $Data.Geometry.Position(0, 0)
        this.__endPosition = new $Data.Geometry.Position(0, 0);

        var poseComponent = new $.PoseComponent(new $Data.Geometry.Position(0, 0), 0);
        
        var meshDisplayOptions = new $Data.Graphics.MeshDisplayOptions('ondrawgameentities');
        var rectangle = new $Data.Geometry.Rectangle(Math.abs(this.__startPosition.x - this.__endPosition.x), Math.abs(this.__startPosition.y - this.__endPosition.y));
        var mesh = new $Data.Geometry.Mesh(rectangle);
        var meshComponent = new $.MeshComponent(mesh, meshDisplayOptions);

        var pickableComponent = new $.PickableComponent();
        pickableComponent.addEventListener('onpick', this, this.__onpick);

        this.addComponent(poseComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);

        $PickableTraits.Default.call(pickableComponent);
        $PickableTraits.Draggable.call(pickableComponent);
    };
    SelectionBox.prototype.__onpick = function () {
        this.__engine.toolController.equipPlacingTool(this);
    };
    SelectionBox.prototype.startAt = function (startPosition) {
        this.__startPosition = startPosition;
    };
    SelectionBox.prototype.stretchTo = function(endPosition) {
        this.__endPosition = endPosition;

        var poseComponent = this.getComponent($.PoseComponent);
        poseComponent.position = new $Data.Geometry.Position((this.__startPosition.x + this.__endPosition.x) / 2, (this.__startPosition.y + this.__endPosition.y) / 2);

        var rectangle = new $Data.Geometry.Rectangle(Math.abs(this.__startPosition.x - this.__endPosition.x), Math.abs(this.__startPosition.y - this.__endPosition.y));
        var mesh = new $Data.Geometry.Mesh(rectangle);
        var meshComponent = this.getComponent($.MeshComponent);
        meshComponent.mesh = mesh;
    };
    SelectionBox.prototype.fillContents = function () {
        var meshComponent = this.getComponent($.MeshComponent);
        this.__engine.circuitElementContainer.forEach(function (element) {
            var poseComponent = element.getComponent($.PoseComponent);
            if (meshComponent.checkPointCollision(poseComponent.position)) {
                this.__contents.add(element);
            }
        }, this);
    };
    SelectionBox.prototype.destroyContents = function () {
        this.__contents.forEach(function (element) {
            element.destroy();
        }, this);
    };

    return SelectionBox;
});