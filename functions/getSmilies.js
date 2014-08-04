function getSmilies(){
    var smilie = new Array(), id, type, got = new Array();
    for(var i in window.localStorage){ // filter values
        if(i.indexOf("ownsmiley.data") == 0){
            id   = parseInt(i.substring(15, i.lastIndexOf(".")));
            type = i.substr(i.lastIndexOf(".") + 1);
            if(jQuery.inArray(id, got)==-1){
                smilie[id-1] = new Object();
                got[got.length] = id;
            }
            smilie[id-1][type] = window.localStorage[i];

            if(smilie[id-1][type] == "false") {
                smilie[id-1][type] = false;
            } else if(smilie[id-1][type] == "true") {
                smilie[id-1][type] = false;
            }
        }
    }
    return smilie;
}