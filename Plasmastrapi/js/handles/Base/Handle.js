define([], function () {

    function Handle(target, TargetType) {
        this.__target = target
    };
    Handle.prototype.__validateTargetType = function (TargetType) {
        if (!(this.__target instanceof TargetType)) {
            throw new Error(this.constructor.name + ':validateTargetType - ' + this.__target.constructor.name + ' must be of type ' + TargetType.name);
        }
    };

    return Handle;
});