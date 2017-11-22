require(['dictionary'],
function (Dictionary) {

    var dictionary = new Dictionary('object');

    var a = 'a', fa = function (arg) { return console.log(arg); };
    var b = 'b', fb = function (arg) { return console.log(arg); };
    var b2 = 'b2', fb2 = function () { dictionary.remove(a); };
    var c = 'c', fc = function (arg) { return console.log(arg); };
    var d = 'd', fd = function (arg) { dictionary.remove(e); };
    var e = 'e', fe = function (arg) { return console.log(arg); };

    dictionary.add(a, fa);
    dictionary.add(b, fb);
    dictionary.add(b2, fb2);
    dictionary.add(c, fc);
    dictionary.add(d, fd);
    dictionary.add(e, fe);

    dictionary.forEach(function (letter, fn) {
        fn(letter);
    });
});