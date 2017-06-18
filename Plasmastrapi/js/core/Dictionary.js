define(['link'],
function (Link) {
    
    // Resolves the issue of traditional for-loops breaking from index instability when contents.length fluctuates throughout the iteration cycle.
    // Index-free iteration.
    function Dictionary(/* optional */ ValueType) {
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
            if (result) {
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
            if (result) {
                return result;
            }
            link = link.next();
        }
    };
    Dictionary.prototype.push = function (key, value) {
        this.__validateNoDuplicateKeys(key);
        validator.validateType(this, value, this.__ValueType);
        var newLink = new Link({key: key, value: value});
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
    Dictionary.prototype.splice = function(key) {
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

    return Dictionary;
});