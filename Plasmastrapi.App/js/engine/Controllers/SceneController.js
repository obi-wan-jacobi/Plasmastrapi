define(['controller', 'scene', 'dictionary', 'utils'],
function (Controller, Scene, Dictionary, utils) {

	// CLASS SceneController
	SceneController.prototype = Object.create(Controller.prototype);
	SceneController.prototype.constructor = SceneController;
	function SceneController(engine) {
	    Controller.call(this, engine);
	    this.__entityFactory = this.__engine.getFactory('entity-factory');
	    this.__scene = null;
	    this.__scenes = new Dictionary(Scene);
	};
	SceneController.prototype.__updateEntityContainerSubscriptions = function (actionString) {
	    // keyboard events
	    this.__entityFactory.getContainer()[`${actionString}EventListener`]('onadd', this.__scene, this.__scene.add);
	    this.__entityFactory.getContainer()[`${actionString}EventListener`]('onremove', this.__scene, this.__scene.remove);
	};
	SceneController.prototype.__onload = function () {
	    if (this.__scene) {
	        this.__updateEntityContainerSubscriptions('add');
	        this.__scene.load();
	    }
	};
	SceneController.prototype.__onunload = function () {
	    if (this.__scene) {
	        this.__updateEntityContainerSubscriptions('remove');
	        this.__scene.unload();
	    }
	};
	SceneController.prototype.setScene = function (sceneString) {
	    var SceneType = utils.modules.require(sceneString);
	    utils.validator.validateClassType(this, SceneType, Scene);
	    if (this.__scene) {
	        this.__updateEntityContainerSubscriptions('remove');
	        this.__scene.unload();
	    }
	    this.__scene = this.__scenes.get(SceneType);
	    if (!this.__scene) {
	        this.__scene = new SceneType(this.__engine);
	        this.__scenes.add(SceneType, this.__scene);
	    }
	    if (this.isLoaded) {
	        this.__updateEntityContainerSubscriptions('add');
	        this.__scene.load();
	    }
	};

    return SceneController
});