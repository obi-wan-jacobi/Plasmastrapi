define(["../Objects/System", "../Components/PickableComponent"], function (System, PickableComponent) {

    // CLASS InputSystem
    PickSystem.prototype = Object.create(System.prototype);
    PickSystem.prototype.constructor = PickSystem;
    function PickSystem() {
        System.call(this);
        this.__mouseenter = [];
        this.__mousehover = [];
        this.__mouseleave = [];
        this.__mousemove = [];
        this.__mouseup = [];
        this.__mousedown = [];
        this.__click = [];
        this.__registerEvents(
            'onmouseenter',
		    'onmousehover',
		    'onmouseleave',
            'onmousemove',
		    'onmousedown',
		    'onmouseup',
		    'onclick'
        );
    };
    PickSystem.prototype.__onload = function () {
        this.__engine.entityContainer.addEventListener('onadd', this, this.__watch);
        this.__engine.entityContainer.addEventListener('onremove', this, this.__unwatch);
    };
    PickSystem.prototype.__onunload = function () {
        this.__engine.entityContainer.removeEventListener('onadd', this, this.__watch);
        this.__engine.entityContainer.removeEventListener('onremove', this, this.__unwatch);
        this.__mouseenter = [];
        this.__mousehover = [];
        this.__mouseleave = [];
        this.__mousemove = [];
        this.__mouseup = [];
        this.__mousedown = [];
        this.__click = [];
    };
    PickSystem.prototype.__onframe = function () {
        this.__fire('onmouseenter', this.__mouseenter);
        this.__fire('onmousehover', this.__mousehover);
        this.__fire('onmouseleave', this.__mouseleave);
        this.__fire('onmousemove', this.__mousemove);
        this.__fire('onmousedown', this.__mousedown);
        this.__fire('onmouseup', this.__mouseup);
        this.__fire('onclick', this.__click);
        this.__mouseenter = [];
        this.__mousehover = [];
        this.__mouseleave = [];
        this.__mousemove = [];
        this.__mouseup = [];
        this.__mousedown = [];
        this.__click = [];
    };
    PickSystem.prototype.__onmouseenter = function (entity) {
         this.__mouseenter.push(entity);
    };
    PickSystem.prototype.__onmousehover = function (entity) {
        this.__mousehover.push(entity);
    };
    PickSystem.prototype.__onmouseleave = function (entity) {
        this.__mouseleave.push(entity);
    };
    PickSystem.prototype.__onmousemove = function (entity) {
        this.__mousemove.push(entity);
    };
    PickSystem.prototype.__onmousedown = function (entity) {
        this.__mousedown.push(entity);
    };
    PickSystem.prototype.__onmouseup = function (entity) {
        this.__mouseup.push(entity);
    };
    PickSystem.prototype.__onclick = function (entity) {
        this.__click.push(entity);
    };
    PickSystem.prototype.__watch = function (entity) {
        var pickableComponent = entity.getComponent(PickableComponent);
        pickableComponent.addEventListener('onmouseenter', this, this.__$onmouseenter);
        pickableComponent.addEventListener('onmousehover', this, this.__$onmousehover);
        pickableComponent.addEventListener('onmouseleave', this, this.__$onmouseleave);
        pickableComponent.addEventListener('onmousemove', this, this.__$onmousemove);
        pickableComponent.addEventListener('onmousedown', this, this.__$onmousedown);
        pickableComponent.addEventListener('onmouseup', this, this.__$onmouseup);
        pickableComponent.addEventListener('onclick', this, this.__$onclick);
    };
    PickSystem.prototype.__unwatch = function (entity) {
        var pickableComponent = entity.getComponent(PickableComponent);
        pickableComponent.removeEventListener('onmouseenter', this, this.__$onmouseenter);
        pickableComponent.removeEventListener('onmousehover', this, this.__$onmousehover);
        pickableComponent.removeEventListener('onmouseleave', this, this.__$onmouseleave);
        pickableComponent.removeEventListener('onmousemove', this, this.__$onmousemove);
        pickableComponent.removeEventListener('onmousedown', this, this.__$onmousedown);
        pickableComponent.removeEventListener('onmouseup', this, this.__$onmouseup);
        pickableComponent.removeEventListener('onclick', this, this.__$onclick);
    };

    return PickSystem;
});