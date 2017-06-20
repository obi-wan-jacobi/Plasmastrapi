define([
    // Base
    'controller',
    // Objects
    'entity',
    // UI
    'main-menu-scene',
    'circuit-design-scene'
],
function (Controller, Entity, MainMenuScene, CircuitDesignScene) {

	// CLASS SceneController
	SceneController.prototype = Object.create(Controller.prototype);
	SceneController.prototype.constructor = SceneController;
	function SceneController() {
	    Controller.call(this);
	    this.__scene = null;
	};
	SceneController.prototype.__init = function () {
	    this.mainMenuScene = new MainMenuScene(this.__engine.canvas);
	    this.mainMenuScene.injectEngine(this.__engine);
	    this.circuitDesignScene = new CircuitDesignScene(this.__engine.canvas)
	    this.circuitDesignScene.injectEngine(this.__engine);
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
    SceneController.prototype.load = function () {
        Controller.prototype.load.call(this);
        if (this.__isLoaded) {
            return;
        }
        if (this.__scene) {
            this.__scene.load();
        }
    };
    SceneController.prototype.unload = function () {
        Controller.prototype.unload.call(this);
        if (!this.__isLoaded) {
            return;
        }
        if (this.__scene) {
            this.__scene.unload();
        }
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