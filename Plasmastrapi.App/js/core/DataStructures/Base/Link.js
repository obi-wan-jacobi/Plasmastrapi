define(['validator'],
function (validator) {

    function Link(value) {
        this.__value = value;
        this.__next = null; 
    };
    Link.prototype.hasNext = function() {
        return (this.next()) ? true : false;
    };
    Link.prototype.setNext = function(link) {
        validator.validateInstanceType(this, link, Link);
        this.__next = link;
    };
    Link.prototype.next = function() {
        return this.__next;
    };
    Link.prototype.get = function() {
        return this.__value;
    };

    return Link;
});