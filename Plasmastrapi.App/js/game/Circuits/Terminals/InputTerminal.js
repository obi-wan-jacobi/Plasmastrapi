define(["./Terminal"], function (Terminal) {

    // CLASS InputTerminal
    InputTerminal.prototype = Object.create(Terminal.prototype);
    InputTerminal.prototype.constructor = InputTerminal;
    function InputTerminal(offsetPosition, parentElement) {

        // inherits from
        Terminal.call(this, offsetPosition, parentElement);

        // set default sprite frame
        this.__defaultFrameIndex = 1;
        var spriteComponent = new Components.SpriteComponent(this.sprite);
        spriteComponent.setFrame(this.__defaultFrameIndex);
    };
    
    return InputTerminal;
});