define(['scene'],
function (Scene) {

    MainMenu.prototype = Object.create(Scene.prototype);
    MainMenu.prototype.constructor = MainMenu;
    function MainMenu() {

    };

    return MainMenu;
});