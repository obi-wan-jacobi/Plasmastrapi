define(['dictionary', 'validator'],
function (Dictionary, validator) {

    function AssetLoader() {
        // private variables
        this.__isExecuting = false;
        this.__isFinishedLoading = false;
        this.__callbacks = [];
        this.__loadTotal = 0;
        this.__loadCounter = 0;
        this.__assetMap = new Dictionary('image');
    };
    // private methods
    AssetLoader.prototype.__itemFinishedLoading = function () {
        this.__loadCounter++;
        if (this.__loadCounter === this.__loadTotal) {
            this.__isFinishedloading = true;
            while(this.__callbacks.length > 0) {
                this.__callbacks.shift()();
            }
            this.__isExecuting = false;
        }
    };
    AssetLoader.prototype.__itemFinishedLoadingWithError = function(){
        validator.throw(this, 'itemFinishedLoadingWithError', 'An asset failed to load');
    };
    AssetLoader.prototype.__initDownload = function (assetUrls) {
        if (this.__isExecuting || this.__isFinishedLoading) {
            validator.throw(this, 'initDownload', 'Download has already been called');
        }
        this.__isExecuting = true;
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
        for (var property in assetUrls) {
            var image = new Image();
            image.onload = this.__itemFinishedLoading.bind(this);
            image.onerror = this.__itemFinishedLoadingWithError; 
            image.src = assetUrls[property];
            this.__assetMap.add(image.src.replace(/^.*[\\\/]/, '').split('.')[0], image);
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
        return this.__assetMap;
    };

    return AssetLoader;
});