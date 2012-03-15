function add_ownsmileylist(j){
  if(smileys.length>j){
    images[j] = new Image();
    images[j].src = smileys[j].url; // preload image
    if(!smileys[j].alt)   smileys[j].alt   = "";
    if(!smileys[j].title) smileys[j].title = "";
    var ret = "<li><div class=\"table\"><div class=\"tablecell\"><img style=\"cursor: pointer;\" src=\""+smileys[j].url+"\" alt=\""+smileys[j].alt+"\" title=\""+smileys[j].title+"\" class=\"inlineimg\" border=\"0\" onClick=\"vB_Editor['vB_Editor_001'].editor.insertHtml('";
    if(!smileys[j].shortcut){ // no shortcut defined
      ret += "[img]'+this.src+'[/img]', (this.src.length+11)";
    } else {
      ret += smileys[j].shortcut+"', "+smileys[j].shortcut.length;
    }
    return ret+", 0);\" id=\"ownsmiley_"+j+"\"></div></div></li>";
  } else {
    return "<li></li>";
  }
}