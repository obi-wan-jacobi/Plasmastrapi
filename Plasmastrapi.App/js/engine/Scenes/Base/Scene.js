define(['base', 'container', 'validator'],
function (Base, Container, validator) {

    // CLASS Scene
    Scene.prototype = Object.create(Base.prototype);
    Scene.prototype.constructor = Scene;
    function Scene(engine) {
        // inherits from
        Base.call(this);
		// private variables
        this.__entities = new Container('entity');
        this.__engine = engine;
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
	    this.__entities.remove(entity);
        if (entity.isLoaded) {
            entity.unload();
	    }
	};

	return Scene;
});