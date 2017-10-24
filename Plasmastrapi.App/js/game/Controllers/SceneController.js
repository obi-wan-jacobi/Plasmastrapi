define(['controller', 'scene', 'entity-factory', 'validator'],
function (Controller, Scene, EntityFactory, validator) {

	// CLASS SceneController
	SceneController.prototype = Object.create(Controller.prototype);
	SceneController.prototype.constructor = SceneController;
	function SceneController(engine) {
	    Controller.call(this, engine);
	    this.__entityFactory = engine.getFactory(EntityFactory);
	    this.__scene = null;
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
	SceneController.prototype.setScene = function (SceneType) {
	    validator.validateClassType(this, SceneType, Scene);
	    var scene = new SceneType(this.__engine);
	    if (this.__scene) {
	        this.__updateEntityContainerSubscriptions('remove');
	        this.__scene.unload();
	    }
	    this.__scene = scene;
	    if (this.isLoaded) {
	        this.__updateEntityContainerSubscriptions('add');
	        this.__scene.load();
	    }
	};

    return SceneController
});