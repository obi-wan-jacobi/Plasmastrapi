define(['container', 'pick-component'],
function (Container, PickComponent) {

    // CLASS PickComponentContainer
    PickComponentContainer.prototype = Object.create(Container.prototype);
    PickComponentContainer.prototype.constructor = PickComponentContainer;
    function PickComponentContainer() {
        Container.call(this, PickComponent);
    };

    return PickComponentContainer;
});