function addnewsmilie(url, title, alt, shortcut){
  if(url && url !=""){
    smilies[smilies.length] = new Object();
    smilies[smilies.length-1].url      = decodeURIComponent(url);
    smilies[smilies.length-1].alt      = (!alt)      ? false : unescape(alt).replace("+"," "); // Alternative Text is optional
    smilies[smilies.length-1].title    = (!title)    ? false : unescape(title).replace("+"," "); // Title is optional
    smilies[smilies.length-1].shortcut = (!shortcut) ? false : unescape(shortcut).replace("+", " "); // shortcut is optional

    deleteAll(); //delete all smilies

    for(var i = 0;i<smilies.length;i++){
      GM_setValue("data."+(i+1)+".alt", smilies[i].alt);
      GM_setValue("data."+(i+1)+".title", smilies[i].title);
      GM_setValue("data."+(i+1)+".url", smilies[i].url);
      GM_setValue("data."+(i+1)+".shortcut", smilies[i].shortcut);
    }
    document.getElementById("ownsmiley_body").innerHTML=lang.add.success;
  } else {
    document.getElementById("ownsmiley_body").innerHTML=lang.add.failture;
  }
}