define(['system', 'component-factory', 'pick-component', 'mouse-handle', 'linked-list', 'mesh-component'],
function (System, ComponentFactory, PickComponent, MouseHandle, LinkedList, MeshComponent) {

    // CLASS PickSystem
    PickSystem.prototype = Object.create(System.prototype);
    PickSystem.prototype.constructor = PickSystem;
    function PickSystem(engine) {
        System.call(this);
        var componentFactory = engine.getFactory(ComponentFactory);
        this.__container = componentFactory.getContainer(PickComponent);
        this.__mouseComponent = componentFactory.createFromDataHandle(new MouseHandle());
        this.__inputBuffer = {
            'mousemove': new LinkedList(PickComponent),
            'mousedown': new LinkedList(PickComponent),
            'mouseup': new LinkedList(PickComponent),
        };
    };
    // private methods
    PickSystem.prototype.__oninit = function () {
        this.__mouseComponent.addEventListener('onmousemove', this, this.__buildInputEventCallback('mousemove'));
        this.__mouseComponent.addEventListener('onmousedown', this, this.__buildInputEventCallback('mousedown'));
        this.__mouseComponent.addEventListener('onmouseup', this, this.__buildInputEventCallback('mouseup'));
    };
    PickSystem.prototype.__onload = function () {
        this.__mouseComponent.load();
    };
    PickSystem.prototype.__onunload = function () {
        this.__mouseComponent.unload();
    };
    PickSystem.prototype.__buildInputEventCallback = function (inputBufferKey) {
        return (function (cursor) {
            this.__container.forEach(function (pickComponent) {
                this.__inputBuffer[inputBufferKey].push(pickComponent);
            }, this);
        }).bind(this);
    };
    // public methods
    PickSystem.prototype.loopOnce = function () {
        if (!this.__isLoaded) {
            return;
        }
        var cursor = this.__mouseComponent.getHandle().getData();
        this.__inputBuffer['mousemove'].forEach(function (pickComponent) {
            var entity = pickComponent.getEntity();
            var meshComponent = entity.getComponent(MeshComponent);
            if (meshComponent.getHandle().checkPointCollision(cursor)) {
                pickComponent.getHandle().hover();
            }
            else {
                pickComponent.getHandle().unhover();
            }
        });
        //this.__inputBuffer['mousedown'].forEach(function (pickComponent) {
        //    var entity = pickComponent.getEntity();
        //    var meshComponent = entity.getComponent(MeshComponent);
        //    if (meshComponent.getHandle().checkPointCollision(cursor)) {
        //        pickComponent.getHandle().pick();
        //    }
        //});
        this.__inputBuffer['mouseup'].forEach(function (pickComponent) {
            var entity = pickComponent.getEntity();
            var meshComponent = entity.getComponent(MeshComponent);
            if (meshComponent.getHandle().checkPointCollision(cursor)) {
                pickComponent.getHandle().pick();
            }
        });
        this.__inputBuffer = {
            'mousemove': new LinkedList(PickComponent),
            'mousedown': new LinkedList(PickComponent),
            'mouseup': new LinkedList(PickComponent),
        };
    };

    return PickSystem;
});