define(['controller', 'entity'],
function (Controller, Entity) {

	// CLASS SceneController
	SceneController.prototype = Object.create(Controller.prototype);
	SceneController.prototype.constructor = SceneController;
	function SceneController() {
	    Controller.call(this);
	    this.__scene = null;
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

    return SceneController
});