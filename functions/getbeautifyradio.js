function getbeautifyradio(){
  var beautify = GM_getValue("beautify", false);
  if(beautify == true){
    return "<input type=\"radio\" name=\"beautify\" value=\"1\" checked>"+lang.set.beautification.y+"<br><input type=\"radio\" name=\"beautify\" value=\"0\">"+lang.set.beautification.n;
  } else {
    return "<input type=\"radio\" name=\"beautify\" value=\"1\">"+lang.set.beautification.y+"<br><input type=\"radio\" name=\"beautify\" value=\"0\" checked>"+lang.set.beautification.n;
  }
}