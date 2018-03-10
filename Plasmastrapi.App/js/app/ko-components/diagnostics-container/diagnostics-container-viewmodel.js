define(['ko', 'ko-root', 'ko-component-viewmodel'],
    function (ko, root, KOComponentViewmodel) {

    DiagnosticsContainerViewmodel.prototype = Object.create(KOComponentViewmodel.prototype);
    DiagnosticsContainerViewmodel.prototype.constructor = DiagnosticsContainerViewmodel;
    function DiagnosticsContainerViewmodel(modelModuleString) {
        KOComponentViewmodel.call(this, modelModuleString);
        this.exception = ko.observable();
        this.gameObjects = ko.observableArray();
        this.engineObjects = ko.observableArray();
        this.viewportDiagnostics = ko.observable('Loading...');
    };
    DiagnosticsContainerViewmodel.prototype.initDiagnosticsReporting = function () {
        this.registerDiagnosticsSystemReporting('game-cache-diagnostics-system', this.gameObjects);
        this.registerDiagnosticsSystemReporting('cache-diagnostics-system', this.engineObjects);
        this.registerDiagnosticsSystemReporting('viewport-diagnostics-system', this.viewportDiagnostics);
    };
    DiagnosticsContainerViewmodel.prototype.registerDiagnosticsSystemReporting = function (systemString, observable) {
        var diagnosticsController = root.game.getController('diagnostics-controller');
        diagnosticsController.registerCallback(systemString, function (diagnosticsReport) {
            var consumableReport = diagnosticsReport.unpack();
            observable(consumableReport);
        });
    };

    return DiagnosticsContainerViewmodel;
});