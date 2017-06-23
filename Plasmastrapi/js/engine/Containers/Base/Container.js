define(['dictionary'],
function (Dictionary) {

    // CLASS Container
    function Container(memberClass) {
        this.__members = new Dictionary(memberClass);
    };
    // public methods
    Container.prototype.forEach = function(fn, caller) {
        return this.__members.forEach(fn, caller);
    };
    Container.prototype.find = function (member) {
        this.__members.get(member);
    };
    Container.prototype.add = function(member) {
        this.__members.add(member);
    };
    Container.prototype.remove = function(member) {
        this.__members.remove(member);
    };

    return Container;
});