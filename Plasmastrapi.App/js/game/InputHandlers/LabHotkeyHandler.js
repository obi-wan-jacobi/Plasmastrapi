define(['input-handler'], function (InputHandler) {

    LabHotkeyHandler.prototype = Object.create(InputHandler.prototype);
    LabHotkeyHandler.prototype.constructor = LabHotkeyHandler;
    function LabHotkeyHandler() {
        InputHandler.call(this);
    };

    return LabHotkeyHandler;
});