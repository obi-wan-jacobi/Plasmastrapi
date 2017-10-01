define(['link', 'validator'],
function (Link, validator) {

    // Resolves the issue of traditional for-loops breaking from index instability when contents.length fluctuates throughout the iteration cycle.
    // Index-free iteration.
    function LinkedList(ValueType) {
        validator.validateObject(ValueType);
        this.__ValueType = ValueType;
        this.__start = null;
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
        validator.validateInstanceType(this, value, this.__ValueType);
        var newLink = new Link(value);
        if (!this.__start) {
            this.__start = newLink;
            return true;
        }
        this.__forEachLink(function (link) {
            if (!link.hasNext()) {
                link.setNext(newLink);
                return true;
            }
        });
    };
    LinkedList.prototype.splice = function(value) {
        var previousLink = this.__start;
        return this.__forEachLink(function (link) {
            var ownedvalue = link.get();
            if (ownedvalue === value) {
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
        return this.__forEachLink(function (ownedvalue) {
            if (ownedvalue === value) {
                return true;
            }
        });
    };

    return LinkedList;
});