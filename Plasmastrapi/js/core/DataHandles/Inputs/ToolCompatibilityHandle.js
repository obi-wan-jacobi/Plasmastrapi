define(['data-handle', 'dictionary'],
function (DataHandle, Dictionary) {

    ToolCompatibilityHandle.prototype = Object.create(DataHandle.prototype);
    ToolCompatibilityHandle.prototype.constructor = ToolCompatibilityHandle;
    function ToolCompatibilityHandle() {
        DataHandle.call(this);
    };
    ToolCompatibilityHandle.prototype.setData = function () { };
    ToolCompatibilityHandle.prototype.setDisplaySettings = function () { };

    return ToolCompatibilityHandle;
});