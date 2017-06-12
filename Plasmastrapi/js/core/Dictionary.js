define(['link'],
function (Link) {
    
    // Resolves the issue of traditional for-loops breaking from index instability when contents.length fluctuates throughout the iteration cycle
    function Dictionary() {
        this.__start = null;
    };
    Dictionary.prototype.__validateNoDuplicatePairs = function(key, value) {
        this.forEach(function(ownedItemKey, ownedItemValue) {
            if (ownedItemKey === key && ownedItemValue === value) {
                throw new Error(this.constructor.name + ':validateNoDuplicatePairs - Duplicate item found on key: ' + key.constructor.name + ' value: ' + value.constructor.name);
            }
        }, this);
    };
    Dictionary.prototype.__forEachLink = function (fn) {
        var link = this.__start;
        var result;
        while (link) {
            result = fn.call(this, link);
            if (result) {
                break;
            }
            link = link.next();
        }
        return result;
    };
    Dictionary.prototype.forEach = function(fn, /* optional */ caller) {
        var link = this.__start;
        var result;
        while(link) {
            var item = link.val();
            result = fn.call(caller, item.key, item.value);
            if (result) {
                break;
            }
            link = link.next();
        }
        return result;
    };
    Dictionary.prototype.unshift = function (key, value) {
        this.__validateNoDuplicatePairs(key, value);
        var newLink = new Link({ key: key, value: value });
        newLink.setNext(this.__start);
        this.__start = newLink;
    };
    Dictionary.prototype.push = function(key, value) {
        this.__validateNoDuplicatePairs(key, value);
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
    Dictionary.prototype.splice = function(key, value) {
        var previousLink = this.__start;
        return this.__forEachLink(function (link) {
            var item = link.val();
            if (item.key === key && item.value === value) {
                if (link === this.__start) {
                    this.__start = link.next();
                } else {
                    previousLink.setNext(link.next());
                }
                return item;
            }
            previousLink = link;
        });
    };
    Dictionary.prototype.purgeItemsWithKey = function(key) {
        var previousLink = this.__start;
        this.__forEachLink(function (link) {
            var item = link.val();
            if (item.key === key) {
                if (link === this.__start) {
                    this.__start = previousLink = link.next();
                    return;
                } else {
                    previousLink.setNext(link.next());
                    return;
                }
            }
            previousLink = link;
        });
    };

    return Dictionary;
});