﻿define(["../Objects/Container", "../Components/PickableComponent"], function (Container, PickableComponent) {

    // CLASS PickableComponentContainer
    PickableComponentContainer.prototype = Object.create(Container.prototype);
    PickableComponentContainer.prototype.constructor = PickableComponentContainer;
    function PickableComponentContainer() {
        Container.call(this, PickableComponent);
    };

    return PickableComponentContainer;
});