define(["../Objects/System", "../Components/PickableComponent"], function (System, PickableComponent) {

    // CLASS InputSystem
    PickSystem.prototype = Object.create(System.prototype);
    PickSystem.prototype.constructor = PickSystem;
    function PickSystem() {
        System.call(this);
        this.__list_mouseenter = [];
        this.__list_mousehover = [];
        this.__list_mouseleave = [];
        this.__list_mousemove = [];
        this.__list_mouseup = [];
        this.__list_mousedown = [];
        this.__list_click = [];
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
        this.__list_mouseenter = [];
        this.__list_mousehover = [];
        this.__list_mouseleave = [];
        this.__list_mousemove = [];
        this.__list_mouseup = [];
        this.__list_mousedown = [];
        this.__list_click = [];
    };
    PickSystem.prototype.__onframe = function () {
        this.__fire('onmouseenter', this.__list_mouseenter);
        this.__fire('onmousehover', this.__list_mousehover);
        this.__fire('onmouseleave', this.__list_mouseleave);
        this.__fire('onmousemove', this.__list_mousemove);
        this.__fire('onmousedown', this.__list_mousedown);
        this.__fire('onmouseup', this.__list_mouseup);
        this.__fire('onclick', this.__list_click);
        this.__list_mouseenter = [];
        this.__list_mousehover = [];
        this.__list_mouseleave = [];
        this.__list_mousemove = [];
        this.__list_mouseup = [];
        this.__list_mousedown = [];
        this.__list_click = [];
    };
    PickSystem.prototype.__onmouseenter = function (entity) {
        this.__list_mouseenter.push(entity);
    };
    PickSystem.prototype.__onmousehover = function (entity) {
        this.__list_mousehover.push(entity);
    };
    PickSystem.prototype.__onmouseleave = function (entity) {
        this.__list_mouseleave.push(entity);
    };
    PickSystem.prototype.__onmousemove = function (entity) {
        this.__list_mousemove.push(entity);
    };
    PickSystem.prototype.__onmousedown = function (entity) {
        this.__list_mousedown.push(entity);
    };
    PickSystem.prototype.__onmouseup = function (entity) {
        this.__list_mouseup.push(entity);
    };
    PickSystem.prototype.__onclick = function (entity) {
        this.__list_click.push(entity);
    };
    PickSystem.prototype.__watch = function (entity) {
        var pickableComponent = entity.getComponent(PickableComponent);
        if (pickableComponent) {
            pickableComponent.addEventListener('onmouseenter', this, this.__$onmouseenter);
            pickableComponent.addEventListener('onmousehover', this, this.__$onmousehover);
            pickableComponent.addEventListener('onmouseleave', this, this.__$onmouseleave);
            pickableComponent.addEventListener('onmousemove', this, this.__$onmousemove);
            pickableComponent.addEventListener('onmousedown', this, this.__$onmousedown);
            pickableComponent.addEventListener('onmouseup', this, this.__$onmouseup);
            pickableComponent.addEventListener('onclick', this, this.__$onclick);
        }
    };
    PickSystem.prototype.__unwatch = function (entity) {
        var pickableComponent = entity.getComponent(PickableComponent);
        if (pickableComponent) {
            pickableComponent.removeEventListener('onmouseenter', this, this.__$onmouseenter);
            pickableComponent.removeEventListener('onmousehover', this, this.__$onmousehover);
            pickableComponent.removeEventListener('onmouseleave', this, this.__$onmouseleave);
            pickableComponent.removeEventListener('onmousemove', this, this.__$onmousemove);
            pickableComponent.removeEventListener('onmousedown', this, this.__$onmousedown);
            pickableComponent.removeEventListener('onmouseup', this, this.__$onmouseup);
            pickableComponent.removeEventListener('onclick', this, this.__$onclick);
        }
    };

    return PickSystem;
});