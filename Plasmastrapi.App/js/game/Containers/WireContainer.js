define(function(Container) {

    // CLASS WireContainer
    WireContainer.prototype = Object.create(Container.prototype);
    WireContainer.prototype.constructor = WireContainer;
    function WireContainer() {
        Container.call(this);
    };

});