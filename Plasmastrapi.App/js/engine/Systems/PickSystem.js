define(['system', 'linked-list'],
function (System, LinkedList) {

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
        this.__inputBuffer = {
            'mousemove': new LinkedList('object'),
            'mousedown': new LinkedList('object'),
            'click': new LinkedList('object')
        };
    };
    // private methods
    PickSystem.prototype.__oninit = function () {
        System.prototype.__oninit.call(this);
        this.__container = this.__engine.getFactory('component-factory').getContainer('pick-component');
        var mouseComponent = this.__engine.getController('input-controller').getMouseComponent();
        mouseComponent.addEventListener('onmousemove', this, this.__buildInputEventCallback('mousemove'));
        mouseComponent.addEventListener('onmousedown', this, this.__buildInputEventCallback('mousedown'));
        mouseComponent.addEventListener('onclick', this, this.__buildInputEventCallback('click'));
    };
    PickSystem.prototype.__onload = function () {
        System.prototype.__onload.call(this);
    };
    PickSystem.prototype.__onunload = function () {
        System.prototype.__onunload.call(this);
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
            'mousemove': new LinkedList('object'),
            'mousedown': new LinkedList('object'),
            'click': new LinkedList('object'),
        };
    };

    return PickSystem;
});