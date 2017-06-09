define([], function () {

    function Handle(data, displaySettings, DataType, DisplaySettingsType) {
        this.__data = null;
        this.__displaySettings = null;
        this.__dataType = DataType;
        this.__DisplaySettingsType = DisplaySettingsType;
        this.setData(data);
        this.setDisplaySettings(displaySettings);
    };
    Handle.prototype.__validateDataType = function (data, DataType) {
        if (!(data instanceof DataType)) {
            throw new Error(this.constructor.name + ':validateDataType - ' + data.constructor.name + ' must be of type ' + DataType.name);
        }
    };
    Handle.prototype.getData = function () {
        return this.__data;
    };
    Handle.prototype.setData = function (data) {
        this.__validateDataType(data, this.__dataType);
        this.__data = data;
    };
    Handle.prototype.getDisplaySettings = function () {
        return this.__displaySettings;
    };
    Handle.prototype.setDisplaySettings = function (displaySettings) {
        this.__validateDataType(displaySettings, this.__DisplaySettingsType);
        this.__displaySettings = displaySettings;
    };

    return Handle;
});