define(['component', 'mouse-component'],
    function (Component, MouseComponent) {

	// CLASS PickComponent
	PickComponent.prototype = Object.create(Component.prototype);
	PickComponent.prototype.constructor = PickComponent;
    function PickComponent(pickHandle) {
		// inherits from
        Component.call(this, pickHandle, PickHandle);
        // events
		this.registerEvents(
            'onpick',
            'onselect',
            'ondeselect',
            'onmouseenter',
            'onmousehover',
            'onmouseleave',
        );
        // inject event callbacks into handle
        this.__attachEventTriggerToHandleMethod('pick', 'onpick');
        this.__attachEventTriggerToHandleMethod('select', 'onselect');
        this.__attachEventTriggerToHandleMethod('deselect', 'ondeselect');
        this.__attachEventTriggerToHandleMethod('mouseenter', 'onmouseenter');
        this.__attachEventTriggerToHandleMethod('hover', 'onhover');
        this.__attachEventTriggerToHandleMethod('mouseleave', 'onmouseleave');
    };
    // private methods
    PickComponent.prototype.__ondisable = function () {
        this.__handle.deselect();
        this.__handle.unhover();
    };

	return PickComponent;
});