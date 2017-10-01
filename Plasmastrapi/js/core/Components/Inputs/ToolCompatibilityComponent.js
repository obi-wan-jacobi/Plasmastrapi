define(['component', 'tool-compatibility-handle'],
function (Component, ToolCompatibilityHandle) {

    // CLASS ToolCompatibilityComponent
    ToolCompatibilityComponent.prototype = Object.create(Component.prototype);
    ToolCompatibilityComponent.prototype.constructor = ToolCompatibilityComponent;
    function ToolCompatibilityComponent() {
        // inherits from
        Component.call(new ToolCompatibilityHandle());
    };

    return ToolCompatibilityComponent;
});