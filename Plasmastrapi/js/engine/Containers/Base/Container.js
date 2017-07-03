define(['dictionary', 'validator'],
function (Dictionary, validator) {

    // CLASS Container
    function Container(Type) {
        validator.validateFunction(Type);
        this.__contents = new Dictionary(Type);
    };
    // public methods
    Container.prototype.forEach = function(fn, caller) {
        return this.__contents.forEach(fn, caller);
    };
    Container.prototype.get = function (item) {
        this.__contents.get(item);
    };
    Container.prototype.add = function(item) {
        this.__contents.add(item, item);
    };
    Container.prototype.remove = function(item) {
        this.__contents.remove(item);
    };

    return Container;
});