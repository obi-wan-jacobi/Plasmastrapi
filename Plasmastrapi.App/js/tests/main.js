require(['game', 'mock-viewport'],
function (Game, MockViewport) {

    //var gate = new Entity();
    //gate.name = 'gate';

    //var output = new Entity();
    //output.name = 'output-terminal';

    //var input = new Entity();
    //input.name = 'input-terminal';

    //var wire = new Entity();
    //wire.name = 'wire';

    //output.setParent(gate);
    //input.setParent(gate);

    //wire.addDependency(output);
    //wire.addDependency(input);

    //gate.destroy();

    var game = new Game(new MockViewport());
    game.start();

    var logicElementFactory = game.getFactory('augmented-logic-element-factory');
    var wireFactory = game.getFactory('augmented-wire-factory');
    var inputTerminalContainer = game.getFactory('terminal-factory').getInputTerminalContainer();
    var outputTerminalContainer = game.getFactory('terminal-factory').getOutputTerminalContainer();

    var gate = logicElementFactory.create('and-gate');

    var inputTerminal = inputTerminalContainer.forEach(function (terminal) {
        return terminal;
    });

    var outputTerminal = outputTerminalContainer.forEach(function (terminal) {
        return terminal;
    });

    var wire = wireFactory.create('wire', [outputTerminal, inputTerminal]);

    gate.destroy();
});