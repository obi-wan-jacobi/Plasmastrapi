define(['base', 'container', 'entity', 'ui-element-factory', 'validator'],
function (Base, Container, Entity, UIElementFactory, validator) {

    // CLASS Scene
    Scene.prototype = Object.create(Base.prototype);
    Scene.prototype.constructor = Scene;
    function Scene(engine) {
        // inherits from
        Base.call(this);
		// private variables
        this.__entities = new Container(Entity);
        this.__uiElementFactory = engine.getFactory(UIElementFactory);
    };
    // private methods
    Scene.prototype.__oninit = function () { };
    Scene.prototype.__onload = function () {
        this.__entities.forEach(function (entity) {
            entity.load();
        });
    };
    Scene.prototype.__onunload = function () {
        this.__entities.forEach(function (entity) {
            entity.unload();
        });
    };
    // public methods
    Scene.prototype.add = function (entity) {
        this.__entities.add(entity);
        entity.addEventListener('ondestroy', this, this.remove);
	    if (this.isLoaded) {
	        entity.load();
	    }
	};
	Scene.prototype.remove = function (entity) {
	    var removedEntity = this.__entities.remove(entity);
	    if (removedEntity.isLoaded) {
	        removedEntity.unload();
	    }
	};

	return Scene;
});