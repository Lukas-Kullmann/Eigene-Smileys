include(functions/add_smilielist.js)
include(functions/addnewsmilie.js)
include(functions/deleteAll.js)
include(functions/getFileName.js)
include(functions/getGet.js)
include(functions/getLang.js)
include(functions/getSmilies.js)
include(functions/hideold.js)
include(functions/loaded.js)

var cPanelFiles = new Array("calendar", "moderation", "private", "profile", "subscription", "usercp");
var editorFiles = new Array("newthread", "newreply", "infraction", "editpost");
var smilies     = getSmilies();
var images      = new Array(); // images to preload
loaded();