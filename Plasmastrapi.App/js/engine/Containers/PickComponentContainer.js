define(['component-container'], function (ComponentContainer) {

    PickComponentContainer.prototype = Object.create(ComponentContainer.prototype);
    PickComponentContainer.prototype.constructor = PickComponentContainer;
    function PickComponentContainer(ComponentType) {
        ComponentContainer.call(this, ComponentType);
    };

    return PickComponentContainer;
});