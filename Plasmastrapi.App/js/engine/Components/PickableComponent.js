define(["../Objects/Component", "./MeshComponent"], function (Component, MeshComponent) {

	// CLASS PickableComponent
	PickableComponent.prototype = Object.create(Component.prototype);
	PickableComponent.prototype.constructor = PickableComponent;
    function PickableComponent() {
		// inherits from
		Component.call(this);
		// private variables
		this.__isEnabled = false;
		this.__isHovered = false;
		this.__isSelected = false;
        // events
		this.__registerEvents(
            'onenable',
            'ondisable',
            'onselect',
            'ondeselect',
            'onmouseenter',
            'onmousehover',
            'onmouseleave',
            'onmousemove',
            'onmousedown',
            'onmouseup',
            'onclick'
        );
	};
	// private methods
	PickableComponent.prototype.__onmousemove = function(cursor) {
		var meshComponent = this.__entity.getComponent(MeshComponent);
		if (!meshComponent) {
			throw new Error(this.constructor.name + ':pick - ' + this.__entity.constructor.name + ' does not contain a MeshComponent.');
		}
		if (meshComponent.checkPointCollision(cursor)) {
			this.__hover(); 
		} else {
			this.__unhover();
		}
	};
	PickableComponent.prototype.__hover = function() {
		if (!this.__isHovered) {
			this.__isHovered = true;
			this.__fire('onmouseenter');
		}
		this.__fire('onmousehover');
	};
	PickableComponent.prototype.__unhover = function() {
		if (this.__isHovered) {
			this.__isHovered = false;
			this.__fire('onmouseleave');
		}
	};
	// public prototypal variables
	Object.defineProperties(PickableComponent.prototype, {
		'isEnabled': {
			get: function() {
				return this.__isEnabled;
			}
		},
		'isSelected': {
			get: function() {
				return this.__isSelected;
			}
		},
		'isHovered': {
			get: function() {
				return this.__isHovered;
			}
		}
	});
	// public methods
	PickableComponent.prototype.enable = function() {
		if (!this.__isEnabled) {
		    this.__isEnabled = true;
		    this.__engine.inputSystem.addEventListener('onmousemove', this, this.__$onmousemove);
		    this.__engine.inputSystem.addEventListener('onmousedown', this, this.__$onmousedown);
		    this.__engine.inputSystem.addEventListener('onmouseup', this, this.__$onmouseup);
		    this.__engine.inputSystem.addEventListener('onclick', this, this.__$onclick);
		    this.__fire('onenable');
		}
	};
	PickableComponent.prototype.disable = function() {
		if (this.__isEnabled) {
		    this.__isEnabled = false;
		    this.__engine.inputSystem.removeEventListener('onmousemove', this, this.__$onmousemove);
		    this.__engine.inputSystem.removeEventListener('onmousedown', this, this.__$onmousedown);
		    this.__engine.inputSystem.removeEventListener('onmouseup', this, this.__$onmouseup);
		    this.__engine.inputSystem.removeEventListener('onclick', this, this.__$onclick);
			this.__unhover();
			this.__fire('ondisable');
		}
	};
	PickableComponent.prototype.select = function() {
		if (!this.__isSelected) {
			this.__isSelected = true;
			this.__fire('onselect');
		}
	};
	PickableComponent.prototype.deselect = function() {
		if (this.__isSelected) {
			this.__isSelected = false;
			this.__fire('ondeselect');
		}
	};

	return PickableComponent;
});