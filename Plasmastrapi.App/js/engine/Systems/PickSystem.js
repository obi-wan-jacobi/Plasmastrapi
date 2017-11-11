define(['system', 'mouse-handle', 'linked-list'],
function (System, MouseHandle, LinkedList) {

    function InputUpdateItem(pickComponent, mousePosition) {
        this.pickComponent = pickComponent;
        this.mousePosition = mousePosition;
    };

    // CLASS PickSystem
    PickSystem.prototype = Object.create(System.prototype);
    PickSystem.prototype.constructor = PickSystem;
    function PickSystem(engine) {
        System.call(this, engine);
        this.__container = null;
        this.__mouseComponent = null;
        this.__inputBuffer = {
            'mousemove': new LinkedList(InputUpdateItem),
            'mousedown': new LinkedList(InputUpdateItem),
            'click': new LinkedList(InputUpdateItem)
        };
    };
    // private methods
    PickSystem.prototype.__oninit = function () {
        System.prototype.__oninit.call(this);
        var componentFactory = this.__engine.getFactory('component-factory');
        this.__container = componentFactory.getContainer('pick-component');
        this.__mouseComponent = componentFactory.createFromDataHandle(new MouseHandle());
        this.__mouseComponent.addEventListener('onmousemove', this, this.__buildInputEventCallback('mousemove'));
        this.__mouseComponent.addEventListener('onmousedown', this, this.__buildInputEventCallback('mousedown'));
        this.__mouseComponent.addEventListener('onclick', this, this.__buildInputEventCallback('click'));
    };
    PickSystem.prototype.__onload = function () {
        System.prototype.__onload.call(this);
        this.__mouseComponent.load();
    };
    PickSystem.prototype.__onunload = function () {
        System.prototype.__onunload.call(this);
        this.__mouseComponent.unload();
    };
    PickSystem.prototype.__buildInputEventCallback = function (inputBufferKey) {
        return (function (mouseHandle) {
            this.__container.forEach(function (pickComponent) {
                this.__inputBuffer[inputBufferKey].push(new InputUpdateItem(pickComponent, mouseHandle.getData()));
            }, this);
        }).bind(this);
    };
    // public methods
    PickSystem.prototype.loopOnce = function () {
        if (!this.__isLoaded) {
            return;
        }
        this.__inputBuffer['mousemove'].forEach(function (updateItem) {
            var pickComponent = updateItem.pickComponent;
            var mousePosition = updateItem.mousePosition;
            var entity = pickComponent.getEntity();
            var polygonComponent = entity.getComponent('polygon-component');
            if (polygonComponent.getHandle().checkPointCollision(mousePosition)) {
                pickComponent.getHandle().hover(mousePosition);
            }
            else {
                pickComponent.getHandle().unhover();
            }
        });
        this.__inputBuffer['mousedown'].forEach(function (updateItem) {
            var pickComponent = updateItem.pickComponent;
            var mousePosition = updateItem.mousePosition;
            var entity = pickComponent.getEntity();
            var polygonComponent = entity.getComponent('polygon-component');
            if (polygonComponent.getHandle().checkPointCollision(mousePosition)) {
                pickComponent.getHandle().poke(mousePosition);
            }
        });
        this.__inputBuffer['click'].forEach(function (updateItem) {
            var pickComponent = updateItem.pickComponent;
            var mousePosition = updateItem.mousePosition;
            var entity = pickComponent.getEntity();
            var polygonComponent = entity.getComponent('polygon-component');
            if (polygonComponent.getHandle().checkPointCollision(mousePosition)) {
                pickComponent.getHandle().pick(mousePosition);
            }
        });
        // Items that have been re-enabled are buffered to prevent their pick actions from overridding/undoing other items'
        // pick actions.
        // Flush the buffer here so that they are iterated over in the 'next' cycle.
        this.__container.flushContentsBuffer();
        this.__inputBuffer = {
            'mousemove': new LinkedList(InputUpdateItem),
            'mousedown': new LinkedList(InputUpdateItem),
            'click': new LinkedList(InputUpdateItem),
        };
    };

    return PickSystem;
});