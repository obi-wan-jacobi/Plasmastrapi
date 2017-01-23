define(function () {

    // CLASS InputTerminal
    InputTerminal.prototype = Object.create(Terminal.prototype);
    InputTerminal.prototype.constructor = InputTerminal;
    function InputTerminal(offsetPosition, circuitElement) {

        // inherits from
        Terminal.call(this, offsetPosition, circuitElement);

        // modify parent to include OutputTerminal container
        if (!this.circuitElement.inputTerminals) {
            this.circuitElement.inputTerminals = [];
        }

        this.circuitElement.inputTerminals.push(this);

        // sprite
        var spriteComponent = new Components.SpriteComponent(this.sprite);
        spriteComponent.setFrame(1);

        // drawable on game entity layer
        var drawableComponent = new Components.DrawableComponent(DISPLAYLAYERS.GAMEENTITIES);

        // compose entity
        this.addComponent(spriteComponent);
        this.addComponent(drawableComponent);
    };
    
    return InputTerminal;
});