define(['diagnostics-report'], function (DiagnosticsReport) {

    CacheDiagnosticsReport.prototype = Object.create(DiagnosticsReport.prototype);
    CacheDiagnosticsReport.prototype.constructor = CacheDiagnosticsReport;
    function CacheDiagnosticsReport(data) {
        DiagnosticsReport.call(this, data, 'dictionary');
    };
    CacheDiagnosticsReport.prototype.unpack = function () {
        return this.__data.toArray();
    };

    return CacheDiagnosticsReport;
});