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

require(['ko', 'ko-root', 'ko-components'],
function (ko, root, components) {
    components.register();
    ko.applyBindings(root);
});

