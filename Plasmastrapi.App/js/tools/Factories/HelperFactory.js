define(['factory', 'selection-box', 'pose', 'rectangle', 'pick-handle', 'validator'],
    function (Factory, SelectionBox, Pose, Rectangle, PickHandle, validator) {

        HelperFactory.prototype = Object.create(Factory.prototype);
        HelperFactory.prototype.constructor = HelperFactory;
        function HelperFactory(engine) {
            Factory.call(this);
            this.__componentFactory = engine.getFactory('component-factory');
            this.__entityFactory = engine.getFactory('entity-factory');
        };
        // public methods
        HelperFactory.prototype.createSelectionBox = function () {
            var selectionBox = this.__entityFactory.create(SelectionBox);
            validator.validateInstanceType(this, selectionBox, SelectionBox);
            // add components
            selectionBox.addComponent(this.__componentFactory.createFromPrimitive(new Pose())); // pose
            selectionBox.addComponent(this.__componentFactory.createFromPrimitive(new Rectangle())); // polygon
            selectionBox.addComponent(this.__componentFactory.createFromDataHandle(new PickHandle(function () { }))); // pick
            return selectionBox;
        };
        HelperFactory.prototype.getContainer = function () {
            return this.__entityFactory.getContainer();
        };

        return HelperFactory;
    });