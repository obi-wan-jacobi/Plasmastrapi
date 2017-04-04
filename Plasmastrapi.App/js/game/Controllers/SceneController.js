define(["../../engine/Objects/Controller", "../../engine/Objects/Entity", "../Scenes/CircuitDesignScene"],
function (Controller, Entity, CircuitDesignScene) {

	// CLASS SceneController
	SceneController.prototype = Object.create(Controller.prototype);
	SceneController.prototype.constructor = SceneController;
	function SceneController() {
	    Controller.call(this);
	    this.__scene = null;
	};
	SceneController.prototype.__oninit = function () {
	    this.mainMenuScene = new MainMenuScene(this.__engine.canvas);
	    this.mainMenuScene.injectEngine(this.__engine);
	    this.circuitDesignScene = new CircuitDesignScene(this.__engine.canvas)
	    this.circuitDesignScene.injectEngine(this.__engine);
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
    SceneController.prototype.setMainMenuScene = function () {
        this.__setCurrentScene(this.mainMenuScene);
    };
    SceneController.prototype.setCircuitDesignScene = function () {
        this.__setCurrentScene(this.circuitDesignScene);
    };

    return SceneController
});