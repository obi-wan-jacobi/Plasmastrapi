define(['rectangle', 'position', 'validator'], function (Rectangle, Position, validator) {

    HitBox.prototype = Object.create(Rectangle.prototype);
    HitBox.prototype.constructor = HitBox;
    function HitBox(width, height) {
        Rectangle.call(this, width, height);
    };
    HitBox.prototype.contains = function (position) {
        validator.validateInstanceType(this, position, Position);
        var isPositionContained =
            position.x > this.vertices[1].x &&
            position.y > this.vertices[1].y &&
            position.x < this.vertices[3].x &&
            position.y < this.vertices[3].y;
        return isPositionContained;
    };

    return HitBox;
});