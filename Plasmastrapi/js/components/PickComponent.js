define(['component', 'input-component'],
function (Component, InputComponent) {

	// CLASS PickComponent
	PickComponent.prototype = Object.create(Component.prototype);
	PickComponent.prototype.constructor = PickComponent;
    function PickComponent(pickHandle) {
		// inherits from
		Component.call(this, pickHandle);
		// private variables
		this.__isSelected = false;
        // events
		this.__registerEvents(
            'onpick',
            'onselect',
            'ondeselect'
        );
        // dependencies
        this.__registerComponentDependencyOnLoad(InputComponent, 'onclick', this, this.pick);
    };
    // private methods
    InputComponent.prototype.__ondisable = function () {
        this.deselect();
    };
	// public prototypal variables
	Object.defineProperties(PickComponent.prototype, {
		'isSelected': {
			get: function() {
				return this.__isSelected;
			}
		}
	});
    // public methods
	PickComponent.prototype.pick = function () {
	    this.emit('onpick');
	};
	PickComponent.prototype.select = function() {
		if (!this.__isSelected) {
			this.__isSelected = true;
			this.emit('onselect');
		}
	};
	PickComponent.prototype.deselect = function() {
		if (this.__isSelected) {
			this.__isSelected = false;
			this.emit('ondeselect');
		}
	};

	return PickComponent;
});