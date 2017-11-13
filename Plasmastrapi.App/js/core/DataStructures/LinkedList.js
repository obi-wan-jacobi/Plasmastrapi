define(['link', 'validator'],
function (Link, validator) {

    // Resolves the issue of traditional for-loops breaking from index instability when contents.length fluctuates throughout the iteration cycle.
    // Provides index-free iteration.
    function LinkedList(typeString) {
        validator.validateString(typeString);
        this.__typeString = typeString;
        this.__start = null;
        this.__end = null;
    };
    // private methods
    LinkedList.prototype.__forEachLink = function (fn) {
        var link = this.__start;
        while (link) {
            var result = fn.call(this, link);
            if (result !== null && result !== undefined) {
                return result;
            }
            link = link.next();
        }
        return result;
    };
    // public methods
    LinkedList.prototype.forEach = function(fn, /* optional */ caller) {
        var link = this.__start;
        while(link) {
            var value = link.get();
            var result = fn.call(caller, value);
            if (result !== null && result !== undefined) {
                return result;
            }
            link = link.next();
        }
    };
    LinkedList.prototype.push = function(value) {
        validator.validateInstanceType(this, value, this.__typeString);
        var newLink = new Link(value);
        if (!this.__start) {
            this.__start = newLink;
            this.__end = newLink;
            return true;
        }
        this.__end.setNext(newLink);
        this.__end = newLink;
    };
    LinkedList.prototype.splice = function(value) {
        var previousLink = this.__start;
        return this.__forEachLink(function (link) {
            var ownedvalue = link.get();
            if (ownedvalue === value) {
                if (link === this.__end) {
                    this.__end = previousLink;
                }
                if (link === this.__start) {
                    this.__start = link.next();
                } else {
                    previousLink.setNext(link.next());
                }
                return value;
            }
            previousLink = link;
        });
    };
    LinkedList.prototype.contains = function(value) {
        return this.forEach(function (ownedvalue) {
            if (ownedvalue === value) {
                return true;
            }
        });
    };
    LinkedList.prototype.toArray = function () {
        var result = [];
        this.forEach(function (value) {
            result.push(value);
        });
        return result;
    };

    return LinkedList;
});