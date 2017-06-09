define(['component', 'mesh-component'],
function (Component, MeshComponent) {

	// CLASS PickComponent
	PickComponent.prototype = Object.create(Component.prototype);
	PickComponent.prototype.constructor = PickComponent;
    function PickComponent(pickHandle) {
		// inherits from
		Component.call(this, pickHandle);
		// private variables
		this.__isEnabled = false;
		this.__isHovered = false;
		this.__isSelected = false;
        // events
		this.__registerEvents(
            'onenable',
            'ondisable',
            'onpick',
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
    PickComponent.prototype.__onload = function () {
        this.enable();
    };
    PickComponent.prototype.__onunload = function () {
        this.disable();
    };
    PickComponent.prototype.__checkPointCollision = function (cursor) {
        var meshComponent = this.__entity.getComponent(MeshComponent);
        if (!meshComponent) {
            throw new Error(this.constructor.name + ':pick - ' + this.__entity.constructor.name + ' does not contain a MeshComponent.');
        }
        return meshComponent.checkPointCollision(cursor);
    };
    PickComponent.prototype.__pick_onmousedown = function (cursor) {
        if (this.__checkPointCollision(cursor)) {
            this.__fire('onmousedown', this.__entity);
        }
    };
    PickComponent.prototype.__pick_onmouseup = function (cursor) {
        if (this.__checkPointCollision(cursor)) {
            this.__fire('onmouseup', this.__entity);
        }
    };
    PickComponent.prototype.__pick_onclick = function (cursor) {
        if (this.__checkPointCollision(cursor)) {
            this.__fire('onclick', this.__entity);
        }
    };
	PickComponent.prototype.__onmousemove = function(cursor) {
	    if (this.__checkPointCollision(cursor)) {
	        this.__hover();
	    } else {
	        this.__unhover();
	    }
	};
	PickComponent.prototype.__hover = function() {
		if (!this.__isHovered) {
			this.__isHovered = true;
			this.__fire('onmouseenter');
		}
		this.__fire('onmousehover');
	};
	PickComponent.prototype.__unhover = function() {
		if (this.__isHovered) {
			this.__isHovered = false;
			this.__fire('onmouseleave');
		}
	};
	PickComponent.prototype.__ondestroy = function () {
	    this.__engine.pickablesContainer.remove(this);
	};
	// public prototypal variables
	Object.defineProperties(PickComponent.prototype, {
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
	PickComponent.prototype.injectEntity = function (entity) {
	    Component.prototype.injectEntity.call(this, entity);
	    this.__engine.pickablesContainer.add(this);
	};
	PickComponent.prototype.enable = function() {
		if (!this.__isEnabled) {
		    this.__isEnabled = true;
		    this.__engine.inputSystem.addEventListener('onmousemove', this, this.__$onmousemove);
		    this.__engine.inputSystem.addEventListener('onmousedown', this, this.__pick_onmousedown);
		    this.__engine.inputSystem.addEventListener('onmouseup', this, this.__pick_onmouseup);
		    this.__engine.inputSystem.addEventListener('onclick', this, this.__pick_onclick);
		    this.__fire('onenable');
		}
	};
	PickComponent.prototype.disable = function() {
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
	PickComponent.prototype.pick = function () {
	    this.__fire('onpick');
	};
	PickComponent.prototype.select = function() {
		if (!this.__isSelected) {
			this.__isSelected = true;
			this.__fire('onselect');
		}
	};
	PickComponent.prototype.deselect = function() {
		if (this.__isSelected) {
			this.__isSelected = false;
			this.__fire('ondeselect');
		}
	};

	return PickComponent;
});