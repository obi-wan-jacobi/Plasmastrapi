define(['base'],
function (Base) {

    // CLASS Controller
    Controller.prototype = Object.create(Base.prototype);
    Controller.prototype.constructor = Controller;
    function Controller() {
        // inherits from
        Base.call(this);
    };
    // private methods
    Controller.prototype.__oninit = function () { };
    Controller.prototype.__onload = function () { };
    Controller.prototype.__onunload = function () { };
    
    return Controller;
});