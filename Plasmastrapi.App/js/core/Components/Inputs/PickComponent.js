define(['component'],
function (Component) {

	// CLASS PickComponent
	PickComponent.prototype = Object.create(Component.prototype);
	PickComponent.prototype.constructor = PickComponent;
    function PickComponent(pickHandle) {
		// inherits from
        Component.call(this, pickHandle);
        // events
		this.registerEvents(
            'onpick',
            'onselect',
            'ondeselect',
            'onmouseenter',
            'onhover',
            'onmouseleave',
            'ondrag'
        );
        // inject event callbacks into handle
        this.__attachEventTriggerToHandleMethod('pick', 'onpick');
        this.__attachEventTriggerToHandleMethod('select', 'onselect');
        this.__attachEventTriggerToHandleMethod('deselect', 'ondeselect');
        this.__attachEventTriggerToHandleMethod('mouseenter', 'onmouseenter');
        this.__attachEventTriggerToHandleMethod('hover', 'onhover');
        this.__attachEventTriggerToHandleMethod('mouseleave', 'onmouseleave');
        this.__attachEventTriggerToHandleMethod('drag', 'ondrag');
    };
    // private methods
    PickComponent.prototype.__onunload = function () {
        this.__handle.reset();
    };
    PickComponent.prototype.__ondisable = function () {
        this.__handle.reset();
    };

	return PickComponent;
});