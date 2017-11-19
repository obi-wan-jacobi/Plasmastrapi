define(['ui-element', 'container', 'utils'],
function (UIElement, Container, utils) {

    SelectionBox.prototype = Object.create(UIElement.prototype);
    SelectionBox.prototype.constructor = SelectionBox;
    function SelectionBox(engine) {
        UIElement.call(this, engine);
        this.__primitiveFactory = null;
        this.__logicElementContainer = null;
        this.__contents = new Container('logic-element');
        this.__polygonComponent = null;
        this.__startPosition = null;
        this.__pullPosition = null;
    };
    // private methods
    SelectionBox.prototype.__oninit = function () {
        UIElement.prototype.__oninit.call(this);
        this.__primitiveFactory = this.__engine.getFactory('primitive-factory');
        this.__logicElementContainer = this.__engine.getFactory('logic-element-factory').getContainer();
        this.set('position', [0, 0]);
        this.set('rectangle', [0, 0]);
        this.set('pick-component');
        this.__polygonComponent = this.getComponent('polygon-component');
    }
    SelectionBox.prototype.__ondestroy = function () {
        if (this.__contents) {
            this.__contents.forEach(function (logicElement) {
                logicElement.destroy();
            }, this);
        }
    };
    SelectionBox.prototype.__addIfContains = function (element) {
        var elementPosition = element.getComponent('pose-component').getHandle().getPosition();
        if (this.__polygonComponent.getHandle().checkPointCollision(elementPosition)) {
            if (!this.__contents.get(element)) {
                this.__contents.add(element);
                element.getComponent('pick-component').select();
            }
        } else {
            this.__contents.remove(element);
            element.getComponent('pick-component').deselect();
        }
    };
    // public prototypal variables
    Object.defineProperties(SelectionBox.prototype, {
        'isEmpty': {
            get: function () {
                return this.__contents.toArray().length === 0;
            }
        }
    });
    // public methods
    SelectionBox.prototype.startAt = function (position) {
        utils.validator.validateInstanceType(this, position, 'position');
        this.__startPosition = position;
    };
    SelectionBox.prototype.stretchTo = function (position) {
        utils.validator.validateInstanceType(this, position, 'position');
        var x = this.__startPosition.x + (position.x - this.__startPosition.x) / 2;
        var y = this.__startPosition.y + (position.y - this.__startPosition.y) / 2;
        var width = Math.abs(position.x - this.__startPosition.x);
        var height = Math.abs(position.y - this.__startPosition.y);
        this.set('position', [x, y]);
        this.set('rectangle', [width, height]);
        this.__logicElementContainer.forEach(this.__addIfContains, this);
    };
    SelectionBox.prototype.pullTo = function (position) {
        if (!this.__pullPosition) {
            this.__pullPosition = position;
            return;
        }
        var pose = this.getComponent('pose-component').getData();
        var diffX = (position.x - this.__pullPosition.x);
        var diffY = (position.y - this.__pullPosition.y);
        var x = pose.x + diffX;
        var y = pose.y + diffY;
        this.__pullPosition = position;
        this.set('position', [x, y]);
        this.__contents.forEach(function (element) {
            var elementPosition = element.getComponent('pose-component').getData();
            x = elementPosition.x + diffX;
            y = elementPosition.y + diffY;
            var newPosition = this.__primitiveFactory.create('position', [x, y]);
            element.getComponent('pose-component').setData(newPosition);
        }, this);
    };
    SelectionBox.prototype.getWidth = function () {
        return this.getComponent('polygon-component').getData().getWidth();
    };
    SelectionBox.prototype.getHeight = function () {
        return this.getComponent('polygon-component').getData().getHeight();
    };
    SelectionBox.prototype.flushContents = function () {
        var contents = this.__contents;
        this.__contents = null;
        return contents;
    };

    return SelectionBox;
});