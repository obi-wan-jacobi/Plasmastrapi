define(["../Objects/Loader", "../Data/Graphics"], function (Loader, Graphics) {

    // CLASS ImageLoader
    ImageLoader.prototype = Object.create(Loader.prototype);
    ImageLoader.prototype.constructor = ImageLoader;
    function ImageLoader() {
        Loader.call(this);
    };
    ImageLoader.prototype.download = function (imageMap) {
        if (!(imageMap instanceof Graphics.ImageMap)) {
            throw new Error(this.constructor.name + ":download - Argument must be an instance of Graphics.ImageMap");
        }
        Loader.prototype.download.call(this);
        this.__loadTotal += imageMap.length;
        for (var j = 0, J = imageMap.length; j < J; j++) {
            var image = new Image();
            image.onload = this.__itemFinishedLoading.bind(this);
            image.onerror = this.__itemFinishedLoadingWithError;
            image.src = imageMap[j].src;
            imageMap[j].target.image = image;
        }
        return this;
    };

    return ImageLoader;
});
