require(['game', 'mock-canvas', 'entity'],
function (Game, MockCanvas, Entity) {

    //var game = new Game(new MockCanvas());

    //game.start();

    //var logicElementFactory = game.getFactory('augmented-logic-element-factory');
    //var inputTerminalContainer = game.getFactory('augmented-terminal-factory').getInputTerminalContainer;
    //var outputTerminalContainer = game.getFactory('augmented-terminal-factory').getInputTerminalContainer;
    //var wireFactory = game.getFactory('augmented-wire-factory');

    //var gate = logicElementFactory.create('and-gate');

    //gate.destroy();

    //var a = new Entity();
    //a.name = 'logic-element';
    var b = new Entity();
    b.name = 'terminal';
    var c = new Entity();
    c.name = 'terminal-anchor';
    var d = new Entity();
    d.name = 'wire';

    //b.addDependency(a);

    c.addDependency(b);

    d.addDependency(b);
    d.addDependency(c);

    b.destroy();
});