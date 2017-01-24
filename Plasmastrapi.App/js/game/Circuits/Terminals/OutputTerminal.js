define(["./Terminal"], function (Terminal) {

    // CLASS OutputTerminal
    OutputTerminal.prototype = Object.create(Terminal.prototype);
    OutputTerminal.prototype.constructor = OutputTerminal;
    function OutputTerminal(offsetPosition, circuitElement) {

        // inherits from
        Terminal.call(this, offsetPosition, circuitElement);

        // set default sprite frame
        this.__defaultFrameIndex = 0;
        var spriteComponent = new Components.SpriteComponent(this.sprite);
        spriteComponent.setFrame(this.__defaultFrameIndex);
    };
    
    return OutputTerminal;
});