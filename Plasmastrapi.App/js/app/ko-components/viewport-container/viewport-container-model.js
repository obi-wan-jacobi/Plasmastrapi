define(['ko', 'ko-root', 'ko-component-model', 'game', 'ko-diagnostics-container-model', 'validator'],
function (ko, root, KOComponentModel, Game, diagnosticsContainerModel, validator) {

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
        var promise = root.game.start();
        diagnosticsContainerModel.initDiagnosticsReporting();
        promise.catch(function (error) {
            diagnosticsContainerModel.exception(error);
        });
    };

    return new ViewportContainerModel();
});