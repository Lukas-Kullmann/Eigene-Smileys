Array.prototype.contains=function(needle){
  for(var i=0;i<this.length;i++){
    if(this[i]==needle){
      return true;
    }
  }
  return false;
}

document.getElementsByClassName = function(classname){
  var nodes = document.getElementsByTagName("*");
  var ret = new Array();
  var retcount = 0;
  for(var i=0;i<nodes.length;i++){
    if(nodes[i].classList.contains(classname)){
      ret[retcount++]=nodes[i];
    }
  }
  return ret;
}