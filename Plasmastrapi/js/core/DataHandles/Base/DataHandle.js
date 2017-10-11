define(['utils'], function (utils) {

    function DataHandle(data, displaySettings) {
        this.__data = null;
        this.__displaySettings = null;
        this.setData(data);
        this.setDisplaySettings(displaySettings);
    };
    // public methods
    DataHandle.prototype.getData = function () {
        return this.__data;
    };
    DataHandle.prototype.setData = function (data) {
        // validate data for this handle
        var modulePrefix = utils.modules.getModulePrefix(this, 'Handle');
        var DataType = utils.modules.require(modulePrefix);
        utils.validator.validateInstanceType(this, data, DataType);
        this.__data = data;
    };
    DataHandle.prototype.getDisplaySettings = function () {
        return this.__displaySettings;
    };
    DataHandle.prototype.setDisplaySettings = function (displaySettings) {
        if (!displaySettings) {
            return;
        }
        // validate display settings for this handle
        var modulePrefix = utils.modules.getModulePrefix(this, 'Handle');
        var DisplaySettingsType = utils.modules.require(`${modulePrefix}-display-settings`);
        utils.validator.validateInstanceType(this, displaySettings, DisplaySettingsType);
        this.__displaySettings = displaySettings;
    };

    return DataHandle;
});