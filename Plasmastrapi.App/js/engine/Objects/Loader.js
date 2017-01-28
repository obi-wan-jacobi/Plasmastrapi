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
        if (this.__loadCounter == this.__loadTotal) {
            this.__isfinishedloading = true;
            while(this.__callbacks.length > 0) {
                this.__callbacks.shift()();
            }
            this.__isexecuting = false;
        }
    };
    Loader.prototype.__itemFinishedLoadingWithError = function(){
        throw new Error(this.constructor.name + ' failed to load.');
    };
    // public prototypal variables
    Object.defineProperties(Loader.prototype, {
		'isFinishedLoading': {
			get: function() {
				return this.__isFinishedLoading;
			}
		}
	});
    Loader.prototype.download = function (assetMap) {
        if (this.__isExecuting) {
            throw new Error(this.constructor.name + ":download - A download is already in progress.");
        }
        this.__isFinishedLoading = false;
        this.__loadCounter = 0;
        for (var i = 0, L = assetMap.length; i < L; i++) {
            if (assetMap[i].src instanceof Array) {
                for (var j = 0, K = assetMap[i].src.length; j < K; j++) {
                    this.__loadTotal++;
                }
            } else {
                this.__loadTotal++;
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