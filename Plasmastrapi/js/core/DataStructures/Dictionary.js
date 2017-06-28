define(['link', 'validator'],
function (Link, validator) {
    
    // Resolves the issue of traditional for-loops breaking from index instability when contents.length fluctuates throughout the iteration cycle.
    // Index-free iteration.
    function Dictionary(ValueType) {
        validator.validateObject(ValueType);
        this.__ValueType = ValueType;
        this.__start = null;
    };
    // private methods
    Dictionary.prototype.__validateNoDuplicateKeys = function(key) {
        this.forEach(function(linkKey) {
            if (linkKey === key) {
                validator.throw(this, 'validateNoDuplicateKeys', 'Duplicate key: ' + key);
            }
        }, this);
    };
    Dictionary.prototype.__forEachLink = function (fn) {
        var link = this.__start;
        while (link) {
            var result = fn.call(this, link);
            if (result !== null) {
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
            if (result !== null) {
                return result;
            }
            link = link.next();
        }
    };
    Dictionary.prototype.add = function (key, value) {
        this.__validateNoDuplicateKeys(key);
        validator.validateType(this, value, this.__ValueType);
        var newLink = new Link({ key, value });
        if (!this.__start) {
            this.__start = newLink;
            return;
        }
        return this.__forEachLink(function (link) {
            if (!link.hasNext()) {
                link.setNext(newLink);
                return true;
            }
        });
    };
    Dictionary.prototype.remove = function(key) {
        var previousLink = this.__start;
        return this.__forEachLink(function (link) {
            if (link.get().key === key) {
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
    Dictionary.prototype.get = function (keyToFind) {
        return this.forEach(function (key, value) {
            if (keyToFind === key) {
                return value;
            }
        }, this);
    };

    return Dictionary;
});