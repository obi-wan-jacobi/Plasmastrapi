define(['container', 'wire'],
function (Container, Wire) {

    // CLASS WireContainer
    WireContainer.prototype = Object.create(Container.prototype);
    WireContainer.prototype.constructor = WireContainer;
    function WireContainer() {
        Container.call(this, Wire);
    };
    WireContainer.prototype.add = function (member) {
        var isMemberAlreadyAdded = this.forEach(function (wire) {
            if (wire.outputTerminal === member.outputTerminal && wire.inputTerminal === member.inputTerminal) {
                return true;
            }
        }, this);
        if (!isMemberAlreadyAdded) {
            Container.prototype.add.call(this, member);
        } else {
            member.destroy();
        }
    };

    return WireContainer;
});