define(['primitive', 'validator'],
function (Primitive, validator) {

    Text.prototype = Object.create(Primitive.prototype);
    Text.prototype.constructor = Text;
    function Text(string) {
        Primitive.call(this);
        validator.validateInstanceType(this, string, 'string');
        this.string = string;
    };

    return Text;
});