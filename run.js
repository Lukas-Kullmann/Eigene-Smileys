var cPanelFiles = new Array("calendar", "moderation", "private", "profile", "subscription", "usercp");
var editorFiles = new Array("newthread", "newreply", "infraction", "editpost");
var lang        = new phrases(GM_getValue("lang", "EN"));
var smileys     = getSmileys();
var images      = new Array(); // images to preload
document.onload=loaded();