define(['scene', 'lab-navigation-button'],
function (Scene, LabNavigationButton) {

    MainMenu.prototype = Object.create(Scene.prototype);
    MainMenu.prototype.constructor = MainMenu;
    function MainMenu(engine) {
        Scene.call(this, engine);
    };
    MainMenu.prototype.__oninit = function () {
        new LabNavigationButton(this.__engine);
    };

    return MainMenu;
});