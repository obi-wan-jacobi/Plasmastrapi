define(['primitive'],
    function (Primitive) {

        Text.prototype = Object.create(Primitive.prototype);
        Text.prototype.constructor = Text;
        function Text(string) {
            Primitive.call(this);
            validator.validateType(this, string, 'string');
        };

        return Line;
    });