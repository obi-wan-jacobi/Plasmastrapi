define(["./Terminal", "../../../engine/Components/$Components", "../../Tools/Compatibility/$Compatibility"], function (Terminal, $, $Compatibility) {

    // CLASS InputTerminal
    InputTerminal.prototype = Object.create(Terminal.prototype);
    InputTerminal.prototype.constructor = InputTerminal;
    function InputTerminal(offsetPosition, parentElement) {

        // inherits from
        Terminal.call(this, offsetPosition, parentElement);

        // set default sprite frame
        this.__defaultFrameIndex = 1;
        var spriteComponent = this.getComponent($.SpriteComponent);
        spriteComponent.setFrame(this.__defaultFrameIndex);

        // tool compatibility
        var pickableComponent = this.getComponent($.PickableComponent);
        $Compatibility.WireableAsInput.call(pickableComponent);
    };
    
    return InputTerminal;
});