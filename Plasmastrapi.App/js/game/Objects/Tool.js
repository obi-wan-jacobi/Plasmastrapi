define(["../../engine/Objects/EventEmitter"], function(EventEmitter) {

    Tool.prototype = Object.create(EventEmitter.prototype);
    Tool.prototype.constructor = Tool;
    function Tool() {
        EventEmitter.call(this);
        this.__registerEvents(
            'input_onmousemove',
		    'input_onmousedown',
		    'input_onmouseup',
		    'input_onclick',
            'input_onkeydown',
		    'input_onkeyup',
            'pick_onmouseenter',
		    'pick_onmousehover',
		    'pick_onmouseleave',
            'pick_onmousemove',
		    'pick_onmousedown',
		    'pick_onmouseup',
		    'pick_onclick'
        );
    };
    // private methods
    // public prototypal variables
    Tool.prototype.compatibleEntityClassesList = [];
    // public methods
    Tool.prototype.equip = function () {
        this.__engine.inputSystem.addEventListener('onmousemove', this, this.__$input_onmousemove);
        this.__engine.inputSystem.addEventListener('onmousedown', this, this.__$input_onmousedown);
        this.__engine.inputSystem.addEventListener('onmouseup', this, this.__$input_onmouseup);
        this.__engine.inputSystem.addEventListener('onclick', this, this.__$input_onclick);
        this.__engine.inputSystem.addEventListener('onkeyup', this, this.__$input_onkeyup);
        this.__engine.inputSystem.addEventListener('onkeydown', this, this.__$input_onkeydown);
        this.__engine.pickSystem.addEventListener('onmousemove', this, this.__$pick_onmousemove);
        this.__engine.pickSystem.addEventListener('onmousedown', this, this.__$pick_onmousedown);
        this.__engine.pickSystem.addEventListener('onmouseup', this, this.__$pick_onmouseup);
        this.__engine.pickSystem.addEventListener('onclick', this, this.__$pick_onclick);
        this.__engine.pickSystem.addEventListener('onmouseenter', this, this.__$pick_onmouseenter);
        this.__engine.pickSystem.addEventListener('onmousehover', this, this.__$pick_onmousehover);
        this.__engine.pickSystem.addEventListener('onmouseleave', this, this.__$pick_onmouseleave);
    };
    Tool.prototype.discard = function () {
        this.__engine.inputSystem.removeEventListener('onmousemove', this, this.__$input_onmousemove);
        this.__engine.inputSystem.removeEventListener('onmousedown', this, this.__$input_onmousedown);
        this.__engine.inputSystem.removeEventListener('onmouseup', this, this.__$input_onmouseup);
        this.__engine.inputSystem.removeEventListener('onclick', this, this.__$input_onclick);
        this.__engine.inputSystem.removeEventListener('onkeyup', this, this.__$input_onkeyup);
        this.__engine.inputSystem.removeEventListener('onkeydown', this, this.__$input_onkeydown);
        this.__engine.pickSystem.removeEventListener('onmousemove', this, this.__$pick_onmousemove);
        this.__engine.pickSystem.removeEventListener('onmousedown', this, this.__$pick_onmousedown);
        this.__engine.pickSystem.removeEventListener('onmouseup', this, this.__$pick_onmouseup);
        this.__engine.pickSystem.removeEventListener('onclick', this, this.__$pick_onclick);
        this.__engine.pickSystem.removeEventListener('onmouseenter', this, this.__$pick_onmouseenter);
        this.__engine.pickSystem.removeEventListener('onmousehover', this, this.__$pick_onmousehover);
        this.__engine.pickSystem.removeEventListener('onmouseleave', this, this.__$pick_onmouseleave);
    };

    return Tool;
});