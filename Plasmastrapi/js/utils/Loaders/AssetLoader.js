define(['validator'],
function (validator) {

    // CLASS AssetLoader
    function AssetLoader() { // TODO:
        // private variables
        this.__isExecuting = false;
        this.__isFinishedLoading = false;
        this.__callbacks = [];
        this.__loadTotal = 0;
        this.__loadCounter = 0;
        this.__assets = [];
    };
    // private methods
    AssetLoader.prototype.__itemFinishedLoading = function () {
        this.__loadCounter++;
        if (this.__loadCounter === this.__loadTotal) {
            this.__isfinishedloading = true;
            while(this.__callbacks.length > 0) {
                this.__callbacks.shift()();
            }
            this.__isexecuting = false;
        }
    };
    AssetLoader.prototype.__itemFinishedLoadingWithError = function(){
        validator.throw(this, 'itemFinishedLoadingWithError', 'An asset failed to load');
    };
    AssetLoader.prototype.__initDownload = function (assetUrls) {
        if (this.__isExecuting) {
            validator.throw(this, 'beginDownload', 'A download is already in progress');
        }
        this.__isFinishedLoading = false;
        this.__loadCounter = 0;
        this.__loadTotal = assetUrls.length;
    };
    // public prototypal variables
    Object.defineProperties(AssetLoader.prototype, {
		'isFinishedLoading': {
			get: function() {
				return this.__isFinishedLoading;
			}
		}
    });
    // public methods
    AssetLoader.prototype.download = function (assetUrls) {
        this.__initDownload(assetUrls);
        for (var src in assetUrls) {
            var image = new Image();
            image.onload = this.__itemFinishedLoading.bind(this);
            image.onerror = this.__itemFinishedLoadingWithError;
            this.__assets.push(image);
            image.src = assetUrls[src];
        }
        return this;
    };
    AssetLoader.prototype.done = function(callback) {
        if (this.__isFinishedLoading) {
            return callback();
        }
        this.__callbacks.push(callback);
    };
    AssetLoader.prototype.get = function () {
        return this.__assets;
    };

    return AssetLoader;
});