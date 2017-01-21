define(["../Objects/Tool"], function (Tool) {

    MasterTool.prototype = Object.create(Tool.prototype);
    MasterTool.prototype.constructor = MasterTool;
    function MasterTool() {
        Tool.prototype.call(this, [/* works with */]);
    };

    return MasterTool;
});