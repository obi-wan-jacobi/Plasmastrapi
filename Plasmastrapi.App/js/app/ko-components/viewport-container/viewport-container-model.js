define(['ko', 'root', 'ko-component-model', 'game', 'validator'],
function (ko, root, KOComponentModel, Game, validator) {

    ViewportContainerModel.prototype = Object.create(KOComponentModel.prototype);
    ViewportContainerModel.prototype.constructor = ViewportContainerModel;
    function ViewportContainerModel() {
        KOComponentModel.call(this);
        this.__viewport = null;
    };
    ViewportContainerModel.prototype.setViewport = function (viewport) {
        this.__viewport = viewport;
    };
    ViewportContainerModel.prototype.start = function () {
        try {
            root.game = new Game(this.__viewport);
            root.game.start();
        } catch (ex) {
            validator.throw(this, 'start', ex.message);
        }
    };

    return new ViewportContainerModel();
});