define(['factory'],
function (Factory) {

    DisplaySettingsFactory.prototype = Object.create(Factory.prototype);
    DisplaySettingsFactory.prototype.constructor = DisplaySettingsFactory;
    function DisplaySettingsFactory(engine) {
        Factory.call(this, engine, 'display-settings');
    };

    return DisplaySettingsFactory;
});