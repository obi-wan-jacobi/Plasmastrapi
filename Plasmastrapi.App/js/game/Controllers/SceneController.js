define(["../../engine/Objects/Controller", "../../engine/Objects/Entity", "../Scenes/CircuitDesignScene"],
function (Controller, Entity, CircuitDesignScene) {

	// CLASS SceneController
	SceneController.prototype = Object.create(Controller.prototype);
	SceneController.prototype.constructor = SceneController;
	function SceneController() {
	    Controller.call(this);
	    this.__scene = null;
	    this.__scenes = [];
	};
	SceneController.prototype.__oninit = function () {
	    this.__scenes.circuitDesignScene = this.__scenes[0] = new CircuitDesignScene(this.__engine.canvas)
	    this.__scenes.forEach(function (scene) {
	        scene.injectEngine(this.__engine);
	    }, this);
	};
	SceneController.prototype.__onload = function() {
	    if (this.__scene) {
			this.__scene.load();
		}
	};
	SceneController.prototype.__onunload = function() {
		if (this.__scene) {
			this.__scene.unload();
		}
	};
	SceneController.prototype.__setCurrentScene = function (scene) {
	    if (this.__scene) {
	        this.__scene.unload();
	    }
	    this.__scene = scene;
	    if (this.isLoaded) {
	        this.__scene.load();
	    }
	};
	// public methods
    SceneController.prototype.injectEngine = function (engine) {
        Controller.prototype.injectEngine.call(this, engine);
    };
    SceneController.prototype.addToCurrentScene = function (entity) {
        this.__scene.add(entity);
    };
    // scenes
    SceneController.prototype.setCircuitDesignScene = function (entity) {
        this.__setCurrentScene(this.__scenes.circuitDesignScene);
    };

    return SceneController
});