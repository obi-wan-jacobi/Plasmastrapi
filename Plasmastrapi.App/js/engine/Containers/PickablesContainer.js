define(["../Objects/Container", "../Components/PickableComponent"], function (Container, PickableComponent) {

    // CLASS PickablesContainer
    PickablesContainer.prototype = Object.create(Container.prototype);
    PickablesContainer.prototype.constructor = PickablesContainer;
    function PickablesContainer() {
        Container.call(this, PickableComponent);
    };

    return PickablesContainer;
});