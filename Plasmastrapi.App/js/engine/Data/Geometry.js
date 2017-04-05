define(function() {
    
    var $ = {};

    // utility methods
    function pow2(arg) {
        return Math.pow(arg, 2);
    };

    function euclideanDistance(p1, p2) {
        return Math.sqrt(pow2(p2.x - p1.x) + pow2(p2.y - p1.y));
    };
    $.euclideanDistance = euclideanDistance;

    // objects
    $.Position = function Position(x, y) {
		this.x = x;
		this.y = y;
	};

    $.Vector = function Vector(i, j) {
		this.i = i;
		this.j = j;
	};

    $.PolarCoordinate = function PolarCoordinate(magnitude, angle) {
        this.r = magnitude;
        this.a = angle;
    };

    $.Shape = function Shape(vertices) {
        this.vertices = vertices;
    };

    Rectangle.prototype = Object.create($.Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;
    function Rectangle(width, height) {
        $.Shape.call(this, [
            // follow CAST pattern (account for canvas y-axis inversion)
            new $.Position(width/2, -height/2),
            new $.Position(-width/2, -height/2),
            new $.Position(-width/2, height/2),
            new $.Position(width/2, height/2)
        ]);
    };
    $.Rectangle = Rectangle;

    $.Mesh = function Mesh(shape) {
        // mesh has an 'immutable' vertex template 
        this.template = shape;
        // mesh has a collection of 'current' vertex positions
        this.vertices = [];
        for (var i = 0, L = shape.vertices.length; i < L; i++) {
            this.vertices.push(new $.Position(shape.vertices[i].x, shape.vertices[i].y));
        }
    };

    return $;

});