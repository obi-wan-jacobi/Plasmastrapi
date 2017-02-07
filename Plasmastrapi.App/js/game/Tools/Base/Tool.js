define(["../../../engine/Objects/InputHandle"], function (InputHandle) {

    Tool.prototype = Object.create(InputHandle.prototype);
    Tool.prototype.constructor = Tool;
    function Tool(x, y, CursorConstructor) {
        InputHandle.call(this);
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
        if (CursorConstructor) {
            this.cursor = new CursorConstructor(x, y, 15, 15, this);
        }
    };
    // private methods
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
    // public methods
    Tool.prototype.injectEngine = function (engine) {
        InputHandle.prototype.injectEngine.call(this, engine);
        if (this.cursor) {
            this.cursor.injectEngine(this.__engine);
        }
    };
    Tool.prototype.equip = function (entity) {
        this.load();
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