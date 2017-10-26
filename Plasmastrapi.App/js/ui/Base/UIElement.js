define(['entity', 'component-factory', 'primitive', 'display-settings', 'utils'],
function (Entity, ComponentFactory, Primitive, DisplaySettings, utils) {

    // CLASS UIElement
    UIElement.prototype = Object.create(Entity.prototype);
    UIElement.prototype.constructor = UIElement;
    function UIElement(game) {
        Entity.call(this);

    };
    UIElement.prototype.set = function (data) {
        var baseClass = data;
        if (Object.getPrototypeOf(data).constructor.name === (function () { }).constructor.name) {
            baseClass = function pick() { };
        }
        if (data instanceof Primitive) {
            while (Object.getPrototypeOf(baseClass).constructor.name !== 'Object' && Object.getPrototypeOf(baseClass).constructor.name !== Primitive.name) {
                baseClass = Object.getPrototypeOf(baseClass);
            }
        }
        var modulePrefix = utils.modules.getModulePrefix(baseClass);
        var ComponentType = utils.modules.require(`${modulePrefix}-component`);
        var component = this.getComponent(ComponentType);
        if (data instanceof DisplaySettings) {
            var DisplaySettingsType = utils.modules.require(`${modulePrefix}-display-settings`);
            component.getHandle().setDisplaySettings(data);
        } else {
            component.getHandle().setData(data);
        }
    };

    return UIElement;
});