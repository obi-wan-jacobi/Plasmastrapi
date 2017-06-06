define([], function () {

    function Primitive() { };
    Primitive.prototype.__validateDataType = function (data, DataType) {
        if (data instanceof Array) {
            for (var i = 0, L = data.length; i < L; i++) {
                validateType(data, DataType);
            }
        }
        validateType(data, DataType);
    };

    function validateType(data, DataType) {
        if (DataType === "number" && isNaN(data) || !(data instanceof DataType)) {
            throw new Error(this.constructor.name + ':validateHandleType - ' + data.constructor.name + ' must be of type ' + DataType.name);
        }
    };

    return Primitive;
});