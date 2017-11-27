define(['link', 'validator'],
function (Link, validator) {

    // Resolves the issue of traditional for-loops breaking from index instability when contents.length fluctuates throughout the iteration cycle.
    // Provides index-free iteration.
    function LinkedList(typeString) {
        validator.validateInstanceType(this, typeString, 'string');
        this.__typeString = typeString;
        this.__start = new Link('start');
        this.__end = new Link('end');
        this.__start.setNext(this.__end);
        this.__end.setPrevious(this.__start);
        this.__length = 0;
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
    LinkedList.prototype.__forEachLink = function (fn) {
        var link = this.__start.next();
        while (link.next() !== null) {
            var result = fn.call(this, link);
            // if fn returns a valid result
            if (result !== null && result !== undefined) {
                // effectively 'break' out of the loop with the result
                return result;
            }
            // if the current link being held for iteration has been freed
            if (link.next() === null) {
                // revert to the previous non-freed link
                link = link.previous();
            }
            // process the next link
            link = link.next();
        }
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
    LinkedList.prototype.forEach = function(fn, /* optional */ caller) {
        return this.__forEachLink(function (link) {
            return fn.call(caller, link.get());
        });
    };
    LinkedList.prototype.push = function(value) {
        validator.validateInstanceType(this, value, this.__typeString);
        var newLink = new Link(value);
        if (this.length === 0) {
            this.__start.setNext(newLink);
            newLink.setPrevious(this.__start);
            newLink.setNext(this.__end);
            this.__end.setPrevious(newLink);

        } else {
            var oldLinkBeforeEnd = this.__end.previous();
            oldLinkBeforeEnd.setNext(newLink);
            newLink.setPrevious(oldLinkBeforeEnd);
            newLink.setNext(this.__end);
            this.__end.setPrevious(newLink);
        }
        this.__incrementLength();
    };
    LinkedList.prototype.splice = function(value) {
        return this.__forEachLink(function (link) {
            if (link.get() === value) {
                var previous = link.previous();
                var next = link.next();
                previous.setNext(next);
                next.setPrevious(previous);
                // A freed link can be identified by the fact that it has a null next() value
                link.setNext(null);
                this.__decrementLength();
                return link.get();
            }
        });
    };
    LinkedList.prototype.shift = function () {
        if (this.length > 0) {
            return this.splice(this.__start.next().get());
        } else {
            return null;
        }
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