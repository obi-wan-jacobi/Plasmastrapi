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
        this.addEventListener('onload', this, this.__onload);
        this.addEventListener('onload', this, this.__onunload);
        this.addEventListener('onframe', this, this.__onframe);
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
    PickableComponent.prototype.__onmouseenter = function (entity) {
         this.__mouseenter.push(entity);
    };
    PickableComponent.prototype.__onmousehover = function (entity) {
        this.__mousehover.push(entity);
    };
    PickableComponent.prototype.__onmouseleave = function (entity) {
        this.__mouseleave.push(entity);
    };
    PickableComponent.prototype.__onmousemove = function (entity) {
        this.__mousemove.push(entity);
    };
    PickableComponent.prototype.__onmousedown = function (entity) {
        this.__mousedown.push(entity);
    };
    PickableComponent.prototype.__onmouseup = function (entity) {
        this.__mouseup.push(entity);
    };
    PickableComponent.prototype.__onclick = function (entity) {
        this.__click.push(entity);
    };
    PickSystem.prototype.__watch = function (entity) {
        entity.addEventListener('onmouseenter', this.__onmouseenter);
        entity.addEventListener('onmousehover', this.__onmousehover);
        entity.addEventListener('onmouseleave', this.__onmouseleave);
        entity.addEventListener('onmousemove', this.__onmousemove);
        entity.addEventListener('onmousedown', this.__onmousedown);
        entity.addEventListener('onmouseup', this.__onmouseup);
        entity.addEventListener('onclick', this.__onclick);
    };
    PickSystem.prototype.__unwatch = function (entity) {
        entity.removeEventListener('onmouseenter', this.__onmouseenter);
        entity.removeEventListener('onmousehover', this.__onmousehover);
        entity.removeEventListener('onmouseleave', this.__onmouseleave);
        entity.removeEventListener('onmousemove', this.__onmousemove);
        entity.removeEventListener('onmousedown', this.__onmousedown);
        entity.removeEventListener('onmouseup', this.__onmouseup);
        entity.removeEventListener('onclick', this.__onclick);
    };

    PickSystem.prototype.__registerEvents(
        'onmouseenter',
		'onmousehover',
		'onmouseleave',
        'onmousemove',
		'onmousedown',
		'onmouseup',
		'onclick'
    );

    return PickSystem;
});