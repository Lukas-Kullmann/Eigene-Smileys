function deleteAll(){
    for(var i in window.localStorage){
        if(i.indexOf('ownsmiley.data') == 0){
            window.localStorage.removeItem(i);
        }
    }
}