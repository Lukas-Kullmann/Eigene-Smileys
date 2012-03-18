function deleteAll(){
    var all = GM_listValues();

    for( var i = 0; i < all.length; i++){
        if(all[i].indexOf('data') == 0){
            GM_deleteValue(all[i]);
        }
    }
}