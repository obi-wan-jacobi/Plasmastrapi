define(function () {
    var paths = {
        'ko': './lib/knockout-latest',
        'root': './app/root',
        'ko-components': './app/config/components',
        'ko-component-model': './app/ko-components/ko-component/ko-component-model',
        'ko-component-viewmodel': './app/ko-components/ko-component/ko-component-viewmodel'
    };
    var componentNames = [
        'viewport-container'
    ];
    var components = new Set(componentNames);
    components.forEach(function (componentName) {
        // model
        paths[`ko-${componentName}-model`] = `./app/ko-components/${componentName}/${componentName}-model`;
    });
    require.config({ paths: paths });
    return paths;
});