define(['linked-list', 'link', 'validator'],
function (LinkedList, Link, validator) {

    Dictionary.prototype = Object.create(LinkedList.prototype);
    Dictionary.prototype.constructor = Dictionary;
    function Dictionary(typeString) {
        LinkedList.call(this, typeString);
    };
    // private methods
    Dictionary.prototype.__validateNoDuplicateKeys = function(key) {
        this.forEach(function(linkKey) {
            if (linkKey === key) {
                validator.throw(this, 'validateNoDuplicateKeys', `Duplicate key: ${key}`);
            }
        }, this);
    };
    // public methods
    Dictionary.prototype.forEach = function (fn, /* optional */ caller) {
        return this.__forEachLink(function (link) {
            return fn.call(caller, link.get().key, link.get().value);
        });
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
    LinkedList.prototype.remove = function (key) {
        var link = this.__start;
        var previousLink;
        while (link) {
            var ownedvalue = link.get().key;
            if (ownedvalue === key) {
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
                return link.get().value;
            }
            previousLink = link;
            link = link.next();
        }
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