define(['mock'],
function (Mock) {

    MockViewport.prototype = Object.create(Mock.prototype);
    MockViewport.prototype.constructor = MockViewport;
    function MockViewport() {
        Mock.call(this);
        this.style = { cursor: null };
    };
    MockViewport.prototype.getContext = function () {
        return {
            width: null,
            height: null,
            clearRect: function () { },
            save: function () { },
            beginPath: function () { },
            moveTo: function () { },
            lineTo: function () { },
            translate: function () { },
            rotate: function () { },
            drawImage: function () { },
            closePath: function () { },
            strokeStyle: null,
            lineWidth: null,
            stroke: function () { },
            restore: function () { },
            fillText: function () { }
        }
    };

    return MockViewport;
});