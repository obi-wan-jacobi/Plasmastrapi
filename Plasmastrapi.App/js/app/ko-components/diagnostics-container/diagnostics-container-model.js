define(['ko', 'ko-root', 'ko-component-model'],
function (ko, root, KOComponentModel) {

    DiagnosticsContainerModel.prototype = Object.create(KOComponentModel.prototype);
    DiagnosticsContainerModel.prototype.constructor = DiagnosticsContainerModel;
    function DiagnosticsContainerModel() {
        KOComponentModel.call(this);
        this.exception = ko.observable();
        this.gameObjects = ko.observableArray();
        this.engineObjects = ko.observableArray();
        this.viewportDiagnostics = ko.observable('Loading...');
    };
    DiagnosticsContainerModel.prototype.initDiagnosticsReporting = function () {
        var diagnosticsController = root.game.getController('diagnostics-controller');
        diagnosticsController.registerCallback('game-cache-diagnostics-system', this.processGameCacheDiagnosticsReport.bind(this));
        diagnosticsController.registerCallback('cache-diagnostics-system', this.processEngineCacheDiagnosticsReport.bind(this));
        diagnosticsController.registerCallback('viewport-diagnostics-system', this.processViewportDiagnosticsReport.bind(this));
    };
    DiagnosticsContainerModel.prototype.processGameCacheDiagnosticsReport = function (report) {
        var diagnostics = report.toArray();
        this.gameObjects(diagnostics);
    };
    DiagnosticsContainerModel.prototype.processEngineCacheDiagnosticsReport = function (report) {
        var diagnostics = report.toArray();
        this.engineObjects(diagnostics);
    };
    DiagnosticsContainerModel.prototype.processViewportDiagnosticsReport = function (report) {
        this.viewportDiagnostics(1000/report);
    };

    return new DiagnosticsContainerModel();
});