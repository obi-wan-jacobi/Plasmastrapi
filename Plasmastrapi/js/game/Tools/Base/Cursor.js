define([
    // Base
    'entity',
    // Components
    'pose-component', 'sprite-component',
    // Data
    'position',
    'sprite-handle',
    // Configs
    'game-config'
],
function (Entity, PoseComponent, SpriteComponent, Position, SpriteHandle, config) {

    // CLASS Cursor
    Cursor.prototype = Object.create(Entity.prototype);
    Cursor.prototype.constructor = Cursor;
    function Cursor(offsetX, offsetY, tool) {
        // inherits from
        Entity.call(this);

        this.__offsetX = offsetX;
        this.__offsetY = offsetY;

        // initialize pose to be off-screen
        var position = new Position(-offsetX - this.sprite.frames[0].width, -offsetY - this.sprite.frames[0].height);
        var poseComponent = new PoseComponent(position, 0);

        // sprite
        var spriteHandle = new SpriteHandle(config.Cursor.displayLayer, this.sprite);
        var spriteComponent = new SpriteComponent(spriteHandle);

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(spriteComponent);

        // register events
        this.__registerEvents(
            'onmousemove',
		    'onmousedown',
		    'onmouseup',
		    'onclick',
            'onkeydown',
		    'onkeyup',
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
        tool.addEventListener('onload', this, this.load);
        tool.addEventListener('onunload', this, this.unload);
        tool.addEventListener('onmousemove', this, this.__$onmousemove);
        tool.addEventListener('onmousedown', this, this.__$onmousedown);
        tool.addEventListener('onmouseup', this, this.__$onmouseup);
        tool.addEventListener('onclick', this, this.__$onclick);
        tool.addEventListener('onkeydown', this, this.__$onkeydown);
        tool.addEventListener('onkeyup', this, this.__$onkeyup);
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
    Cursor.prototype.__onmousemove = function (cursor) {
        var poseComponent = this.getComponent(PoseComponent);
        poseComponent.position = new Position(cursor.x + this.__offsetX, cursor.y + this.__offsetY);
    };

    return Cursor;
});