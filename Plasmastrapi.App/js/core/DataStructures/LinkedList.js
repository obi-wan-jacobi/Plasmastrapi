define(['link', 'validator'],
function (Link, validator) {

    // Resolves the issue of traditional for-loops breaking from index instability when contents.length fluctuates throughout the iteration cycle.
    // Provides index-free iteration.
    function LinkedList(typeString) {
        validator.validateInstanceType(this, typeString, 'string');
        this.__typeString = typeString;
        this.__start = null;
        this.__end = null;
        this.__length = 0;
        this.__isIteratorActive = false;
        this.__lock = null;
        this.__isLockMarkedForRemoval = false;
    };
    // private methods
    LinkedList.prototype.__incrementLength = function () {
        this.__length++;
    };
    LinkedList.prototype.__decrementLength = function () {
        if (this.__length === 0) {
            return;
        }
        this.__length--;
    };
    LinkedList.prototype.__lockForIteration = function (link) {
        this.__lock = link;
    };
    LinkedList.prototype.__removeLockForIteration = function () {
        var link = this.__lock;
        this.__lock = null;
        if (this.__isLockMarkedForRemoval) {
            this.__isLockMarkedForRemoval = false;
            this.remove(link.get());
        }
    };
    LinkedList.prototype.__forEachLink = function (fn) {
        var link = this.__start;
        while (link) {
            this.__lockForIteration(link);
            var result = fn.call(this, link);
            if (result !== null && result !== undefined) {
                break;
            }
            var nextLink = link.next();
            this.__removeLockForIteration(link);
            link = nextLink;
        }
        return result;
    };
    // public prototypal variables
    Object.defineProperties(LinkedList.prototype, {
        'length': {
            get: function () {
                return this.__length;
            }
        }
    });
    // public methods
    LinkedList.prototype.forEach = function (fn, /* optional */ caller) {
        if (this.__isIteratorActive) {
            validator.throw(this, 'forEachLink', `${this.constructor.name} does not support recursive iteration`)
        }
        this.__isIteratorActive = true;
        var result = this.__forEachLink(function (link) {
            return fn.call(caller, link.get());
        });
        this.__isIteratorActive = false;
        return result;
    };
    LinkedList.prototype.add = function(value) {
        validator.validateInstanceType(this, value, this.__typeString);
        var newLink = new Link(value);
        if (!this.__start) {
            this.__start = newLink;
            this.__end = newLink;
        } else {
            this.__end.setNext(newLink);
            this.__end = newLink;
        }
        this.__incrementLength();
    };
    LinkedList.prototype.remove = function (value) {
        var link = this.__start;
        var previousLink;
        while (link) {
            var ownedvalue = link.get();
            if (ownedvalue === value) {
                if (link === this.__lock) {
                    this.__isLockMarkedForRemoval = true;
                    return;
                }
                if (link === this.__start) {
                    this.__end = null;
                } else {
                    this.__end = previousLink;
                }
                if (link === this.__start) {
                    this.__start = link.next();
                } else {
                    previousLink.setNext(link.next());
                }
                this.__decrementLength();
                return value;
            }
            previousLink = link;
            link = link.next();
        }
    };
    LinkedList.prototype.shift = function () {
        var link = this.__start;
        if (link) {
            this.__start = link.next();
            if (link === this.__end) {
                this.__end = link.next();
            }
            link.setNext(null);
            this.__decrementLength();
            return link.get();
        }
        return null;
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