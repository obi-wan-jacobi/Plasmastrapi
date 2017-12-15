define(['ko-component-viewmodel'],
function (KOComponentViewmodel) {

    DiagnosticsContainerViewmodel.prototype = Object.create(KOComponentViewmodel.prototype);
    DiagnosticsContainerViewmodel.prototype.constructor = DiagnosticsContainerViewmodel;
    function DiagnosticsContainerViewmodel(modelModuleString) {
        KOComponentViewmodel.call(this, modelModuleString);
    };
    DiagnosticsContainerViewmodel.prototype.afterRender = function () {
    };

    return DiagnosticsContainerViewmodel;
});