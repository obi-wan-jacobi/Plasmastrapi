define(['scene', 'back-navigation-button'],
function (Scene, BackNavigationButton) {

    Lab.prototype = Object.create(Scene.prototype);
    Lab.prototype.constructor = Lab;
    function Lab(engine) {
        Scene.call(this, engine);
    };
    Lab.prototype.__oninit = function () {
        new BackNavigationButton(this.__engine);
    };

    return Lab;
});