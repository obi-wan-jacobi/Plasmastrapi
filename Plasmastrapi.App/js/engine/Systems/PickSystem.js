define(['system', 'container', 'linked-list'],
function (System, Container, LinkedList) {

    function InputUpdateItem(listener, mousePosition) {
        this.listener = listener;
        this.mousePosition = mousePosition;
    };

    // CLASS PickSystem
    PickSystem.prototype = Object.create(System.prototype);
    PickSystem.prototype.constructor = PickSystem;
    function PickSystem(engine) {
        System.call(this, engine);
        this.__mouseComponent = null;
        this.__container = null;
        this.__inputBuffer = {
            'mousemove': new LinkedList('object'),
            'mousedown': new LinkedList('object'),
            'mouseup': new LinkedList('object'),
            'click': new LinkedList('object')
        };
        this.__externalInputReceivers = new Container('object');
        this.__receiverInputBuffer = {
            'mousemove': new LinkedList('object'),
            'mousedown': new LinkedList('object'),
            'mouseup': new LinkedList('object'),
            'click': new LinkedList('object')
        };
    };
    // private methods
    PickSystem.prototype.__oninit = function () {
        System.prototype.__oninit.call(this);
        this.__container = this.__engine.getFactory('component-factory').getContainer('pick-component');
        this.__mouseComponent = this.__engine.getFactory('component-factory').create('mouse-component');
        this.__mouseComponent.addEventListener('onmousemove', this, this.__buildInputEventCallback('mousemove'));
        this.__mouseComponent.addEventListener('onmousedown', this, this.__buildInputEventCallback('mousedown'));
        this.__mouseComponent.addEventListener('onmouseup', this, this.__buildInputEventCallback('mouseup'));
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
            this.__externalInputReceivers.forEach(function (receiver) {
                this.__receiverInputBuffer[inputBufferKey].push(new InputUpdateItem(receiver, mouseHandle.getData()));
            }, this);
        }).bind(this);
    };
    // public methods
    PickSystem.prototype.loopOnce = function () {
        if (!this.__isLoaded) {
            return;
        }
        // *** mousemove ***
        this.__inputBuffer['mousemove'].forEach(function (updateItem) {
            var pickComponent = updateItem.listener;
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
        this.__receiverInputBuffer['mousemove'].forEach(function (updateItem) {
            var receiver = updateItem.listener;
            var mousePosition = updateItem.mousePosition;
            receiver.mousemove(mousePosition);
        });
        // *** /mousemove ***
        // *** mousedown ***
        this.__inputBuffer['mousedown'].forEach(function (updateItem) {
            var pickComponent = updateItem.listener;
            if (pickComponent.getHandle().isHovered) {
                pickComponent.getHandle().poke();
            }
        });
        this.__receiverInputBuffer['mousedown'].forEach(function (updateItem) {
            var receiver = updateItem.listener;
            var mousePosition = updateItem.mousePosition;
            receiver.mousedown(mousePosition);
        });
        // *** /mousedown ***
        // *** mouseup ***
        this.__inputBuffer['mouseup'].forEach(function (updateItem) {
            var pickComponent = updateItem.listener;
            if (pickComponent.getHandle().isHovered && pickComponent.getHandle().isPoked) {
                pickComponent.getHandle().prod();
            } else {
                pickComponent.getHandle().unpoke();
            }
        });
        this.__receiverInputBuffer['mouseup'].forEach(function (updateItem) {
            var receiver = updateItem.listener;
            var mousePosition = updateItem.mousePosition;
            receiver.mouseup(mousePosition);
        });
        // *** /mouseup ***
        // *** click ***
        this.__inputBuffer['click'].forEach(function (updateItem) {
            var pickComponent = updateItem.listener;
            if (pickComponent.getHandle().isProdded) {
                pickComponent.getHandle().pick();
            } else if (pickComponent.getHandle().isHovered) {
                pickComponent.getHandle().pet();
            }
        });
        this.__receiverInputBuffer['click'].forEach(function (updateItem) {
            var receiver = updateItem.listener;
            var mousePosition = updateItem.mousePosition;
            receiver.click(mousePosition);
        });
        // *** /click ***
        var mousePosition = this.__mouseComponent.getData();
        // Flush the buffer here so that buffered items are included in the 'next' cycle.
        this.__container.flushStagingBuffer(mousePosition);
        this.__inputBuffer = {
            'mousemove': new LinkedList('object'),
            'mousedown': new LinkedList('object'),
            'mouseup': new LinkedList('object'),
            'click': new LinkedList('object'),
        };
        this.__receiverInputBuffer = {
            'mousemove': new LinkedList('object'),
            'mousedown': new LinkedList('object'),
            'mouseup': new LinkedList('object'),
            'click': new LinkedList('object')
        };
        return true;
    };
    // public methods
    PickSystem.prototype.registerInputReceiver = function (receiver) {
        this.__externalInputReceivers.add(receiver);
    };
    PickSystem.prototype.unregisterInputReceiver = function (receiver) {
        this.__externalInputReceivers.remove(receiver);
    };

    return PickSystem;
});