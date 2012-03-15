function getlangselect(){
  var language = GM_getValue("lang", "EN");
  if(language == "DE"){
    return "<select name=\"lang\"><option value=\"EN\">English</option><option value=\"DE\" selected>Deutsch</option></select>";
  } else {
    return "<select name=\"lang\"><option value=\"EN\" selected>English</option><option value=\"DE\">Deutsch</option></select>";
  }
}