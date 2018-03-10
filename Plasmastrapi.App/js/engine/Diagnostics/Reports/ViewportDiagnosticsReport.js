define(['diagnostics-report'], function (DiagnosticsReport) {

    ViewportDiagnosticsReport.prototype = Object.create(DiagnosticsReport.prototype);
    ViewportDiagnosticsReport.prototype.constructor = ViewportDiagnosticsReport;
    function ViewportDiagnosticsReport(data) {
        DiagnosticsReport.call(this, data, 'number');
    };

    return ViewportDiagnosticsReport;
});