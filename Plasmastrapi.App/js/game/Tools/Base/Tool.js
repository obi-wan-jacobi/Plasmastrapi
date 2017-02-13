define(["../../../engine/Objects/InputHandle", "../../../engine/Namespaces/$Components", "../../../engine/Namespaces/$Data"],
function (InputHandle, $, $Data) {

    Tool.prototype = Object.create(InputHandle.prototype);
    Tool.prototype.constructor = Tool;
    function Tool(CursorConstructor) {
        InputHandle.call(this);
        this.__cursorOffsetX = 35;
        this.__cursorOffsetY = 35;
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
    Tool.prototype.__onmousedown = function () {
        InputHandle.prototype.__onmousedown.call(this);
    };
    Tool.prototype.__onmouseup = function () {
        InputHandle.prototype.__onmouseup.call(this);
    };
    // public methods
    Tool.prototype.equip = function (x, y, entity) {
        this.load();
        if (this.__cursor) {
            var poseComponent = this.__cursor.getComponent($.PoseComponent);
            poseComponent.position = new $Data.Geometry.Position(x + this.__cursorOffsetX, y + this.__cursorOffsetY);
        }
        this.__fire('onequip', entity);
    };
    Tool.prototype.discard = function () {
        this.unload();
        this.__fire('ondiscard');
    };
    Tool.prototype.setPickableTraitListFilter = function (pickableTraitList) {
        this.__engine.toolController.setPickableTraitListFilter(pickableTraitList);
    };

    return Tool;
});