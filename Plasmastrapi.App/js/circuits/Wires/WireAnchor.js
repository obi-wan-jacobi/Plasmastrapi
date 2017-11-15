define(['wire-element'],
function (WireElement) {

    WireAnchor.prototype = Object.create(WireElement.prototype);
    WireAnchor.prototype.constructor = WireAnchor;
    function WireAnchor() {
        // inherits from
        WireElement.call(this);
    };

    return WireAnchor;
});