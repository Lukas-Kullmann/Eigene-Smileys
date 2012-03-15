function getGet(){
  if(window.location.search != ""){
    var get = window.location.search.substr(1, window.location.search.length);
    if(get.indexOf("&") != -1){
      get = get.split("&");
    } else {
      get = new Array(get);
    }
    var ret = new Object();
    var index;
    var i=0;
    for(i=0;i<get.length;i++){
      index = get[i].indexOf("=");
      ret[get[i].substr(0,index)] = get[i].substr(index+1);
    }
    ret.length=(ret.length==undefined)?i: i-1;
    return ret;
  }
  return new Object();
}