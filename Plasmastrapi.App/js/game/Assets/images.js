define(["../../engine/Data/Graphics", "../Lab/lab"], function (Graphics, Lab) {

    return new Graphics.ImageMap(
        new Graphics.ImageSourcePair(Lab.CircuitDesignArea.prototype, 'img/Backgrounds/blueprint-paper.jpg')
    );
});