define(['link', 'validator'],
function (Link, validator) {
    
    // Resolves the issue of traditional for-loops breaking from index instability when contents.length fluctuates throughout the iteration cycle.
    // Provides index-free iteration.
    function Dictionary(typeString) {
        validator.validateInstanceType(this, typeString, 'string');
        this.__typeString = typeString;
        this.__start = null;
        this.__end = null;
    };
    // private methods
    Dictionary.prototype.__validateNoDuplicateKeys = function(key) {
        this.forEach(function(linkKey) {
            if (linkKey === key) {
                validator.throw(this, 'validateNoDuplicateKeys', `Duplicate key: ${key}`);
            }
        }, this);
    };
    Dictionary.prototype.__forEachLink = function (fn) {
        var link = this.__start;
        while (link) {
            var result = fn.call(this, link);
            if (result !== null && result !== undefined) {
                return result;
            }
            link = link.next();
        }
    };
    // public methods
    Dictionary.prototype.forEach = function(fn, /* optional */ caller) {
        var link = this.__start;
        while(link) {
            var item = link.get();
            var result = fn.call(caller, item.key, item.value);
            if (result !== null && result !== undefined) {
                return result;
            }
            link = link.next();
        }
    };
    Dictionary.prototype.add = function (key, value) {
        this.__validateNoDuplicateKeys(key);
        validator.validateInstanceType(this, value, this.__typeString);
        var newLink = new Link({ key, value });
        if (!this.__start) {
            this.__start = newLink;
            this.__end = newLink;
            return;
        }
        this.__end.setNext(newLink);
        this.__end = newLink;
    };
    Dictionary.prototype.remove = function(key) {
        var previousLink = this.__start;
        return this.__forEachLink(function (link) {
            if (link.get().key === key) {
                if (link === this.__end) {
                    this.__end = previousLink;
                }
                if (link === this.__start) {
                    this.__start = link.next();
                } else {
                    previousLink.setNext(link.next());
                }
                return link.get();
            }
            previousLink = link;
        });
    };
    Dictionary.prototype.get = function (key) {
        return this.__forEachLink(function (link) {
            if (link.get().key === key) {
                return link.get().value;
            }
        }, this);
    };
    Dictionary.prototype.toArray = function () {
        var result = [];
        this.forEach(function (key, value) {
            result.push({ key, value });
        });
        return result;
    };

    return Dictionary;
});