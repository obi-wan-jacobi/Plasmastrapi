define(["../Objects/Component", "../Data/Geometry", "./PoseComponent"],
    function (Component, Geometry, PoseComponent) {

	// CLASS MeshComponent
	MeshComponent.prototype = Object.create(Component.prototype);
	MeshComponent.prototype.constructor = MeshComponent;
    function MeshComponent(mesh, /* options */ meshDisplayOptions) {
		// inherits from
		Component.call(this);
		// private variables
		this.__mesh = mesh;
		this.__options = meshDisplayOptions;
        // apply mixins
		if (this.__options) {
		    Component.Mixins.Drawable.call(this, this.__options.displayLayer);
		}
	};
	// private methods
	MeshComponent.prototype.__oninit = function() {
		// trigger mesh translation to current pose location
		this.mesh = this.__mesh;
	};
	MeshComponent.prototype.__onload = function() {
		var poseComponent = this.__entity.getComponent(PoseComponent);
		if (!poseComponent) {
			throw new Error(this.constructor.name + ':__onload - ' + this.__entity.constructor.name + ' does not contain a PoseComponent.');
		}
		poseComponent.addEventListener('onpositionchange', this, this.__translate);
		poseComponent.addEventListener('onorientationchange', this, this.__rotate);
	};
	MeshComponent.prototype.__onunload = function() {
		var poseComponent = this.__entity.getComponent(PoseComponent);
		poseComponent.removeEventListener('onpositionchange', this, this.__translate);
		poseComponent.removeEventListener('onorientationchange', this, this.__rotate);
	};
	MeshComponent.prototype.__translate = function(newPosition, oldPosition) {
	    var mesh = this.__mesh;
	    mesh.maxX = mesh.minX = mesh.vertices[0].x;
	    mesh.maxY = mesh.minY = mesh.vertices[0].y;
		for (var i = 0, L = mesh.vertices.length; i < L; i++) {
			mesh.vertices[i].x += (newPosition.x - oldPosition.x);
			mesh.vertices[i].y += (newPosition.y - oldPosition.y);
		    // get min/max X and min/max Y for collision checking purposes
			if (mesh.maxX < mesh.vertices[i].x) {
			    mesh.maxX = mesh.vertices[i].x;
			}
			if (mesh.minX > mesh.vertices[i].x) {
			    mesh.minX = mesh.vertices[i].x;
			}
			if (mesh.maxY < mesh.vertices[i].y) {
			    mesh.maxY = mesh.vertices[i].y;
			}
			if (mesh.minY > mesh.vertices[i].y) {
			    mesh.minY = mesh.vertices[i].y;
			}
		};
	};
	MeshComponent.prototype.__rotate = function(newAngle) {
		var position = this.__entity.getComponent(PoseComponent).position;
		var mesh = this.__mesh;
		mesh.maxX = mesh.minX = mesh.vertices[0].x;
		mesh.maxY = mesh.minY = mesh.vertices[0].y;
		for (var i = 0, L = mesh.vertices.length; i < L; i++) {
			// find 'natural' vertex position relative to origin
			var templateX = mesh.template.vertices[i].x;
			var templateY = mesh.template.vertices[i].y;
			// perform new rotation
			var x = templateX*Math.cos(newAngle) - templateY*Math.sin(newAngle);
			var y = templateX*Math.sin(newAngle) + templateY*Math.cos(newAngle);
			// re-translate vertex back to current relative position
			mesh.vertices[i].x = position.x + x; 
			mesh.vertices[i].y = position.y + y;
		    // get min/max X and min/max Y for collision checking purposes
			if (mesh.maxX < mesh.vertices[i].x) {
			    mesh.maxX = mesh.vertices[i].x;
			}
			if (mesh.minX > mesh.vertices[i].x) {
			    mesh.minX = mesh.vertices[i].x;
			}
			if (mesh.maxY < mesh.vertices[i].y) {
			    mesh.maxY = mesh.vertices[i].y;
			}
			if (mesh.minY > mesh.vertices[i].y) {
			    mesh.minY = mesh.vertices[i].y;
			}
		};
	};
	// public prototypal variables
	Object.defineProperties(MeshComponent.prototype, {
		'mesh': {
			get: function() {
				return this.__mesh;
			},
			set: function(mesh) {
				if (!(mesh instanceof Geometry.Mesh)) {
					throw new Error(this.constructor.name + ':mesh set - ' + mesh + ' is not an instance of Geometry.Mesh.');
				}
				this.__mesh = mesh;
				var poseComponent = this.__entity.getComponent(PoseComponent);
				this.__translate(poseComponent.position, new Geometry.Position(0, 0));
				this.__rotate(poseComponent.orientation);
			}
		},
		'displayOptions': {
		    get: function () {
		        return this.__options;
		    },
		    set: function (displayOptions) {
		        if (!this.__options) {
		            throw new Error(this.constructor.name + ':displayOptions set - Display options can only be replaced, not inject.');
		        }
		        if (!displayOptions.displayLayer === this.__options.displayLayer) {
                    throw new Error(this.constructor.name + ':displayOptions set - The display layer cannot be modified at this level.')
		        }
		        this.__options = displayOptions
		    }
		}
	});
	// public methods
	MeshComponent.prototype.checkMeshCollision = function(mesh) {

	};
	MeshComponent.prototype.checkPointCollision = function(point) {
	    // find max/min x and y coordinates for a rectangle that bounds the entire mesh
	    var mesh = this.__mesh;
	    var minX = this.__mesh.minX, maxX = this.__mesh.maxX, minY = this.__mesh.minY, maxY = this.__mesh.maxY;
		// check if we're inside bounding rectangle
		if (point.x <= maxX && point.x >= minX && point.y <= maxY && point.y >= minY) {
			// trace ray from point to (minX, minY)
		    // if the number of intersections between a ray and the mesh's sides is odd --> collision detected		
		    var numberOfIntersections = 0;
		    var vertices = [].concat(mesh.vertices, mesh.vertices[0]);
		    var m_ray = (minY - point.y) / (minX - point.x);
		    var b_ray = point.y - m_ray * point.x;
			for (var i = 0, L = vertices.length - 2; i < L; i++) {
			    var m_side = (vertices[i + 1].y - vertices[i].y) / (vertices[i + 1].x - vertices[i].x);
			    var b_side = vertices[i].y - m_side * vertices[i].x;
			    var intersectX = Math.round((b_side - b_ray) / (m_ray - m_side));
			    var intersectY = Math.round(m_ray * intersectX + b_ray);
			    if (intersectX <= point.x && intersectX >= minX && intersectY <= point.y && intersectY >= minY) {
			        // if the point of intersection is on a vertex located at minX, minY --> collision detected
			        if (intersectX === minX && intersectY === minY) {
			            return true;
			        } else {
			            numberOfIntersections++;
			        }
			    }
			}
			
			if (numberOfIntersections % 2 == 1) {
			    return true;
			}
		}
		return false;
	};
	MeshComponent.prototype.draw = function(ctx) {
	    if (!this.__options) {
	        return;
	    }
	    var vertices = this.__mesh.vertices;
		var options = this.__options;
		// draw mesh and apply options
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(vertices[0].x, vertices[0].y);
		for (var i = 1, L = vertices.length; i < L; i++) {
			var vertex = vertices[i];
			ctx.lineTo(vertex.x, vertex.y);
		}
		ctx.closePath();
		ctx.strokeStyle = options.strokeStyle;
		ctx.lineWidth = options.lineWidth;
		ctx.stroke()
		if (options.fillStyle) {
		    ctx.fillStyle = options.fillStyle;
		    ctx.fill();
		}
		ctx.restore();
	};

	return MeshComponent;
});