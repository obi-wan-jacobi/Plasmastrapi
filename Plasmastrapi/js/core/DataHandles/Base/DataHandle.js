define([], function () {

    function DataHandle(data, displaySettings, DataType, DisplaySettingsType) {
        this.__data = null;
        this.__displaySettings = null;
        this.__dataType = DataType;
        this.__displaySettingsType = DisplaySettingsType;
        this.setData(data);
        this.setDisplaySettings(displaySettings);
    };
    DataHandle.prototype.getData = function () {
        return this.__data;
    };
    DataHandle.prototype.setData = function (data) {
        validator.validateType(this, data, this.__dataType);
        this.__data = data;
    };
    DataHandle.prototype.getDisplaySettings = function () {
        return this.__displaySettings;
    };
    DataHandle.prototype.setDisplaySettings = function (displaySettings) {
        if (!displaySettings) {
            return;
        }
        validator.validateType(this, displaySettings, this.__displaySettingsType);
        this.__displaySettings = displaySettings;
    };

    return DataHandle;
});