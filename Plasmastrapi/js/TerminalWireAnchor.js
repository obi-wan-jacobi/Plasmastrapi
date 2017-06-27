define(['entity', 'pose-component', 'pose'],
function (Entity, PoseComponent, Pose) {

    // CLASS TerminalWireAnchor
    TerminalWireAnchor.prototype = Object.create(Entity.prototype);
    TerminalWireAnchor.prototype.constructor = TerminalWireAnchor;
    function TerminalWireAnchor(offsetPosition, parentElement) {
        // inherits from
        Entity.call(this);
    };

    return TerminalWireAnchor;
});