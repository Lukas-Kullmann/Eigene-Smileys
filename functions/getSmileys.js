function getSmileys(){
  var data = GM_listValues();
  var smiley = new Array();
  var id;
  var type;
  var got = new Array();
  for(var i=0; i<data.length;i++){ // filter values
    if(data[i].indexOf("data")!=-1){
      id   = parseInt(data[i].substring(data[i].indexOf(".")+1, data[i].lastIndexOf(".")));
      type = data[i].substr(data[i].lastIndexOf(".")+1);
      if(!got.contains(id)){
        smiley[id-1] = new Object();
        got[got.length] = id;
      }
      smiley[id-1][type] = GM_getValue(data[i]);
    }
  }
  return smiley;
}