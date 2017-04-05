define([
    "../../../engine/Namespaces/$Objects",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Namespaces/$Data",
    "gameConfig"
],
function ($Objects, $, $Data, config) {

    Tool.prototype = Object.create($Objects.InputHandle.prototype);
    Tool.prototype.constructor = Tool;
    function Tool(CursorConstructor) {
        $Objects.InputHandle.call(this);
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
        $Objects.InputHandle.prototype.__onload.call(this);
        this.__engine.pickSystem.addEventListener('onmousemove', this, this.__$pick_onmousemove);
        this.__engine.pickSystem.addEventListener('onmousedown', this, this.__$pick_onmousedown);
        this.__engine.pickSystem.addEventListener('onmouseup', this, this.__$pick_onmouseup);
        this.__engine.pickSystem.addEventListener('onclick', this, this.__$pick_onclick);
        this.__engine.pickSystem.addEventListener('onmouseenter', this, this.__$pick_onmouseenter);
        this.__engine.pickSystem.addEventListener('onmousehover', this, this.__$pick_onmousehover);
        this.__engine.pickSystem.addEventListener('onmouseleave', this, this.__$pick_onmouseleave);
    };
    Tool.prototype.__onunload = function () {
        $Objects.InputHandle.prototype.__onunload.call(this);
        this.__engine.pickSystem.removeEventListener('onmousemove', this, this.__$pick_onmousemove);
        this.__engine.pickSystem.removeEventListener('onmousedown', this, this.__$pick_onmousedown);
        this.__engine.pickSystem.removeEventListener('onmouseup', this, this.__$pick_onmouseup);
        this.__engine.pickSystem.removeEventListener('onclick', this, this.__$pick_onclick);
        this.__engine.pickSystem.removeEventListener('onmouseenter', this, this.__$pick_onmouseenter);
        this.__engine.pickSystem.removeEventListener('onmousehover', this, this.__$pick_onmousehover);
        this.__engine.pickSystem.removeEventListener('onmouseleave', this, this.__$pick_onmouseleave);
    };
    Tool.prototype.__onmousedown = function (cursor) {
        $Objects.InputHandle.prototype.__onmousedown.call(this, cursor);
    };
    Tool.prototype.__onmouseup = function (cursor) {
        $Objects.InputHandle.prototype.__onmouseup.call(this, cursor);
    };
    Tool.prototype.__onkeydown = function (keyCode) {
        $Objects.InputHandle.prototype.__onkeydown.call(this, keyCode);
    };
    Tool.prototype.__onkeyup = function (keyCode) {
        $Objects.InputHandle.prototype.__onkeyup.call(this, keyCode);
    };
    // public methods
    Tool.prototype.equip = function () {
        this.load();
        if (this.__cursor) {
            this.__cursor.load(false);
            var poseComponent = this.__cursor.getComponent($.PoseComponent);
            poseComponent.position = new $Data.Geometry.Position(
                arguments[arguments.length - 2] + this.__cursorOffsetX,
                arguments[arguments.length - 1] + this.__cursorOffsetY
            );
            this.__cursor.getComponent($.SpriteComponent).show();
        }
        [].unshift.call(arguments, 'onequip');
        this.__fire.apply(this, arguments);
    };
    Tool.prototype.discard = function () {
        this.__fire('ondiscard');
        if (this.__cursor) {
            this.__cursor.unload();
        }
        this.unload();
    };
    Tool.prototype.setCompatibilityFilter = function (pickableTraitList) {
        this.__engine.toolController.setCompatibilityFilter(pickableTraitList);
    };

    return Tool;
});