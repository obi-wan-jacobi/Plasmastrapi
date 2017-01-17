define(["../../engine/Objects/EventEmitter"], function(EventEmitter) {

    Tool.prototype = Object.create(EventEmitter.prototype);
    Tool.prototype.constructor = Tool;
    function Tool() {
        EventEmitter.call(this);
    };
    Tool.prototype.__onmousemove = function (cursor) { };
    Tool.prototype.__onmousedown = function (cursor) { };
    Tool.prototype.__onmouseup = function (cursor) { };
    Tool.prototype.__onclick = function (cursor) { };
    Tool.prototype.__onkeyup = function (keyCode) { };
    Tool.prototype.__onkeydown = function (keyCode) { };
    Tool.prototype.__onmouseenter = function () { };
    Tool.prototype.__onmousehover = function () { };
    Tool.prototype.__onmouseleave = function () { };
    Tool.prototype.compatibleEntityClassesList = [];
    Tool.prototype.equip = function () {
        this.__engine.inputSystem.addEventListener('onmousemove', this, this.__mousemove);
        this.__engine.inputSystem.addEventListener('onmousedown', this, this.__onmousedown);
        this.__engine.inputSystem.addEventListener('onmouseup', this, this.__onmouseup);
        this.__engine.inputSystem.addEventListener('onclick', this, this.__onclick);
        this.__engine.inputSystem.addEventListener('onkeyup', this, this.__onkeyup);
        this.__engine.inputSystem.addEventListener('onkeydown', this, this.__onkeydown);
        this.__engine.inputSystem.addEventListener('onmouseenter', this, this.__onmouseenter);
        this.__engine.inputSystem.addEventListener('onmousehover', this, this.__onmousehover);
        this.__engine.inputSystem.addEventListener('onmouseleave', this, this.__onmouseleave);
    };
    Tool.prototype.discard = function () {
        this.__engine.inputSystem.removeEventListener('onmousemove', this, this.__mousemove);
        this.__engine.inputSystem.removeEventListener('onmousedown', this, this.__onmousedown);
        this.__engine.inputSystem.removeEventListener('onmouseup', this, this.__onmouseup);
        this.__engine.inputSystem.removeEventListener('onclick', this, this.__onclick);
        this.__engine.inputSystem.removeEventListener('onkeyup', this, this.__onkeyup);
        this.__engine.inputSystem.removeEventListener('onkeydown', this, this.__onkeydown);
        this.__engine.inputSystem.removeEventListener('onmouseenter', this, this.__onmouseenter);
        this.__engine.inputSystem.removeEventListener('onmousehover', this, this.__onmousehover);
        this.__engine.inputSystem.removeEventListener('onmouseleave', this, this.__onmouseleave);
    };

    return Tool;

});