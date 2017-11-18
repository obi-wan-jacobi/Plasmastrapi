require(['ko'],
function (ko) {
    ko.bindingHandlers.afterRender = {
        init: function (element, valueAccessor, allBindings, viewModel) {
            var callback = valueAccessor();

            if (typeof callback === 'function') {
                callback.call(viewModel, element, viewModel);
            }
        }
    };
});

require(['ko', 'root', 'ko-components', 'logging'],
function (ko, root, components, logging) {
    logging.info(root, 'main', 'Register knockout components');
    components.register();
    ko.applyBindings(root);
});

