define(['utils'], function (utils) {

    function DiagnosticsReport(data, dataTypeString) {
        utils.validator.validateInstanceType(this, data, dataTypeString);
        this.__data = data;
    };
    DiagnosticsReport.prototype.unpack = function () {
        return this.__data;
    };

    return DiagnosticsReport;
});