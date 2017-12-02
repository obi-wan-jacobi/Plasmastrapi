define(['tool-handler', 'validator'],
function (ToolHandler, validator) {

    WireTool.prototype = Object.create(ToolHandler.prototype);
    WireTool.prototype.constructor = WireTool;
    function WireTool(engine, target) {
        ToolHandler.call(this, engine);
        this.__wireFactory = this.__engine.getFactory('augmented-wire-factory');
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
        // Enable the complimentary terminal types
        if (validator.isInstanceOfType(this.__target, 'input-terminal')) {
            this.__enableAll('output-terminal');
        } else if (validator.isInstanceOfType(this.__target, 'output-terminal')) {
            this.__enableAll('input-terminal');
        }
    };
    WireTool.prototype.__onunload = function () {
        // Disable the complimentary terminal types
        if (validator.isInstanceOfType(this.__target, 'input-terminal')) {
            this.__disableAll('output-terminal');
        } else if (validator.isInstanceOfType(this.__target, 'output-terminal')) {
            this.__disableAll('input-terminal');
        }
    };
    // public methods
    WireTool.prototype.keydown = function (keyboardHandle) {
        ToolHandler.prototype.keydown.call(this, keyboardHandle);
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
                this.__wireFactory.create('wire', [this.__target, terminal]);
            } else if (validator.isInstanceOfType(terminal, 'output-terminal')) {
                this.__wireFactory.create('wire', [terminal, this.__target]);
            } else {
                validator.throw(this, 'click',
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