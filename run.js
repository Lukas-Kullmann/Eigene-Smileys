include(helpers.js)
include(functions/add_smileylist.js)
include(functions/addnewsmiley.js)
include(functions/getadjustmentradio.js)
include(functions/getbeautifyradio.js)
include(functions/getFileName.js)
include(functions/getGet.js)
include(functions/getlangselect.js)
include(functions/getSmileys.js)
include(functions/hideold.js)
include(functions/loaded.js)
include(functions/phrases.js)

var cPanelFiles = new Array("calendar", "moderation", "private", "profile", "subscription", "usercp");
var editorFiles = new Array("newthread", "newreply", "infraction", "editpost");
var lang        = new phrases(GM_getValue("lang", "EN"));
var smileys     = getSmileys();
var images      = new Array(); // images to preload
document.onload=loaded();