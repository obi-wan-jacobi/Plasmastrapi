define(["../../engine/Objects/EventEmitter"], function(EventEmitter) {

    InputHandle.prototype = Object.create(EventEmitter.prototype);
    InputHandle.prototype.constructor = InputHandle;
    function InputHandle() {
        EventEmitter.call(this);
        // apply mixins
        EventEmitter.Mixins.Loadable.call(this);
        this.registerEvents(
            'onmousemove',
		    'onmousedown',
		    'onmouseup',
		    'onclick',
            'onkeydown',
		    'onkeyup'
        );
    };
    // private methods
    InputHandle.prototype.__onload = function () {
        this.__engine.inputSystem.addEventListener('onmousemove', this, this.__$onmousemove);
        this.__engine.inputSystem.addEventListener('onmousedown', this, this.__$onmousedown);
        this.__engine.inputSystem.addEventListener('onmouseup', this, this.__$onmouseup);
        this.__engine.inputSystem.addEventListener('onclick', this, this.__$onclick);
        this.__engine.inputSystem.addEventListener('onkeyup', this, this.__$onkeyup);
        this.__engine.inputSystem.addEventListener('onkeydown', this, this.__$onkeydown);
    };
    InputHandle.prototype.__onunload = function () {
        this.__engine.inputSystem.removeEventListener('onmousemove', this, this.__$onmousemove);
        this.__engine.inputSystem.removeEventListener('onmousedown', this, this.__$onmousedown);
        this.__engine.inputSystem.removeEventListener('onmouseup', this, this.__$onmouseup);
        this.__engine.inputSystem.removeEventListener('onclick', this, this.__$onclick);
        this.__engine.inputSystem.removeEventListener('onkeyup', this, this.__$onkeyup);
        this.__engine.inputSystem.removeEventListener('onkeydown', this, this.__$onkeydown);
    };

    return InputHandle;
});