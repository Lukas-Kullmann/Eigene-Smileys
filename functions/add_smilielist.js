function add_smilielist(j){
    if(smilies.length>j){
        images[j] = new Image();
        images[j].src = smilies[j].url; // preload image
        if(!smilies[j].alt) {   smilies[j].alt   = ""; }
        if(!smilies[j].title) { smilies[j].title = ""; }
        smilies[j].num = j;
        return tmpl('include(templates/smilielist_item.tpl)', smilies[j]);
    } else {
        return "<li></li>";
    }
}