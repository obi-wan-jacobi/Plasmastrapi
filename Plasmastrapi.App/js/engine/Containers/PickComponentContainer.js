define(['component-container', 'container'],
function (ComponentContainer, Container) {

    PickComponentContainer.prototype = Object.create(ComponentContainer.prototype);
    PickComponentContainer.prototype.constructor = PickComponentContainer;
    function PickComponentContainer() {
        ComponentContainer.call(this, 'pick-component');
        this.__stagingBuffer = [];
    };
    // private methods
    PickComponentContainer.prototype.__removeFromStagingBuffer = function (component) {
        // Items that become unloaded or disabled while being hosted in the staging buffer must
        // subsequently be removed from the staging buffer.
        var idx = this.__stagingBuffer.indexOf(component);
        this.__stagingBuffer.splice(idx, 1);
    };
    PickComponentContainer.prototype.__onComponentLoad = function (component) {
        if (component.isEnabled) {
            this.__stagingBuffer.push(component);
        }
        component.removeEventListener('onload', this, this.__onComponentLoad.bind(this, component));
        component.addEventListener('onunload', this, this.__onComponentUnload.bind(this, component));
    };
    PickComponentContainer.prototype.__onComponentUnload = function (component) {
        ComponentContainer.prototype.__onComponentUnload.call(this, component);
        this.__removeFromStagingBuffer(component);  
    };
    PickComponentContainer.prototype.__onComponentEnable = function (component) {
        if (component.isLoaded) {
            this.__stagingBuffer.push(component);
        }
        component.removeEventListener('onenable', this, this.__onComponentEnable.bind(this, component));
        component.addEventListener('ondisable', this, this.__onComponentDisable.bind(this, component));
    };
    PickComponentContainer.prototype.__onComponentDisable = function (component) {
        ComponentContainer.prototype.__onComponentDisable.call(this, component);
        this.__removeFromStagingBuffer(component);
    };
    // public methods
    ComponentContainer.prototype.add = function (component) {
        this.__initEventCallbacks(component);
        if (component.isLoaded && component.isEnabled) {
            this.__stagingBuffer.push(component);
        }
    };
    PickComponentContainer.prototype.flushStagingBuffer = function (mousePosition) {
        // Items that have been re-enabled/re-loaded are buffered to prevent their pick actions from overridding/undoing other items'
        // pick actions.
        // Receive the current mouse position to account for items that will be enabled/loaded immediately into a 'hovered' state
        while (this.__stagingBuffer.length > 0) {
            var pickComponent = this.__stagingBuffer.shift();
            Container.prototype.add.call(this, pickComponent);
            var entity = pickComponent.getEntity();
            var polygonComponent = entity.getComponent('polygon-component');
            if (polygonComponent.getHandle().checkPointCollision(mousePosition)) {
                pickComponent.getHandle().hover(mousePosition);
            }
        }
    };

    return PickComponentContainer;
});