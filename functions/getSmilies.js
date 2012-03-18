function getSmilies(){
    var data = GM_listValues(), smilie = new Array(), id, type, got = new Array();
    for(var i=0; i<data.length;i++){ // filter values
        if(data[i].indexOf("data")==0){
            id   = parseInt(data[i].substring(data[i].indexOf(".")+1, data[i].lastIndexOf(".")));
            type = data[i].substr(data[i].lastIndexOf(".")+1);
            if(jQuery.inArray(id, got)==-1){
                smilie[id-1] = new Object();
                got[got.length] = id;
            }
            smilie[id-1][type] = GM_getValue(data[i]);
        }
    }
    return smilie;
}