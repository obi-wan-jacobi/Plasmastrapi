define([
    'graphics',
    'main-menu-background-panel',
    'circuit-design-blueprint-panel'
],
function (Graphics, MainMenuBackgroundPanel, CircuitDesignBlueprintPanel) {

    return new Graphics.ImageMap(
        new Graphics.ImageSourcePair(MainMenuBackgroundPanel.prototype, 'img/Backgrounds/blueprint-paper.jpg'),
        new Graphics.ImageSourcePair(CircuitDesignBlueprintPanel.prototype, 'img/Backgrounds/blueprint-paper.jpg')
    );
});