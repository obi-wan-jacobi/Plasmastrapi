define(function () {
    var paths = {
        'ko': '../node_modules/knockout/build/output/knockout-latest'
    };
    require.config({ paths: paths });
    return paths;
});