define(['ko', 'ko-component-viewmodel', 'utils'],
function (ko, KOComponentViewmodel, utils) {

    var componentNames = [
        'viewport-container',
        'diagnostics-container'
    ];

    var components = {
        names: new Set(componentNames)
    };

    components.register = function () {
        this.names.forEach(function (name) {
            var DefaultViewmodel = KOComponentViewmodel.bind.apply(KOComponentViewmodel, [null].concat([`ko-${name}-model`]));
            var RequiredViewModel = utils.modules.requireIfExists(`ko-${name}-viewmodel`);
            if (RequiredViewModel) {
                RequiredViewModel = RequiredViewModel.bind.apply(RequiredViewModel, [null].concat([`ko-${name}-model`]));
            }
            ko.components.register(name, {
                viewModel: RequiredViewModel || DefaultViewmodel,
                template: { require: `text!app/ko-components/${name}/${name}-view.html` }
            });
        });
        utils.logging.info('app/config/components', 'register', 'Knockout components have been registered');
    };

    return components;
});