define(['input-handler', 'validator'],
function (InputHandler, validator) {

    WireTool.prototype = Object.create(InputHandler.prototype);
    WireTool.prototype.constructor = WireTool;
    function WireTool(engine, target) {
        InputHandler.call(this, engine);
        this.__wireFactory = this.__engine.getFactory('augmented-wire-factory');
        this.__labController = this.__engine.getController('lab-controller');
        this.__logicElementContainer = this.__engine.getFactory('logic-element-factory').getContainer();
        this.__wireContainer = this.__engine.getFactory('wire-factory').getContainer();
        this.__inputTerminalContainer = this.__engine.getFactory('terminal-factory').getInputTerminalContainer();
        this.__outputTerminalContainer = this.__engine.getFactory('terminal-factory').getOutputTerminalContainer();
        this.__target = target;
        this.__anchor = null;
    };
    // private methods
    WireTool.prototype.__oninit = function () {
        this.__anchor = this.__wireFactory.createAnchorWiredToTerminal(this.__target)
        var currentMousePosition = this.__engine.getController('input-controller').getMousePosition();
        this.__anchor.getComponent('pose-component').setData(currentMousePosition);
    };
    WireTool.prototype.__onload = function () {
        // Disable everything except for the complimentary terminal types
        function disableElement(element) {
            element.getComponent('pick-component').disable();
        };
        this.__logicElementContainer.forEach(disableElement);
        this.__wireContainer.forEach(disableElement);
        if (validator.isInstanceOfType(this.__target, 'input-terminal')) {
            this.__inputTerminalContainer.forEach(disableElement);
        } else if (validator.isInstanceOfType(this.__target, 'output-terminal')) {
            this.__outputTerminalContainer.forEach(disableElement);
        }
    };
    WireTool.prototype.__onunload = function () {
        // Re-enable everything
        function enableElement(element) {
            element.getComponent('pick-component').enable();
        };
        this.__logicElementContainer.forEach(enableElement);
        this.__wireContainer.forEach(enableElement);
        if (validator.isInstanceOfType(this.__target, 'input-terminal')) {
            this.__inputTerminalContainer.forEach(enableElement);
        } else if (validator.isInstanceOfType(this.__target, 'output-terminal')) {
            this.__outputTerminalContainer.forEach(enableElement);
        }
    };
    // public methods
    WireTool.prototype.keydown = function () {
    };
    WireTool.prototype.keyup = function () {
    };
    WireTool.prototype.enter = function () {
    };
    WireTool.prototype.escape = function () {
    };
    WireTool.prototype.mousemove = function (position) {
        this.__anchor.getComponent('pose-component').getHandle().setPosition(position);
    };
    WireTool.prototype.mousedown = function () {
    };
    WireTool.prototype.mouseup = function () {
    };
    WireTool.prototype.click = function () {
        var terminal = this.__labController.flushTarget();
        if (terminal) {
            if (validator.isInstanceOfType(terminal, 'input-terminal')) {
                this.__wireFactory.create('wire', this.__target, terminal);
            } else if (validator.isInstanceOfType(terminal, 'output-terminal')) {
                this.__wireFactory.create('wire', terminal, this.__target);
            } else {
                validator.throw(this, 'onclick',
                    `Wiring attempt made on incompatible types: ${this.__target.constructor.name} + ${terminal.constructor.name}`
                );
            }
        }
        this.__labController.idle();
    };
    WireTool.prototype.dispose = function () {
        this.unload();
        if (this.__anchor) {
            this.__anchor.destroy();
        }
        this.__target = null;
        this.__anchor = null;
    };

    return WireTool;
});