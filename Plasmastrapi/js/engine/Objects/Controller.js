define(['emitter'],
function (Emitter) {

    // CLASS Controller
    Controller.prototype = Object.create(Emitter.prototype);
    Controller.prototype.constructor = Controller;
    function Controller() {
        Emitter.call(this);
        // apply mixins
        Emitter.Mixins.Loadable.call(this, true);
    };
    
    return Controller;
});