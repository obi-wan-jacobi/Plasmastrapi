define(["../Objects/Tool"], function (Tool) {

    TrashTool.prototype = Object.create(Tool.prototype);
    TrashTool.prototype.constructor = TrashTool;
    function TrashTool() {
        Tool.call(this);
    };

    return TrashTool;
});