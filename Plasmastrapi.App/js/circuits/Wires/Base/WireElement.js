define(['circuit-element', 'validator'],
function (CircuitElement, validator) {

    // CLASS WireElement
    WireElement.prototype = Object.create(CircuitElement.prototype);
    WireElement.prototype.constructor = WireElement;
    function WireElement() {
        CircuitElement.call(this);
        this.__tail = null;
        this.__head = null;
    };
    WireElement.prototype.connectTail = function (tail) {
        if (this.__tail) {
            validator.throw(this, 'connectTail', `${this.constructor.name} has already received a \'tail\'`)
        }
        this.__tail = tail;
        this.addDependency(this.__tail);
    };
    WireElement.prototype.connectHead = function (head) {
        if (this.__head) {
            validator.throw(this, 'connectHead', `${this.constructor.name} has already received a \'head\'`)
        }
        this.__head = head;
        this.addDependency(this.__head);
    };

    return WireElement;
});