define([], function () {

    function Handle(target, displaySettings, TargetType, DisplaySettingsType) {
        this.__target = null;
        this.__displaySettings = null;
        this.__TargetType = TargetType;
        this.__DisplaySettingsType = DisplaySettingsType;
        this.setTarget(target);
        this.setDisplaySettings(displaySettings);
    };
    Handle.prototype.__validateDataType = function (data, DataType) {
        if (!(data instanceof DataType)) {
            throw new Error(this.constructor.name + ':validateDataType - ' + data.constructor.name + ' must be of type ' + DataType.name);
        }
    };
    Handle.prototype.getTarget = function () {
        return this.__target;
    };
    Handle.prototype.setTarget = function (target) {
        this.__validateDataType(target, this.__TargetType);
        this.__target = target;
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