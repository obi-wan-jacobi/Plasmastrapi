define(['base', 'dictionary', 'entity', 'validator'],
function (Base, Dictionary, Entity, validator) {

    // CLASS Scene
    Scene.prototype = Object.create(Base.prototype);
    Scene.prototype.constructor = Scene;
    function Scene() {
        // inherits from
        Base.call(this);
		// private variables
        this.__entities = new Dictionary(Entity);
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
        entity.addEventListener('ondestroy', this.remove.bind(this));
	    if (this.__isLoaded) {
	        entity.load();
	    }
	};
	Scene.prototype.remove = function (entity) {
	    var removedElement = this.__entities.remove(entity);
	    if (removedElement.isLoaded) {
	        removedElement.unload();
	    }
	};

	return Scene;
});