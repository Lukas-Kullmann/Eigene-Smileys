include(functions/add_smilielist.js);
include(functions/getFileName.js);
include(functions/getGet.js);
include(functions/getLang.js);
var smilies;
(function(jQuery, window, tmpl, JSON){
    include(functions/addnewsmilie.js);
    include(functions/cookies.js);
    include(functions/deleteAll.js);
    include(functions/getSmilies.js);
    include(functions/hideold.js);
    include(functions/loaded.js);

    var cPanelFiles = new Array("calendar", "moderation", "private", "profile", "subscription", "usercp"),
        editorFiles = new Array("newthread", "newreply", "infraction", "editpost");

    smilies = getSmilies();

    loaded();
})(jQuery.noConflict(true), window, tmpl, JSON);