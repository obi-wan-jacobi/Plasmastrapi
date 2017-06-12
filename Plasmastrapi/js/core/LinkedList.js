define(['link'],
function (Link) {

    // Resolves the issue of traditional for-loops breaking from index instability when contents.length fluctuates throughout the iteration cycle.
    // Index-free iteration.
    function LinkedList(/* optional */ memberClass) {
        this.__memberClass = memberClass;
        this.__start = null;
    };
    LinkedList.prototype.__validateMemberClass = function(item) {
        if (this.__memberClass) {
            if (!(item instanceof this.__memberClass)) {
                throw new Error(this.constructor.name + ':validateMemberClass - ' + item.constructor.name + ' must be an instance of ' + this.__memberClass.constructor.name);
            }
        }
    };
    LinkedList.prototype.__validateNoDuplicateItems = function(item) {
        this.forEach(function(ownedItem) {
            if (ownedItem === item) {
                throw new Error(this.constructor.name + ':validateNoDuplicateItems - Duplicate item found on ' + item + '.');
            }
        }, this);
    };
    LinkedList.prototype.__forEachLink = function (fn) {
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
    LinkedList.prototype.forEach = function(fn, /* optional */ caller) {
        var link = this.__start;
        var result;
        while(link) {
            var item = link.val();
            result = fn.call(caller, item);
            if (result) {
                break;
            }
            link = link.next();
        }
        return result;
    };
    LinkedList.prototype.push = function(item) {
        this.__validateMemberClass(item);
        this.__validateNoDuplicateItems(item);
        var newLink = new Link(item);
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
    LinkedList.prototype.splice = function(item) {
        var previousLink = this.__start;
        return this.__forEachLink(function (link) {
            var ownedItem = link.val();
            if (ownedItem === item) {
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
    LinkedList.prototype.contains = function(item) {
        return this.__forEachLink(function (ownedItem) {
            if (ownedItem === item) {
                return true;
            }
        });
    };

    return LinkedList;
});