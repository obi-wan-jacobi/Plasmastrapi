define(function() {

    // CLASS Loader
    function Loader() {
        // private variables
        this.__isExecuting = false;
        this.__isFinishedLoading = false;
        this.__callbacks = [];
        this.__loadTotal = 0;
        this.__loadCounter = 0;
    };
    // private methods
    Loader.prototype.__itemFinishedLoading = function () {
        this.__loadCounter++;
        if (this.__loadCounter === this.__loadTotal) {
            this.__isfinishedloading = true;
            while(this.__callbacks.length > 0) {
                this.__callbacks.shift()();
            }
            this.__isexecuting = false;
        }
    };
    Loader.prototype.__itemFinishedLoadingWithError = function(){
        validator.throw(this, 'itemFinishedLoadingWithError', 'An asset failed to load');
    };
    // public prototypal variables
    Object.defineProperties(Loader.prototype, {
		'isFinishedLoading': {
			get: function() {
				return this.__isFinishedLoading;
			}
		}
	});
    Loader.prototype.__beginDownload = function (assets) {
        if (this.__isExecuting) {
            validator.throw(this, 'beginDownload', 'A download is already in progress');
        }
        this.__isFinishedLoading = false;
        this.__loadCounter = 0;
        for (var asset in assets) {
            if (assets.hasOwnProperty(asset)) {
                if (asset instanceof Array) {
                    for (var i = 0, L = asset.length; i < L; i++) {
                        this.__loadTotal++;
                    }
                } else {
                    this.__loadTotal++;
                }
            }
        }
    };
    Loader.prototype.done = function(callback) {
        if (this.__isFinishedLoading) {
            return callback();
        }
        this.__callbacks.push(callback);
    };

    return Loader;
});