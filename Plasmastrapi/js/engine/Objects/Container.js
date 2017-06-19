define(['emitter', 'linked-list'],
function (Emitter, LinkedList) {

    // CLASS Container
    Container.prototype = Object.create(Emitter.prototype);
    Container.prototype.constructor = Container;
    function Container(/* optional */ memberClass) {
        Emitter.call(this);
        this.__members = new LinkedList(memberClass);
        // events
        this.__registerEvents(
            'onadd',
            'onremove'
        );
    };
    // public methods
    Container.prototype.forEach = function(fn, caller) {
        return this.__members.forEach(fn, caller);
    };
    Container.prototype.add = function(member) {
        this.__members.add(member);
        this.__fire('onadd', member);
    };
    Container.prototype.remove = function(member) {
        this.__members.remove(member);
        this.__fire('onremove', member);
    };

    return Container;
});