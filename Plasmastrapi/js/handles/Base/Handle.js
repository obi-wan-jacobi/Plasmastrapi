define([], function () {

    function Handle(target, displaySettings, TargetType, DisplaySettingsType) {
        this.__validateDataType(target, TargetType);
        this.__validateDataType(displaySettings, DisplaySettingsType);
        this.target = target;
        this.displaySettings = displaySettings;
    };
    Handle.prototype.__validateDataType = function (data, DataType) {
        if (!(data instanceof DataType)) {
            throw new Error(this.constructor.name + ':validateDataType - ' + data.constructor.name + ' must be of type ' + DataType.name);
        }
    };

    return Handle;
});