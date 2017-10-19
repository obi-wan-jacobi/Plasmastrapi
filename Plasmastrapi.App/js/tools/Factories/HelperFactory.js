define(['factory', 'component-factory', 'entity-factory', 'selection-box', 'pose', 'mesh', 'vertex', 'pick-handle', 'validator'],
    function (Factory, ComponentFactory, EntityFactory, SelectionBox, Pose, Mesh, Vertex, PickHandle, validator) {

        HelperFactory.prototype = Object.create(Factory.prototype);
        HelperFactory.prototype.constructor = HelperFactory;
        function HelperFactory(engine) {
            Factory.call(this);
            this.__componentFactory = engine.getFactory(ComponentFactory);
            this.__entityFactory = engine.getFactory(EntityFactory);
        };
        // public methods
        HelperFactory.prototype.createSelectionBox = function () {
            var selectionBox = this.__entityFactory.create(SelectionBox);
            validator.validateInstanceType(this, selectionBox, SelectionBox);
            // add components
            selectionBox.addComponent(this.__componentFactory.createFromPrimitive(new Pose())); // pose
            selectionBox.addComponent(this.__componentFactory.createFromPrimitive(new Rectangle())); // mesh
            selectionBox.addComponent(this.__componentFactory.createFromDataHandle(new PickHandle(function () { }))); // pick
            return selectionBox;
        };
        HelperFactory.prototype.getContainer = function () {
            return this.__entityFactory.getContainer();
        };

        return HelperFactory;
    });