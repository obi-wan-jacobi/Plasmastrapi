define(['base'], function (Base) {

    Controller.prototype = Object.create(Base.prototype);
    Controller.prototype.constructor = Controller;
    function Controller(engine) {
        Base.call(this, engine);
    };
    Controller.prototype.__oninit = function () { };
    Controller.prototype.__onload = function () { };
    Controller.prototype.__onunload = function () { };

    return Controller;
});