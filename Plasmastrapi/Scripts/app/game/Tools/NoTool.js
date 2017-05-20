define([
    'tool'
],
function (Tool) {

    NoTool.prototype = Object.create(Tool.prototype);
    NoTool.prototype.constructor = NoTool;
    function NoTool() {
        Tool.call(this);
    };

    return NoTool;
});