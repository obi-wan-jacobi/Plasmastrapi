define(["../Objects/System", "../Components/PickableComponent"], function (System, PickableComponent) {

    // CLASS InputSystem
    PickSystem.prototype = Object.create(System.prototype);
    PickSystem.prototype.constructor = PickSystem;
    function PickSystem() {
        System.call(this);
        this.__queue_mouseenter = [];
        this.__queue_mousehover = [];
        this.__queue_mouseleave = [];
        this.__queue_mousemove = [];
        this.__queue_mouseup = [];
        this.__queue_mousedown = [];
        this.__queue_click = [];
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
        this.__queue_mouseenter = [];
        this.__queue_mousehover = [];
        this.__queue_mouseleave = [];
        this.__queue_mousemove = [];
        this.__queue_mouseup = [];
        this.__queue_mousedown = [];
        this.__queue_click = [];
    };
    PickSystem.prototype.__onframe = function () {
        this.__fire('onmouseenter', this.__queue_mouseenter);
        this.__fire('onmousehover', this.__queue_mousehover);
        this.__fire('onmouseleave', this.__queue_mouseleave);
        this.__fire('onmousemove', this.__queue_mousemove);
        this.__fire('onmousedown', this.__queue_mousedown);
        this.__fire('onmouseup', this.__queue_mouseup);
        this.__fire('onclick', this.__queue_click);
        this.__queue_mouseenter = [];
        this.__queue_mousehover = [];
        this.__queue_mouseleave = [];
        this.__queue_mousemove = [];
        this.__queue_mouseup = [];
        this.__queue_mousedown = [];
        this.__queue_click = [];
    };
    PickSystem.prototype.__enqueue_mouseenter = function (entity) {
        this.__queue_mouseenter.push(entity);
    };
    PickSystem.prototype.__enqueue_mousehover = function (entity) {
        this.__queue_mousehover.push(entity);
    };
    PickSystem.prototype.__enqueue_mouseleave = function (entity) {
        this.__queue_mouseleave.push(entity);
    };
    PickSystem.prototype.__enqueue_mousemove = function (entity) {
        this.__queue_mousemove.push(entity);
    };
    PickSystem.prototype.__enqueue_mousedown = function (entity) {
        this.__queue_mousedown.push(entity);
    };
    PickSystem.prototype.__enqueue_mouseup = function (entity) {
        this.__queue_mouseup.push(entity);
    };
    PickSystem.prototype.__enqueue_click = function (entity) {
        this.__queue_click.push(entity);
    };
    PickSystem.prototype.__watch = function (entity) {
        var pickableComponent = entity.getComponent(PickableComponent);
        pickableComponent.addEventListener('onmouseenter', this, this.__enqueue_mouseenter);
        pickableComponent.addEventListener('onmousehover', this, this.__enqueue_mousehover);
        pickableComponent.addEventListener('onmouseleave', this, this.__enqueue_mouseleave);
        pickableComponent.addEventListener('onmousemove', this, this.__enqueue_mousemove);
        pickableComponent.addEventListener('onmousedown', this, this.__enqueue_mousedown);
        pickableComponent.addEventListener('onmouseup', this, this.__enqueue_mouseup);
        pickableComponent.addEventListener('onclick', this, this.__enqueue_click);
    };
    PickSystem.prototype.__unwatch = function (entity) {
        var pickableComponent = entity.getComponent(PickableComponent);
        pickableComponent.removeEventListener('onmouseenter', this, this.__enqueue_mouseenter);
        pickableComponent.removeEventListener('onmousehover', this, this.__enqueue_mousehover);
        pickableComponent.removeEventListener('onmouseleave', this, this.__enqueue_mouseleave);
        pickableComponent.removeEventListener('onmousemove', this, this.__enqueue_mousemove);
        pickableComponent.removeEventListener('onmousedown', this, this.__enqueue_mousedown);
        pickableComponent.removeEventListener('onmouseup', this, this.__enqueue_mouseup);
        pickableComponent.removeEventListener('onclick', this, this.__enqueue_click);
    };

    return PickSystem;
});