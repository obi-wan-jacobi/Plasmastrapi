define(['wire-element'],
function (WireElement) {

    // CLASS WireAnchor
    WireAnchor.prototype = Object.create(WireElement.prototype);
    WireAnchor.prototype.constructor = WireAnchor;
    function WireAnchor(offsetPosition, parentElement) {
        // inherits from
        WireElement.call(this);
    };

    return WireAnchor;
});