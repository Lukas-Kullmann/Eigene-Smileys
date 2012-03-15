function getFileName(){
  var url=self.location.href;
  if(url.indexOf("?") != -1){
    url = url.split("?",1)[0];
  }
  return url.substr(url.lastIndexOf("/")+1, (url.lastIndexOf(".")-url.lastIndexOf("/")-1));
}