define(function () {

    var $ = {};

    // *** modules ***
    $.nativeTypes = {
        'array': Array,
        'image': Image,
        'keyboard-event': KeyboardEvent,
        'number': Number,
        'object': Object,
        'string': String
    };

    $.isInfoLoggingActiveOnFailedRequires = false;
    // *** /modules ***

    return $;
});