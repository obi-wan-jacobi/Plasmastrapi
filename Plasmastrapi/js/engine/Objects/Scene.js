define(['entity', 'dictionary'],
function (Entity, Dictionary) {

    // CLASS Scene
	function Scene() {
		// private variables
        this.__entities = new Dictionary(Entity);
        this.__isInitialized = false;
        this.__isLoaded = false;
	};
    // public methods
    Scene.prototype.load = function () {
        if (this.__isLoaded) {
            return;
        }
        this.__isLoaded = true;
        if (!this.__isInitialized) {
            this.__isInitialized = true;
            this.__init();
        }
        this.__entities.forEach(function (entity) {
            entity.load();
        });
    };
    Scene.prototype.unload = function () {
        if (!this.__isLoaded) {
            return;
        }
        this.__entities.forEach(function (entity) {
            entity.unload();
        });
    };
    Controller.prototype.reload = function () {
        this.unload();
        this.load();
    };
    Scene.prototype.add = function (entity) {
	    this.__entities.add(entity);
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