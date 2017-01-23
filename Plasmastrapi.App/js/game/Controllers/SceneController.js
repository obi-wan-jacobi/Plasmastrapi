define(["../../engine/Objects/Controller", "../../engine/Objects/Entity",
        "../Scenes/CircuitDesignScene"],
    function (Controller, Entity, CircuitDesignScene) {

	// CLASS SceneController
	SceneController.prototype = Object.create(Controller.prototype);
	SceneController.prototype.constructor = SceneController;
	function SceneController() {
	    Controller.call(this);
	    this.__scene = null;
		this.__scenes = {
		    CircuitDesignScene: new CircuitDesignScene()
		};
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
	    this.__scene.load();
	};
    // public methods
	SceneController.prototype.injectEngine = function (engine) {
        Controller.prototype.injectEngine.call(this, engine)
	    this.__scenes.CircuitDesignScene.injectEngine(this.__engine);
	};
	SceneController.prototype.setCircuitDesignScene = function (entity) {
	    this.__setCurrentScene(this.__scenes.CircuitDesignScene);
	};

	return SceneController
});