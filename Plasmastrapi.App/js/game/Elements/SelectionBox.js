define(['ui-element', 'container', 'utils'],
function (UIElement, Container, utils) {

    SelectionBox.prototype = Object.create(UIElement.prototype);
    SelectionBox.prototype.constructor = SelectionBox;
    function SelectionBox(engine) {
        UIElement.call(this, engine);
        this.__logicElementContainer = null;
        this.__contents = new Container('logic-element');
        this.__polygonComponent = null;
        this.__startPosition = null;
    };
    SelectionBox.prototype.__oninit = function () {
        UIElement.prototype.__oninit.call(this);
        this.__logicElementContainer = this.__engine.getFactory('logic-element-factory').getContainer();
        this.set('position', [0, 0]);
        this.set('rectangle', [0, 0]);
        this.__polygonComponent = this.getComponent('polygon-component');
    }
    SelectionBox.prototype.__ondestroy = function () {
        if (this.__contents) {
            this.__contents.forEach(function (logicElement) {
                logicElement.destroy();
            }, this);
        }
    };
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
        this.__logicElementContainer.forEach(this.addIfContains, this);
    };
    SelectionBox.prototype.addIfContains = function (element) {
        var elementPosition = element.getComponent('pose-component').getHandle().getPosition();
        if (this.__polygonComponent.getHandle().checkPointCollision(elementPosition)) {
            if (!this.__contents.get(element)) {
                this.__contents.add(element);
                element.getComponent('pick-component').select();
            }
        }
    };
    SelectionBox.prototype.flushContents = function () {
        var contents = this.__contents;
        this.__contents = null;
        return contents;
    };

    return SelectionBox;
});