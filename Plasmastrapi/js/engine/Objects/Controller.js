define([],
function () {

    // CLASS Controller
    function Controller() {
        this.__isInitialized = false;
        this.__isLoaded = false;
    };
    // private methods
    Controller.prototype.__init = function () {

    };
    // public methods
    Controller.prototype.load = function () {
        if (this.__isLoaded) {
            return;
        }
        this.__isLoaded = true;
        if (!this.__isInitialized) {
            this.__isInitialized = true;
            this.__init();
        }
    };
    Controller.prototype.unload = function () {
        if (!this.__isLoaded) {
            return;
        }
        this.__isLoaded = false;
    };
    Controller.prototype.reload = function () {
        this.unload();
        this.load();
    };
    
    return Controller;
});