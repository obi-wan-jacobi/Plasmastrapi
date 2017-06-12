define(function() {

    function Link(value) {
        this.__value = value;
        this.__next = null; 
    };
    Link.prototype.__validateLink = function(link) {
        if (link && !(link instanceof Link)) {
            throw new Error(this.constructor.name + ':validateLink - ' + link + ' must be an instance of ' + this.constructor.name + ' or must be null.');
        }
    };
    Link.prototype.hasNext = function() {
        return (this.next()) ? true : false;
    };
    Link.prototype.setNext = function(link) {
        this.__validateLink(link);
        this.__next = link;
    };
    Link.prototype.next = function() {
        return this.__next;
    };
    Link.prototype.val = function() {
        return this.__value;
    };

    return Link;
});