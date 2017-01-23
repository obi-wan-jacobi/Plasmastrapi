define(function () {

    // CLASS OutputTerminal
    OutputTerminal.prototype = Object.create(Terminal.prototype);
    OutputTerminal.prototype.constructor = OutputTerminal;
    function OutputTerminal(offsetPosition, circuitElement) {

        // inherits from
        Terminal.call(this, offsetPosition, circuitElement);

        // modify parent to include OutputTerminal container
        if (!this.circuitElement.outputTerminals) {
            this.circuitElement.outputTerminals = [];
        }

        this.circuitElement.outputTerminals.push(this);

        // sprite
        var spriteComponent = new Components.SpriteComponent(this.sprite);
        spriteComponent.setFrame(0);

        // drawable on game entity layer
        var drawableComponent = new Components.DrawableComponent(DISPLAYLAYERS.GAMEENTITIES);

        // compose entity
        this.addComponent(spriteComponent);
        this.addComponent(drawableComponent);
    };
    
    return OutputTerminal;
});