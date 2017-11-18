define(['ko', 'root', 'ko-component-model', 'game'],
function (ko, root, KOComponentModel, Game) {

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
        root.game = new Game(this.__viewport);
        root.game.start();
    };

    return new ViewportContainerModel();
});