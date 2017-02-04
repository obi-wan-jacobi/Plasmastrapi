define(["../../../engine/Objects/Entity", "../../../engine/Namespaces/$Components", "../../../engine/Data/Geometry", "../../../engine/Data/Graphics"],
function (Entity, $, Geometry, Graphics) {

    // CLASS Cursor
    Cursor.prototype = Object.create(Entity.prototype);
    Cursor.prototype.constructor = Cursor;
    function Cursor(x, y) {
        // inherits from
        Entity.call(this);

        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new $.PoseComponent(position, 0);

        // sprite
        var spriteHandle = new Graphics.SpriteHandle('ondrawuiforeground', this.sprite);
        var spriteComponent = new $.SpriteComponent(spriteHandle);

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(spriteComponent);
    };

    return Cursor;
});