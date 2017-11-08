define(['system', 'pick-component', 'mouse-handle', 'linked-list'],
function (System, PickComponent, MouseHandle, LinkedList) {

    // CLASS PickSystem
    PickSystem.prototype = Object.create(System.prototype);
    PickSystem.prototype.constructor = PickSystem;
    function PickSystem(engine) {
        System.call(this);
        var componentFactory = engine.getFactory('component-factory');
        this.__container = componentFactory.getContainer('pick-component');
        this.__mouseComponent = componentFactory.createFromDataHandle(new MouseHandle());
        this.__inputBuffer = {
            'mousemove': new LinkedList(PickComponent),
            'mousedown': new LinkedList(PickComponent),
            'click': new LinkedList(PickComponent),
        };
    };
    // private methods
    PickSystem.prototype.__oninit = function () {
        this.__mouseComponent.addEventListener('onmousemove', this, this.__buildInputEventCallback('mousemove'));
        this.__mouseComponent.addEventListener('onmousedown', this, this.__buildInputEventCallback('mousedown'));
        this.__mouseComponent.addEventListener('onclick', this, this.__buildInputEventCallback('click'));
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
            var polygonComponent = entity.getComponent('polygon-component');
            if (polygonComponent.getHandle().checkPointCollision(cursor)) {
                pickComponent.getHandle().hover();
            }
            else {
                pickComponent.getHandle().unhover();
            }
        });
        //this.__inputBuffer['mousedown'].forEach(function (pickComponent) {
        //    var entity = pickComponent.getEntity();
        //    var polygonComponent = entity.getComponent(PolygonComponent);
        //    if (polygonComponent.getHandle().checkPointCollision(cursor)) {
        //        pickComponent.getHandle().pick();
        //    }
        //});
        this.__inputBuffer['click'].forEach(function (pickComponent) {
            var entity = pickComponent.getEntity();
            var polygonComponent = entity.getComponent('polygon-component');
            if (polygonComponent.getHandle().checkPointCollision(cursor)) {
                pickComponent.getHandle().pick();
            }
        });
        this.__inputBuffer = {
            'mousemove': new LinkedList(PickComponent),
            'mousedown': new LinkedList(PickComponent),
            'click': new LinkedList(PickComponent),
        };
    };

    return PickSystem;
});