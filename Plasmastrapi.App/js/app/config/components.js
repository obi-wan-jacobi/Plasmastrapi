define(['ko', 'ko-root', 'ko-component-viewmodel', 'utils'],
function (ko, root, KOComponentViewmodel, utils) {

    var componentNames = [
        'viewport-container',
        'diagnostics-container'
    ];

    var components = {
        names: new Set(componentNames)
    };

    components.register = function () {
        this.names.forEach(function (name) {
            var RequiredViewmodel = utils.modules.requireIfExists(`ko-${name}-viewmodel`);
            var ViewmodelType = RequiredViewmodel || KOComponentViewmodel;
            var viewmodelInstance = new ViewmodelType();
            root[`${name}-viewmodel`] = viewmodelInstance;
            ko.components.register(name, {
                viewModel: { instance: viewmodelInstance },
                template: { require: `text!app/ko-components/${name}/${name}-view.html` }
            });
        });
        utils.logging.info('app/config/components', 'register', 'Knockout components have been registered');
    };

    return components;
});