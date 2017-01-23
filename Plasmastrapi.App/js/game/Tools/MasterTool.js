define(["../../engine/Objects/Tool"], function (Tool) {

    MasterTool.prototype = Object.create(Tool.prototype);
    MasterTool.prototype.constructor = MasterTool;
    function MasterTool() {
        Tool.call(this);
    };

    return MasterTool;
});