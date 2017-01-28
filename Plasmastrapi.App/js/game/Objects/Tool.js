define(["../../engine/Objects/InputHandle"], function (InputHandle) {

    Tool.prototype = Object.create(InputHandle.prototype);
    Tool.prototype.constructor = Tool;
    function Tool() {
        InputHandle.call(this);
    };

    return Tool;
});