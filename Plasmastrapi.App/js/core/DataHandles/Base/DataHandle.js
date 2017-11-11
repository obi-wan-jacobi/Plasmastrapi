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
        utils.validator.validateInstanceType(this, data, modulePrefix);
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
        utils.validator.validateInstanceType(this, displaySettings, `${modulePrefix}-display-settings`);
        this.__displaySettings = displaySettings;
    };

    return DataHandle;
});