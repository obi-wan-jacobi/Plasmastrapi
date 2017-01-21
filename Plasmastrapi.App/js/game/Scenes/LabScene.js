define(["../Objects/Scene"], function (Scene) {

    LabScene.prototype = Object.create(Scene.prototype);
    LabScene.prototype.constructor = LabScene;
    function LabScene() {
        Scene.call(this);
        this.addEventListener('oninit', this, this.__init);
    };

    $.labScene.addEventListener('oninit', $.labScene, function () {

        var designArea = new Lab.CircuitDesignArea(
            canvas.clientWidth / 2,
            canvas.clientHeight / 2,
            canvas.clientWidth,
            canvas.clientHeight
        );

        var andGateButton = new Lab.SpawnerButton(50, 40, Lab.AndGate)

    });

    return LabScene;
});