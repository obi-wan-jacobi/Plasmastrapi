define(function () {
    var paths = {
        'ko': './lib/knockout-latest',
        'ko-root': './app/root',
        'ko-components': './app/config/components',
        'ko-component-viewmodel': './app/ko-components/ko-component/ko-component-viewmodel'
    };
    var componentNames = [
        'viewport-container',
        'diagnostics-container'
    ];
    var components = new Set(componentNames);
    components.forEach(function (componentName) {
        paths[`ko-${componentName}-viewmodel`] = `./app/ko-components/${componentName}/${componentName}-viewmodel`;
    });
    require.config({ paths: paths });
    return paths;
});