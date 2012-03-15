function addnewsmiley(url, title, alt, shortcut){
  if(url && url !=""){
    smileys[smileys.length] = new Object();
    smileys[smileys.length-1].url      = decodeURIComponent(url);
    smileys[smileys.length-1].alt      = (!alt)      ? false : unescape(alt).replace("+"," "); // Alternative Text is optional
    smileys[smileys.length-1].title    = (!title)    ? false : unescape(title).replace("+"," "); // Title is optional
    smileys[smileys.length-1].shortcut = (!shortcut) ? false : unescape(shortcut).replace("+", " "); // shortcut is optional

    GM_deleteValue("data"); //delete all smileys

    for(var i = 0;i<smileys.length;i++){
      GM_setValue("data."+(i+1)+".alt", smileys[i].alt);
      GM_setValue("data."+(i+1)+".title", smileys[i].title);
      GM_setValue("data."+(i+1)+".url", smileys[i].url);
      GM_setValue("data."+(i+1)+".shortcut", smileys[i].shortcut);
    }
    document.getElementById("ownsmiley_body").innerHTML=lang.add.success;
  } else {
    document.getElementById("ownsmiley_body").innerHTML=lang.add.failture;
  }
}