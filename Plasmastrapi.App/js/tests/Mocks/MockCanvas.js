define(['mock-canvas-context'],
function (MockCanvasContext) {

    function MockCanvas() {
        this.style = { cursor: null };
    };
    MockCanvas.prototype.getContext = function () {
        return new MockCanvasContext();
    };

    return MockCanvas;
});