define(['controller', 'dictionary', 'utils'],
function (Controller, Dictionary, utils) {

	SceneController.prototype = Object.create(Controller.prototype);
	SceneController.prototype.constructor = SceneController;
	function SceneController(engine) {
	    Controller.call(this, engine);
	    this.__entityFactory = null;
	    this.__scene = null;
	    this.__scenes = new Dictionary('scene');
	};
    // private methods
	SceneController.prototype.__oninit = function () {
	    Controller.prototype.__oninit.call(this);
	    this.__entityFactory = this.__engine.getFactory('entity-factory');
	};
	SceneController.prototype.__onload = function () {
	    Controller.prototype.__onload.call(this);
	    if (this.__scene) {
	        this.__updateEntityContainerSubscriptions('add');
	        this.__scene.load();
	    }
	};
	SceneController.prototype.__onunload = function () {
	    Controller.prototype.__onunload.call(this);
	    if (this.__scene) {
	        this.__updateEntityContainerSubscriptions('remove');
	        this.__scene.unload();
	    }
	};
	SceneController.prototype.__updateEntityContainerSubscriptions = function (actionString) {
	    // keyboard events
	    this.__entityFactory.getContainer()[`${actionString}EventListener`]('onadd', this.__scene, this.__scene.add);
	    this.__entityFactory.getContainer()[`${actionString}EventListener`]('onremove', this.__scene, this.__scene.remove);
	};
    // public methods
	SceneController.prototype.setScene = function (sceneString) {
	    utils.validator.validateClassType(this, sceneString, 'scene');
	    if (this.__scene) {
	        this.__updateEntityContainerSubscriptions('remove');
	        this.__scene.unload();
	    }
	    this.__scene = this.__scenes.get(sceneString);
	    if (!this.__scene) {
	        var SceneType = utils.modules.require(sceneString);
	        this.__scene = new SceneType(this.__engine);
	        this.__scenes.add(sceneString, this.__scene);
	    }
	    if (this.isLoaded) {
	        this.__updateEntityContainerSubscriptions('add');
	        this.__scene.load();
	    }
	};

    return SceneController
});