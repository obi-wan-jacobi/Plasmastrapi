define(['loader', 'graphics'],
function (Loader, Graphics) {

    // CLASS ImageLoader
    ImageLoader.prototype = Object.create(Loader.prototype);
    ImageLoader.prototype.constructor = ImageLoader;
    function ImageLoader() {
        Loader.call(this);
    };
    ImageLoader.prototype.download = function (container, images) {
        Loader.prototype.download.call(this, images);
        for (var url in images) {
            var image = new Image();
            image.onload = this.__itemFinishedLoading.bind(this);
            image.onerror = this.__itemFinishedLoadingWithError;
            container[/* key name */] = image;
            image.src = url;
        }
        return this;
    };

    return ImageLoader;
});
