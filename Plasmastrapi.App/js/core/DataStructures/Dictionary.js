define(['link', 'validator'],
function (Link, validator) {
    
    // Resolves the issue of traditional for-loops breaking from index instability when contents.length fluctuates throughout the iteration cycle.
    // Provides index-free iteration.
    function Dictionary(typeString) {
        validator.validateInstanceType(this, typeString, 'string');
        this.__typeString = typeString;
        this.__start = null;
        this.__end = null;
        this.__length = 0;
    };
    // private methods
    Dictionary.prototype.__incrementLength = function () {
        this.__length++;
    };
    Dictionary.prototype.__decrementLength = function () {
        if (this.__length === 0) {
            return;
        }
        this.__length--;
    };
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
    // public prototypal variables
    Object.defineProperties(Dictionary.prototype, {
        'length': {
            get: function () {
                return this.__length;
            }
        }
    });
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
    Dictionary.prototype.add = function (key, /* optional */ value) {
        this.__validateNoDuplicateKeys(key);
        if (value) {
            validator.validateInstanceType(this, value, this.__typeString);
        }
        var newLink = new Link({ key, value });
        if (!this.__start) {
            this.__start = newLink;
            this.__end = newLink;
        } else {
            this.__end.setNext(newLink);
            this.__end = newLink;
        }
        this.__incrementLength();
    };
    Dictionary.prototype.remove = function(key) {
        var previousLink = this.__start;
        var result = this.__forEachLink(function (link) {
            if (link.get().key === key) {
                if (link === this.__end) {
                    if (link === this.__start) {
                        this.__end = null;
                    } else {
                        this.__end = previousLink;
                    }
                }
                if (link === this.__start) {
                    this.__start = link.next();
                } else {
                    previousLink.setNext(link.next());
                }
                this.__decrementLength();
                return link.get();
            }
            previousLink = link;
        });
        return result; 
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