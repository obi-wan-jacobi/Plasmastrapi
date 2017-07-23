define(['system', 'component-factory', 'pick-component', 'mouse-handle'],
function (System, ComponentFactory, PickComponent, MouseHandle) {

    // CLASS PickSystem
    PickSystem.prototype = Object.create(System.prototype);
    PickSystem.prototype.constructor = PickSystem;
    function PickSystem(engine) {
        System.call(this);
        var componentFactory = engine.getFactory(ComponentFactory);
        this.__container = componentFactory.getContainer(PickComponent);
        this.__mouseComponent = componentFactory.createFromDataHandle(new MouseHandle());
        this.__onmousemovePicks = [];
        this.__onmousedownPicks = [];
        this.__onmouseupPicks = [];
    };
    // private methods
    PickSystem.prototype.__oninit = function () {
        this.__mouseComponent.addEventListener('onmousemove', this, this.__getMousemovePicks.bind(this));
        this.__mouseComponent.addEventListener('onmousedown', this, this.__getMousedownPicks.bind(this));
        this.__mouseComponent.addEventListener('onmouseup', this, this.__getMouseupPicks.bind(this));
    };
    PickSystem.prototype.__onload = function () {
        this.__mouseComponent.load();
    };
    PickSystem.prototype.__onunload = function () {
        this.__mouseComponent.unload();
    };
    PickSystem.prototype.__getMousemovePicks = function (cursorPosition) {
        this.__container.forEach(function (pickComponent) {
            this.__pickIfCursorPointCollisionOnEntityMesh(cursorPosition, this.__onmousemovePicks);
        }, this);
    };
    PickSystem.prototype.__getMousedownPicks = function (cursorPosition) {

    };
    PickSystem.prototype.__getMouseupPicks = function (cursorPosition) {

    };
    PickSystem.prototype.__pickIfCursorPointCollisionOnEntityMesh = function (pickComponent, picksArray) {
        if () {
            picksArray.push(pickComponent);
        }
    };
    // public methods
    PickSystem.prototype.loopOnce = function () {

    };

    return PickSystem;
});

/*
MouseComponent.prototype.__isCursorWithinMeshBoundary = function (cursor) {
    var meshComponent = this.__entity.getComponent(MeshComponent);
    return meshComponent.getHandle().checkPointCollision(cursor);
};
*/