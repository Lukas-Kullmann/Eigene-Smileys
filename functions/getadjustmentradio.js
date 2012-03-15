function getadjustmentradio(){
  var adjust = GM_getValue("adjust", false);
  if(adjust == true){
    return "<input type=\"radio\" name=\"adjust\" value=\"1\" checked>"+lang.set.adjustment.y+"<br><input type=\"radio\" name=\"adjust\" value=\"0\">"+lang.set.adjustment.n;
  } else {
    return "<input type=\"radio\" name=\"adjust\" value=\"1\">"+lang.set.adjustment.y+"<br><input type=\"radio\" name=\"adjust\" value=\"0\" checked>"+lang.set.adjustment.n;
  }
}