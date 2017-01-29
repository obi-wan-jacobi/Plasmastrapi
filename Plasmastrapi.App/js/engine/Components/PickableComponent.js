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
    PickableComponent.prototype.__onload = function () {
        this.enable();
    };
    PickableComponent.prototype.__onunload = function () {
        this.disable();
    };
    PickableComponent.prototype.__checkPointCollision = function (cursor) {
        var meshComponent = this.__entity.getComponent(MeshComponent);
        if (!meshComponent) {
            throw new Error(this.constructor.name + ':pick - ' + this.__entity.constructor.name + ' does not contain a MeshComponent.');
        }
        return meshComponent.checkPointCollision(cursor);
    };
    PickableComponent.prototype.__pick_onmousedown = function (cursor) {
        if (this.__checkPointCollision(cursor)) {
            this.__fire('onmousedown', this.__entity);
        }
    };
    PickableComponent.prototype.__pick_onmouseup = function (cursor) {
        if (this.__checkPointCollision(cursor)) {
            this.__fire('onmouseup', this.__entity);
        }
    };
    PickableComponent.prototype.__pick_onclick = function (cursor) {
        if (this.__checkPointCollision(cursor)) {
            this.__fire('onclick', this.__entity);
        }
    };
	PickableComponent.prototype.__onmousemove = function(cursor) {
	    if (this.__checkPointCollision(cursor)) {
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
	PickableComponent.prototype.injectEntity = function (entity) {
	    Component.prototype.injectEntity.call(this, entity);
	    this.__engine.pickablesContainer.add(this);
	};
	PickableComponent.prototype.enable = function() {
		if (!this.__isEnabled) {
		    this.__isEnabled = true;
		    this.__engine.inputSystem.addEventListener('onmousemove', this, this.__$onmousemove);
		    this.__engine.inputSystem.addEventListener('onmousedown', this, this.__pick_onmousedown);
		    this.__engine.inputSystem.addEventListener('onmouseup', this, this.__pick_onmouseup);
		    this.__engine.inputSystem.addEventListener('onclick', this, this.__pick_onclick);
		    this.__fire('onenable');
		}
	};
	PickableComponent.prototype.disable = function() {
		if (this.__isEnabled) {
		    this.__isEnabled = false;
		    this.__engine.inputSystem.removeEventListener('onmousemove', this, this.__$onmousemove);
		    this.__engine.inputSystem.removeEventListener('onmousedown', this, this.__pick_onmousedown);
		    this.__engine.inputSystem.removeEventListener('onmouseup', this, this.__pick_onmouseup);
		    this.__engine.inputSystem.removeEventListener('onclick', this, this.__pick_onclick);
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