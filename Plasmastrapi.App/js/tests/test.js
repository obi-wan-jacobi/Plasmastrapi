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

    var a = new Entity();
    var b = new Entity();
    var c = new Entity();
    var d = new Entity();

    b.addDependency(a);

    c.addDependency(b);

    d.addDependency(b);
    d.addDependency(c);

    a.destroy();
});