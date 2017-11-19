define(['utils'],
function (utils) {

    function extend(target, source) {
        var SourcePrototype = Object.getPrototypeOf(source);
        for (var propertyName in SourcePrototype) {
            if (SourcePrototype.hasOwnProperty(propertyName) && propertyName !== 'constructor') {
                target[propertyName] = SourcePrototype[propertyName];
            }
        }
        for (var propertyName in source) {
            if (source.hasOwnProperty(propertyName) && propertyName !== 'constructor') {
                target[propertyName] = source[propertyName];
            }
        }
    }

    function KOComponentViewmodel(modelModuleString) {
        var model = utils.modules.require(modelModuleString);
        extend(this, model);
    };
    KOComponentViewmodel.prototype.afterRender = function () {
    };

    return KOComponentViewmodel; 
});