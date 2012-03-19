// ==UserScript==
// @name            Eigene-Smilies
// @namespace       wop
// @description     creates a smileybox below the standard-smiles
// @include         /^https{0,1}:\/\/(test){0,1}forum\.worldofplayers\.[a-z]{2,4}\/forum\//
// @author          Satans Krümelmonster
// @version         2.6
// @require         http://code.jquery.com/jquery-1.7.1.min.js
// @require         https://raw.github.com/blueimp/JavaScript-Templates/master/tmpl.min.js
// @downloadURL     https://github.com/Satans-Kruemelmonster/Eigene-Smileys/raw/master/release/own_smileys.user.js
// @updateURL       https://github.com/Satans-Kruemelmonster/Eigene-Smileys/raw/master/release/update.user.js
// @unwrap
// ==/UserScript==
function add_smilielist(j){if(smilies.length>j){images[j] = new Image();images[j].src = smilies[j].url; if(!smilies[j].alt) { smilies[j].alt = ""; }if(!smilies[j].title) { smilies[j].title = ""; }smilies[j].num = j;return tmpl('<li> <div class="table"> <div class="tablecell"> <img style="cursor: pointer;" src="{%=o.url%}" alt="{%=o.alt%}" title="{%=o.title%}" class="inlineimg" border="0" onClick="vB_Editor[\'vB_Editor_001\'].editor.insertHtml(\'{% if(!o.shortcut){ print("[img]\'+this.src+\'[/img]\', (this.src.length+11)"); } else { print(o.shortcut+"\', "+o.shortcut.length); } %}, 0);" id="ownsmiley_{%=+o.num%}"> </div> </div></li>', smilies[j]);} else {return "<li></li>";}}function addnewsmilie(url, title, alt, shortcut){if(url && url !=""){smilies[smilies.length] = new Object();smilies[smilies.length-1].url = decodeURIComponent(url);smilies[smilies.length-1].alt = (!alt) ? false : unescape(alt).replace("+"," "); smilies[smilies.length-1].title = (!title) ? false : unescape(title).replace("+"," "); smilies[smilies.length-1].shortcut = (!shortcut) ? false : unescape(shortcut).replace("+", " "); deleteAll(); for(var i = 0;i<smilies.length;i++){GM_setValue("data."+(i+1)+".alt", smilies[i].alt);GM_setValue("data."+(i+1)+".title", smilies[i].title);GM_setValue("data."+(i+1)+".url", smilies[i].url);GM_setValue("data."+(i+1)+".shortcut", smilies[i].shortcut);