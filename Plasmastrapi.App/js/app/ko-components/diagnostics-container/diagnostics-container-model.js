define(['ko', 'root', 'ko-component-model', 'game'],
function (ko, root, KOComponentModel, Game) {

    DiagnosticsContainerModel.prototype = Object.create(KOComponentModel.prototype);
    DiagnosticsContainerModel.prototype.constructor = DiagnosticsContainerModel;
    function DiagnosticsContainerModel() {
        KOComponentModel.call(this);
        this.objectCountDiagnostics = ko.observableArray();
        this.viewportDiagnostics = ko.observable();
    };
    DiagnosticsContainerModel.prototype.initDiagnosticsReporting = function () {
        var diagnosticsController = root.game.getController('diagnostics-controller');
        diagnosticsController.registerCallback('cache-diagnostics-system', this.processCacheDiagnosticsReport.bind(this));
        diagnosticsController.registerCallback('viewport-diagnostics-system', this.processViewportDiagnosticsReport.bind(this));
    };
    DiagnosticsContainerModel.prototype.processCacheDiagnosticsReport = function (report) {
        var diagnostics = report.toArray();
        this.objectCountDiagnostics(diagnostics);
    };
    DiagnosticsContainerModel.prototype.processViewportDiagnosticsReport = function (report) {
        this.viewportDiagnostics(1000/report);
    };

    return new DiagnosticsContainerModel();
});