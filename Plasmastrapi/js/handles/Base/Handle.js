define([], function () {

    function Handle(data, displaySettings, DataType, DisplaySettingsType) {
        this.__data = null;
        this.__displaySettings = null;
        this.__dataType = DataType;
        this.__displaySettingsType = DisplaySettingsType;
        this.setData(data);
        this.setDisplaySettings(displaySettings);
    };
    Handle.prototype.getData = function () {
        return this.__data;
    };
    Handle.prototype.setData = function (data) {
        validator.validateType(this, data, this.__dataType);
        this.__data = data;
    };
    Handle.prototype.getDisplaySettings = function () {
        return this.__displaySettings;
    };
    Handle.prototype.setDisplaySettings = function (displaySettings) {
        validator.validateType(this, displaySettings, this.__displaySettingsType);
        this.__displaySettings = displaySettings;
    };

    return Handle;
});