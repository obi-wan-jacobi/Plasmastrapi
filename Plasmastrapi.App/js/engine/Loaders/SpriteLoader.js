define(["../Objects/Loader", "../Data/Graphics"], function (Loader, Graphics) {

    // CLASS SpriteLoader
    SpriteLoader.prototype = Object.create(Loader.prototype);
    SpriteLoader.prototype.constructor = SpriteLoader;
    function SpriteLoader() {
        Loader.call(this);
    };
    SpriteLoader.prototype.download = function (spriteMap) {
        if (!(spriteMap instanceof Graphics.SpriteMap)) {
            throw new Error(this.constructor.name + ":download - Argument must be an instance of Graphics.SpriteMap");
        }
        Loader.prototype.download.call(this, spriteMap);
        var fnItemFinishedLoading = this.__itemFinishedLoading.bind(this);
        var fnItemFinishedLoadingWithError = this.__itemFinishedLoadingWithError;
        for (var j = 0, J = spriteMap.length; j < J; j++) {
            var frames = [];
            var target = spriteMap[j].target;
            spriteMap[j].target.sprite = new Graphics.Sprite(frames);
            for (var k = 0, K = spriteMap[j].src.length; k < K; k++) {
                var frame = new Image();
                frame.onload = fnItemFinishedLoading;
                frame.onerror = fnItemFinishedLoadingWithError;
                frame.src = spriteMap[j].src[k];
                frames.push(frame);
            }
        }
        return this;
    };

    return SpriteLoader;
});
