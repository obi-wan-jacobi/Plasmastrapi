define(['controller', 'utils'],
function (Controller, utils) {

    RevisionController.prototype = Object.create(Controller.prototype);
    RevisionController.prototype.constructor = RevisionController;
    function RevisionController(engine) {
        Controller.call(this, engine);
    };

    return RevisionController;
});