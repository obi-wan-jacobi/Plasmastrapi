define(['validator'],
function (validator) {

    function Link(value) {
        this.__value = value;
        this.__next = null;
        this.__previous = null;
    };
    Link.prototype.hasNext = function() {
        return (this.next()) ? true : false;
    };
    Link.prototype.hasPrevious = function () {
        return (this.previous()) ? true : false;
    };
    Link.prototype.setNext = function (link) {
        if (link) {
            validator.validateInstanceType(this, link, 'link');
        }
        this.__next = link;
    };
    Link.prototype.setPrevious = function (link) {
        if (link) {
            validator.validateInstanceType(this, link, 'link');
        }
        this.__previous = link;
    };
    Link.prototype.next = function() {
        return this.__next;
    };
    Link.prototype.previous = function () {
        return this.__previous;
    };
    Link.prototype.get = function() {
        return this.__value;
    };

    return Link;
});