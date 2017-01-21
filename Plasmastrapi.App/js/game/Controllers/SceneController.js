define(["../Objects/Controller", "../Objects/Scene", "../../engine/Objects/Entity"], function (Controller, Scene, Entity) {

	// CLASS SceneController
	SceneController.prototype = Object.create(Controller.prototype);
	SceneController.prototype.constructor = SceneController;
	function SceneController(entityRepository) {
		Controller.call(this);
		this.__scene = null;
		this.addEventListener('onload', this, this.__onload);
		this.addEventListener('onunload', this, this.__onunload);
	};
	SceneController.prototype.__validateSceneIsLoaded = function() {
		if (!this.__scene) {
			throw new Error(this.constructor.name + ':validateSceneIsLoaded - No scene has been loaded.')
		}
	};
	SceneController.prototype.__onload = function() {
		if (this.__scene) {
			this.__scene.load();
		}
		this.__engine.entityRepository.addEventListener('onadd', this, this.addToCurrentScene);
	};
	SceneController.prototype.__onunload = function() {
		if (this.__scene) {
			this.__scene.unload();
		}
		this.__engine.entityRepository.removeEventListener('onadd', this, this.addToCurrentScene);
	};
	// public methods
	SceneController.prototype.setCurrentScene = function(scene) {
	    if (!(scene instanceof Scene)) {
	        throw new Error(this.constructor.name + ":setCurrentScene - " + scene.constructor.name + " is not an instance of Scene!");
	    }
	    if (this.__scene) {
			this.__scene.unload();
		}
		this.__scene = scene;
		this.__scene.load();
	};
	SceneController.prototype.addToCurrentScene = function (entity) {
	    if (!(entity instanceof Entity)) {
	        throw new Error(this.constructor.name + ":addToCurrentScene " + entity.constructor.name + " is not an instance of Entity!");
	    }
		this.__validateSceneIsLoaded();
		this.__scene.add(entity);
	};
	SceneController.prototype.removeFromCurrentScene = function(entity) {
		this.__validateSceneIsLoaded();
		this.__scene.remove(entity);
	};

	return SceneController
});