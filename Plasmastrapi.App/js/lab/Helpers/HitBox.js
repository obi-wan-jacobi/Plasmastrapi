define(['rectangle', 'position', 'validator'], function (Rectangle, Position, validator) {

    HitBox.prototype = Object.create(Rectangle.prototype);
    HitBox.prototype.constructor = HitBox;
    function HitBox(width, height) {
        Rectangle.call(this, width, height);
    };
    HitBox.prototype.moveTo = function (position) {
        validator.validateInstanceType(this, position, Position);
        for (var i = 0, L = this.vertices.length; i < L; i++) {
            this.vertices[i].x += position.x;
            this.vertices[i].y += position.y;
        }
    }
    HitBox.prototype.contains = function (position) {
        validator.validateInstanceType(this, position, Position);
        var isPositionContained =
            this.vertices[1].x <= position.x &&
            this.vertices[1].y <= position.y &&
            this.vertices[3].x >= position.x &&
            this.vertices[3].y >= position.y;
        return isPositionContained;
    };

    return HitBox;
});