define(["../../engine/Data/Graphics", "../UI/Areas/CircuitDesignArea"], function (Graphics, CircuitDesignArea) {

    return new Graphics.ImageMap(
        new Graphics.ImageSourcePair(CircuitDesignArea.prototype, 'img/Backgrounds/blueprint-paper.jpg')
    );
});