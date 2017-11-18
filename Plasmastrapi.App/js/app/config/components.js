define(['ko', 'ko-component-viewmodel', 'utils'],
function (ko, KOComponentViewmodel, utils) {

    var componentNames = [
        'viewport-container'
    ];

    var components = {
        names: new Set(componentNames)
    };

    components.register = function () {
        this.names.forEach(function (name) {
            ko.components.register(name, {
                viewModel: { require: `app/ko-components/${name}/${name}-viewmodel` },
                template: { require: `text!app/ko-components/${name}/${name}-view.html` }
            });
        });
    };

    return components;
});