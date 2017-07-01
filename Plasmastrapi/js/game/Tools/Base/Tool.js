define([
    // Base
    'input-handle',
    // Components
    'pose-component',
    'sprite-component',
    // Data
    'position',
    // Compatibility
    'filter',
    // Configs
    'game-config'
],
function (InputHandle, PoseComponent, SpriteComponent, Position, Filter, config) {

    Tool.prototype = Object.create(InputHandle.prototype);
    Tool.prototype.constructor = Tool;
    function Tool(CursorConstructor) {
        InputHandle.call(this);
        this.__cursorOffsetX = config.Tool.cursorOffsetX;
        this.__cursorOffsetY = config.Tool.cursorOffsetY;
        this.registerEvents(
            'onequip',
            'ondiscard',
            'pick_onmouseenter',
		    'pick_onmousehover',
		    'pick_onmouseleave',
            'pick_onmousemove',
		    'pick_onmousedown',
		    'pick_onmouseup',
		    'pick_onclick'
        );
        this.__CursorConstructor = CursorConstructor;
        this.__cursor = null;
    };
    // private methods
    Tool.prototype.__oninit = function () {
        if (this.__CursorConstructor) {
            this.__cursor = new this.__CursorConstructor(this.__cursorOffsetX, this.__cursorOffsetY, this);
            this.__cursor.injectEngine(this.__engine);
        }
    };
    Tool.prototype.__onload = function () {
        InputHandle.prototype.__onload.call(this);
        this.__engine.pickSystem.addEventListener('onmousemove', this, this.__$pick_onmousemove);
        this.__engine.pickSystem.addEventListener('onmousedown', this, this.__$pick_onmousedown);
        this.__engine.pickSystem.addEventListener('onmouseup', this, this.__$pick_onmouseup);
        this.__engine.pickSystem.addEventListener('onclick', this, this.__$pick_onclick);
        this.__engine.pickSystem.addEventListener('onmouseenter', this, this.__$pick_onmouseenter);
        this.__engine.pickSystem.addEventListener('onmousehover', this, this.__$pick_onmousehover);
        this.__engine.pickSystem.addEventListener('onmouseleave', this, this.__$pick_onmouseleave);
    };
    Tool.prototype.__onunload = function () {
        InputHandle.prototype.__onunload.call(this);
        this.__engine.pickSystem.removeEventListener('onmousemove', this, this.__$pick_onmousemove);
        this.__engine.pickSystem.removeEventListener('onmousedown', this, this.__$pick_onmousedown);
        this.__engine.pickSystem.removeEventListener('onmouseup', this, this.__$pick_onmouseup);
        this.__engine.pickSystem.removeEventListener('onclick', this, this.__$pick_onclick);
        this.__engine.pickSystem.removeEventListener('onmouseenter', this, this.__$pick_onmouseenter);
        this.__engine.pickSystem.removeEventListener('onmousehover', this, this.__$pick_onmousehover);
        this.__engine.pickSystem.removeEventListener('onmouseleave', this, this.__$pick_onmouseleave);
    };
    Tool.prototype.__onmousedown = function (cursor) {
        InputHandle.prototype.__onmousedown.call(this, cursor);
    };
    Tool.prototype.__onmouseup = function (cursor) {
        InputHandle.prototype.__onmouseup.call(this, cursor);
    };
    Tool.prototype.__onkeydown = function (keyCode) {
        InputHandle.prototype.__onkeydown.call(this, keyCode);
    };
    Tool.prototype.__onkeyup = function (keyCode) {
        InputHandle.prototype.__onkeyup.call(this, keyCode);
    };
    // public methods
    Tool.prototype.equip = function () {
        this.load();
        if (this.__cursor) {
            this.__cursor.load(false);
            var poseComponent = this.__cursor.getComponent(PoseComponent);
            poseComponent.position = new Position(
                arguments[arguments.length - 2] + this.__cursorOffsetX,
                arguments[arguments.length - 1] + this.__cursorOffsetY
            );
            this.__cursor.getComponent(SpriteComponent).show();
        }
        [].unshift.call(arguments, 'onequip');
        this.emit.apply(this, arguments);
    };
    Tool.prototype.discard = function () {
        this.emit('ondiscard');
        if (this.__cursor) {
            this.__cursor.unload();
        }
        this.unload();
    };
    Tool.prototype.setCompatibilityFilter = function () {
        this.__engine.toolController.setCompatibilityFilter(new Filter(arguments));
    };

    return Tool;
});