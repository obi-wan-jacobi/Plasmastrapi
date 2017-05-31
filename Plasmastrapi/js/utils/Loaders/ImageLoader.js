define(['loader', 'assets'],
function (Loader, assets) {

    // CLASS ImageLoader
    ImageLoader.prototype = Object.create(Loader.prototype);
    ImageLoader.prototype.constructor = ImageLoader;
    function ImageLoader() {
        Loader.call(this);
    };
    ImageLoader.prototype.download = function (container, images) {
        this.__beginDownload(images);
        for (var img in images) {
            var image = new Image();
            image.onload = this.__itemFinishedLoading.bind(this);
            image.onerror = this.__itemFinishedLoadingWithError;
            assets.images[img] = image;
            image.src = images[img];
        }
        return this;
    };

    return ImageLoader;
});
