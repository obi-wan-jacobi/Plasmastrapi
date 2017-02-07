define(["../../../engine/Objects/Entity", "../../../engine/Namespaces/$Components", "../../../engine/Data/Geometry", "../../../engine/Data/Graphics"],
function (Entity, $, Geometry, Graphics) {

    // CLASS Cursor
    Cursor.prototype = Object.create(Entity.prototype);
    Cursor.prototype.constructor = Cursor;
    function Cursor(x, y, offsetX, offsetY, tool) {
        // inherits from
        Entity.call(this);

        this.__offsetX = offsetX;
        this.__offsetY = offsetY;

        // pose
        var position = new Geometry.Position(x, y);
        var poseComponent = new $.PoseComponent(position, 0);

        // sprite
        var spriteHandle = new Graphics.SpriteHandle('ondrawuiforeground', this.sprite);
        var spriteComponent = new $.SpriteComponent(spriteHandle);

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(spriteComponent);

        // register events
        this.registerEvents(
            'tool_input_onmousemove',
		    'tool_input_onmousedown',
		    'tool_input_onmouseup',
		    'tool_input_onclick',
            'tool_input_onkeydown',
		    'tool_input_onkeyup',
            'tool_pick_onmouseenter',
		    'tool_pick_onmousehover',
		    'tool_pick_onmouseleave',
            'tool_pick_onmousemove',
		    'tool_pick_onmousedown',
		    'tool_pick_onmouseup',
		    'tool_pick_onclick',
            'tool_onequip',
            'tool_ondiscard'
        );

        // configure tool event listeners
        tool.addEventListener('onmousemove', this, this.__$tool_input_onmousemove);
        tool.addEventListener('onmousedown', this, this.__$tool_input_onmousedown);
        tool.addEventListener('onmouseup', this, this.__$tool_input_onmouseup);
        tool.addEventListener('onclick', this, this.__$tool_input_onclick);
        tool.addEventListener('onkeydown', this, this.__$tool_input_onkeydown);
        tool.addEventListener('onkeyup', this, this.__$tool_input_onkeyup);
        tool.addEventListener('pick_onmouseenter', this, this.__$tool_pick_onmouseenter);
        tool.addEventListener('pick_onmousehover', this, this.__$tool_pick_onmousehover);
        tool.addEventListener('pick_onmouseleave', this, this.__$tool_pick_onmouseleave);
        tool.addEventListener('pick_onmousemove', this, this.__$tool_pick_onmousemove);
        tool.addEventListener('pick_onmousedown', this, this.__$tool_pick_onmousedown);
        tool.addEventListener('pick_onmouseup', this, this.__$tool_pick_onmouseup);
        tool.addEventListener('pick_onclick', this, this.__$tool_pick_onclick);
        tool.addEventListener('onequip', this, this.__$tool_onequip);
        tool.addEventListener('ondiscard', this, this.__$tool_ondiscard);
    };
    Cursor.prototype.__tool_input_onmousemove = function () {
        var poseComponent = this.getComponent($.PoseComponent);
        var position = poseComponent.position;
        poseComponent.position = new Geometry.Position(position.x + this.__offsetX, position.y + this.__offsetY);
    };

    return Cursor;
});