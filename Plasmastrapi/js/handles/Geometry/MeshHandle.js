define(['mesh'], function (Mesh) {

    function MeshHandle(mesh) {
        this.__mesh = mesh
    };
    MeshComponent.prototype.__translate = function (newPosition, oldPosition) {
        var mesh = this.__mesh;
        mesh.minX = mesh.minY = Number.MAX_SAFE_INTEGER;
        mesh.maxX = mesh.maxY = -Number.MAX_SAFE_INTEGER;
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
    MeshComponent.prototype.__rotate = function (newAngle) {
        var position = this.__entity.getComponent(PoseComponent).position;
        var mesh = this.__mesh;
        mesh.minX = mesh.minY = Number.MAX_SAFE_INTEGER;
        mesh.maxX = mesh.maxY = -Number.MAX_SAFE_INTEGER;
        for (var i = 0, L = mesh.vertices.length; i < L; i++) {
            // find 'natural' vertex position relative to origin
            var templateX = mesh.template.vertices[i].x;
            var templateY = mesh.template.vertices[i].y;
            // perform new rotation
            var x = templateX * Math.cos(newAngle) - templateY * Math.sin(newAngle);
            var y = templateX * Math.sin(newAngle) + templateY * Math.cos(newAngle);
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
    // public methods
    MeshComponent.prototype.checkMeshCollision = function (mesh) {

    };
    MeshComponent.prototype.checkPointCollision = function (point) {
        // debugging
        this.__lastPoint = point;
        // find max/min x and y coordinates for a rectangle that bounds the entire mesh
        var mesh = this.__mesh;
        var minX = this.__mesh.minX, maxX = this.__mesh.maxX, minY = this.__mesh.minY, maxY = this.__mesh.maxY;
        // check if we're inside bounding rectangle
        if (point.x <= maxX && point.x >= minX && point.y <= maxY && point.y >= minY) {
            // trace ray from point to (minX, minY)
            // if the number of intersections between a ray and the mesh's sides is odd --> collision detected		
            var numberOfIntersections = 0;
            var vertices = [].concat(mesh.vertices, mesh.vertices[0]);
            var m_ray = (point.y - minY) / (point.x - minX);
            var b_ray = point.y - m_ray * point.x;
            for (var i = 0, L = vertices.length - 1; i < L; i++) {
                var m_side = (vertices[i + 1].y - vertices[i].y) / (vertices[i + 1].x - vertices[i].x);
                m_side = isFinite(m_side) ? m_side : Number.MAX_SAFE_INTEGER;
                var b_side = vertices[i].y - m_side * vertices[i].x;
                var intersectX = (b_side - b_ray) / (m_ray - m_side);
                intersectX = isNaN(intersectX) ? Number.MAX_SAFE_INTEGER : intersectX;
                var intersectY = m_ray * intersectX + b_ray;
                intersectX = Math.round(intersectX * 1000) / 1000;
                intersectY = Math.round(intersectY * 1000) / 1000;
                if (intersectX <= point.x && intersectX >= minX && intersectY <= point.y && intersectY >= minY) {
                    // if the point of intersection is on a vertex located at minX, minY --> check that point is located on the interior to avoid tangent-to-vertex case
                    if (Math.round(intersectX) === Math.round(minX) && Math.round(intersectY) === Math.round(minY)) {
                        var m_side_lower = i > 0
                            ? (vertices[i].y - vertices[i - 1].y) / (vertices[i].x - vertices[i - 1].x)
                            : (vertices[i].y - vertices[L - 1].y) / (vertices[i].x - vertices[L - 1].x);
                        if (m_ray < isNaN(m_side_lower) ? Number.MAX_SAFE_INTEGER : m_side_lower && m_ray > m_side) {
                            return true;
                        }
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
    MeshComponent.prototype.draw = function (ctx) {
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

        // debugging
        if (!config.debug.DEBUG) {
            return;
        }
        this.drawDebug(ctx);
    };
    // debugging
    MeshComponent.prototype.drawDebug = function (ctx) {
        var debug = config.debug.MeshComponent;
        var vertices = this.__mesh.vertices;
        ctx.save();
        for (var i = 0, L = vertices.length; i < L; i++) {
            var vertex = vertices[i];
            ctx.beginPath();
            ctx.arc(vertex.x, vertex.y, 5, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.strokeStyle = debug.vertexStrokeStyle;
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(this.__mesh.minX, this.__mesh.minY, 10, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.strokeStyle = debug.minVertextStrokeStyle;
        ctx.stroke();
        ctx.restore();
        if (this.__lastPoint) {
            ctx.save();
            this.drawPointCollision(ctx);
            ctx.restore();
        }
    };
    MeshComponent.prototype.drawPointCollision = function (ctx) {
        var debug = config.debug.MeshComponent;
        var point = this.__lastPoint;
        // find max/min x and y coordinates for a rectangle that bounds the entire mesh
        var mesh = this.__mesh;
        var minX = this.__mesh.minX, maxX = this.__mesh.maxX, minY = this.__mesh.minY, maxY = this.__mesh.maxY;
        // check if we're inside bounding rectangle
        if (point.x <= maxX && point.x >= minX && point.y <= maxY && point.y >= minY) {
            // trace ray from point to (minX, minY)
            // if the number of intersections between a ray and the mesh's sides is odd --> collision detected		
            var numberOfIntersections = 0;
            var vertices = [].concat(mesh.vertices, mesh.vertices[0]);
            var m_ray = (point.y - minY) / (point.x - minX);
            var b_ray = point.y - m_ray * point.x;
            for (var i = 0, L = vertices.length - 1; i < L; i++) {
                var m_side = (vertices[i + 1].y - vertices[i].y) / (vertices[i + 1].x - vertices[i].x);
                m_side = isFinite(m_side) ? m_side : Number.MAX_SAFE_INTEGER;
                var b_side = vertices[i].y - m_side * vertices[i].x;
                var intersectX = (b_side - b_ray) / (m_ray - m_side);
                intersectX = isNaN(intersectX) ? Number.MAX_SAFE_INTEGER : intersectX;
                var intersectY = m_ray * intersectX + b_ray;
                intersectX = Math.round(intersectX * 1000) / 1000;
                intersectY = Math.round(intersectY * 1000) / 1000;
                ctx.beginPath();
                ctx.arc(intersectX, intersectY, 10, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.strokeStyle = debug.outerCollisionStrokeStyle;
                ctx.stroke();
                if (intersectX <= point.x && intersectX >= minX && intersectY <= point.y && intersectY >= minY) {
                    ctx.beginPath();
                    ctx.arc(intersectX, intersectY, 10, 0, 2 * Math.PI, false);
                    ctx.closePath();
                    ctx.strokeStyle = debug.innerCollisionStrokeStyle;
                    ctx.stroke();
                    // if the point of intersection is on a vertex located at minX, minY --> check that point is located on the interior to avoid tangent-to-vertex case
                    if (Math.round(intersectX) === Math.round(minX) && Math.round(intersectY) === Math.round(minY)) {
                        var m_side_lower = i > 0
                            ? (vertices[i].y - vertices[i - 1].y) / (vertices[i].x - vertices[i - 1].x)
                            : (vertices[i].y - vertices[L - 1].y) / (vertices[i].x - vertices[L - 1].x);
                        if (m_ray < isNaN(m_side_lower) ? Number.MAX_SAFE_INTEGER : m_side_lower && m_ray > m_side) {
                            return true;
                        }
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

    return MeshHandle;
});