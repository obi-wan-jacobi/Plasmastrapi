define(["../../engine/Objects/EventEmitter"], function(EventEmitter) {

    Tool.prototype = Object.create(EventEmitter.prototype);
    Tool.prototype.constructor = Tool;
    function Tool() {
        EventEmitter.call(this);
    };
    // private methods
    Tool.prototype.__input_onmousemove = function (cursor) { this.__fire('input_onmousemove', cursor); };
    Tool.prototype.__input_onmousedown = function (cursor) { this.__fire('input_onmousedown', cursor); };
    Tool.prototype.__input_onmouseup = function (cursor) { this.__fire('input_onmouseup', cursor); };
    Tool.prototype.__input_onclick = function (cursor) { this.__fire('input_onclick', cursor); };
    Tool.prototype.__input_onkeyup = function (keyCode) { this.__fire('input_onkeyup', keyCode); };
    Tool.prototype.__input_onkeydown = function (keyCode) { this.__fire('input_onkeydown', keyCode); };
    Tool.prototype.__pick_onmousemove = function (entities) { this.__fire('pick_onmousemove', entities); };
    Tool.prototype.__pick_onmousedown = function (entities) { this.__fire('pick_onmousedown', entities);; };
    Tool.prototype.__pick_onmouseup = function (entities) { this.__fire('pick_onmouseup', entities);; };
    Tool.prototype.__pick_onclick = function (entities) { this.__fire('pick_onclick', entities);; };
    Tool.prototype.__pick_onmouseenter = function (entities) { this.__fire('pick_onmouseenter', entities); };
    Tool.prototype.__pick_onmousehover = function (entities) { this.__fire('pick_onmousehover', entities); };
    Tool.prototype.__pick_onmouseleave = function (entities) { this.__fire('pick_onmouseleave', entities); };
    // public prototypal variables
    Tool.prototype.compatibleEntityClassesList = [];
    // public methods
    Tool.prototype.equip = function () {
        this.__engine.inputSystem.addEventListener('onmousemove', this, this.__input_mousemove);
        this.__engine.inputSystem.addEventListener('onmousedown', this, this.__input_onmousedown);
        this.__engine.inputSystem.addEventListener('onmouseup', this, this.__input_onmouseup);
        this.__engine.inputSystem.addEventListener('onclick', this, this.__input_onclick);
        this.__engine.inputSystem.addEventListener('onkeyup', this, this.__input_onkeyup);
        this.__engine.inputSystem.addEventListener('onkeydown', this, this.__input_onkeydown);
        this.__engine.pickSystem.addEventListener('onmousemove', this, this.__pick_mousemove);
        this.__engine.pickSystem.addEventListener('onmousedown', this, this.__pick_onmousedown);
        this.__engine.pickSystem.addEventListener('onmouseup', this, this.__pick_onmouseup);
        this.__engine.pickSystem.addEventListener('onclick', this, this.__pick_onclick);
        this.__engine.pickSystem.addEventListener('onmouseenter', this, this.__pick_onmouseenter);
        this.__engine.pickSystem.addEventListener('onmousehover', this, this.__pick_onmousehover);
        this.__engine.pickSystem.addEventListener('onmouseleave', this, this.__pick_onmouseleave);
    };
    Tool.prototype.discard = function () {
        this.__engine.inputSystem.removeEventListener('onmousemove', this, this.__input_mousemove);
        this.__engine.inputSystem.removeEventListener('onmousedown', this, this.__input_onmousedown);
        this.__engine.inputSystem.removeEventListener('onmouseup', this, this.__input_onmouseup);
        this.__engine.inputSystem.removeEventListener('onclick', this, this.__input_onclick);
        this.__engine.inputSystem.removeEventListener('onkeyup', this, this.__input_onkeyup);
        this.__engine.inputSystem.removeEventListener('onkeydown', this, this.__input_onkeydown);
        this.__engine.pickSystem.removeEventListener('onmousemove', this, this.__pick_mousemove);
        this.__engine.pickSystem.removeEventListener('onmousedown', this, this.__pick_onmousedown);
        this.__engine.pickSystem.removeEventListener('onmouseup', this, this.__pick_onmouseup);
        this.__engine.pickSystem.removeEventListener('onclick', this, this.__pick_onclick);
        this.__engine.pickSystem.removeEventListener('onmouseenter', this, this.__pick_onmouseenter);
        this.__engine.pickSystem.removeEventListener('onmousehover', this, this.__pick_onmousehover);
        this.__engine.pickSystem.removeEventListener('onmouseleave', this, this.__pick_onmouseleave);
    };

    Tool.prototype.__registerEvents(
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

    return Tool;

});