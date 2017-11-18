define(['ko-component-viewmodel'],
function (KOComponentViewmodel) {

    ViewportContainerViewmodel.prototype = Object.create(KOComponentViewmodel.prototype);
    ViewportContainerViewmodel.prototype.constructor = ViewportContainerViewmodel;
    function ViewportContainerViewmodel() {
        KOComponentViewmodel.call(this);
    };
    Object.defineProperties(ViewportContainerViewmodel.prototype,
    {
        'viewport': {
            get: function () {
                return this.__viewport;
            }
        }
    });
    ViewportContainerViewmodel.prototype.afterRender = function () {
        var viewport = document.getElementById("game-canvas");
        this.setViewport(viewport);
        this.start();
    };

    return ViewportContainerViewmodel;
});