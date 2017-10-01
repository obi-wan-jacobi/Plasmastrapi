define(['controller', 'Scene', 'validator'],
function (Controller, Scene, validator) {

	// CLASS SceneController
	SceneController.prototype = Object.create(Controller.prototype);
	SceneController.prototype.constructor = SceneController;
	function SceneController() {
	    Controller.call(this);
	    this.__scene = null;
	};
	SceneController.prototype.setScene = function (scene) {
	    validator.validateInstanceType(this, scene, Scene);
	    if (this.__scene) {
	        this.__scene.unload();
	    }
	    this.__scene = scene;
	    this.__scene.load();
	};

    return SceneController
});