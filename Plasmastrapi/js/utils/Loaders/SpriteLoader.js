define(['loader', 'graphics'],
function (Loader, Graphics) {

    // CLASS SpriteLoader
    SpriteLoader.prototype = Object.create(Loader.prototype);
    SpriteLoader.prototype.constructor = SpriteLoader;
    function SpriteLoader() {
        Loader.call(this);
    };
    SpriteLoader.prototype.download = function (container, sprites) {
        Loader.prototype.download.call(this, sprites);
        var fnItemFinishedLoading = this.__itemFinishedLoading.bind(this);
        var fnItemFinishedLoadingWithError = this.__itemFinishedLoadingWithError;
        for (var sprite in sprites) {
            if (sprites.hasOwnProperty(sprite)) {
                var frames = [];
                container[/* key name */] = new Graphics.Sprite(frames);
                for (var url in sprite) {
                    var frame = new Image();
                    frame.onload = fnItemFinishedLoading;
                    frame.onerror = fnItemFinishedLoadingWithError;
                    frame.src = url;
                    frames.push(frame);
                }
            }
        }
        return this;
    };

    return SpriteLoader;
});
