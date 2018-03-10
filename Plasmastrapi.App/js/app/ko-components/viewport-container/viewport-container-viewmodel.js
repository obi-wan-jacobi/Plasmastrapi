define(['ko-component-viewmodel', 'ko-root', 'game'],
function (KOComponentViewmodel, root, Game) {

    ViewportContainerViewmodel.prototype = Object.create(KOComponentViewmodel.prototype);
    ViewportContainerViewmodel.prototype.constructor = ViewportContainerViewmodel;
    function ViewportContainerViewmodel(modelModuleString) {
        KOComponentViewmodel.call(this, modelModuleString);
        this.__viewport = null;
    };
    Object.defineProperties(ViewportContainerViewmodel.prototype,
        {
            'viewport': {
                get: function () {
                    return this.__viewport;
                }
            }
        });
    ViewportContainerViewmodel.prototype.setViewport = function (viewportElementId) {
        var viewport = document.getElementById(viewportElementId);
        this.__viewport = viewport;
    };
    ViewportContainerViewmodel.prototype.afterRender = function () {
        this.setViewport('game-canvas');
        root.game = new Game(this.__viewport);
        var promise = root.game.start();
        root['diagnostics-container-viewmodel'].initDiagnosticsReporting();
        promise.catch(function (error) {
            root['diagnostics-container-viewmodel'].exception(error);
        });
    };

    return ViewportContainerViewmodel;
});