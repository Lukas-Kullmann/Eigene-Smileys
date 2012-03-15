function loaded(){
  var fileName = getFileName();
  var get      = getGet();
  if(cPanelFiles.contains(fileName)){ //controlpanel-page
    //create elements
    var div1    = document.createElement("div");
    var h2      = document.createElement("h2");
    var div2    = document.createElement("div");
    var ul      = document.createElement("ul");
    var li1     = document.createElement("li");
    var li2     = document.createElement("li");
    var li3     = document.createElement("li");
    var a_add   = document.createElement("a");
    var a_edit  = document.createElement("a");
    var a_set   = document.createElement("a");

    //set attributes
    div1.setAttribute("class", "block");

    h2.setAttribute("class", "blockhead");
    div2.setAttribute("class", "blockbody");
    ul.setAttribute("class", "blockrow");
    a_add.setAttribute("href", "usercp.php?ownsmiley=add");
    a_edit.setAttribute("href", "usercp.php?ownsmiley=edit");
    a_set.setAttribute("href", "usercp.php?ownsmiley=set");

    //set texts
    h2.appendChild(document.createTextNode(lang.panel.head));
    a_add.appendChild(document.createTextNode(lang.panel.add));
    a_edit.appendChild(document.createTextNode(lang.panel.edit));
    a_set.appendChild(document.createTextNode(lang.panel.config));

    //merge texts
    li1.appendChild(a_add);             //                        STRUCTURE
    ul.appendChild(li1);                //
                                        //                   ---- div.block ---
    li2.appendChild(a_edit);            //                  |                  |
    ul.appendChild(li2);                //                 h2            div.blockbody
                                        //                  |                  |
    li3.appendChild(a_set);             //                  |         --- ul.blockrow ---
    ul.appendChild(li3);                //                  |        |         |         |
                                        //                  |       li         li       li
    div2.appendChild(ul);               //                  |        |         |         |
                                        //                  |        a         a         a
    div1.appendChild(h2);               //                  |        |         |         |
    div1.appendChild(div2);             //  lang.panel    .head    .add      .edit   .config

    //insert element into html
    document.getElementById("usercp_nav").appendChild(div1);

    if(fileName=="usercp"){ //possible editing-page
      if(get.ownsmiley == "add"){ // add smiley
        hideold();
        document.getElementById("ownsmiley_head").innerHTML=lang.add.head;
        if(get.length > 1){ // form was submitted
          addnewsmiley(get.url, get.title, get.alt, get.shortcut);
        } else {
          document.getElementById("ownsmiley_body").innerHTML=
            lang.add.text+"<br><br><br>"+
            "<form action=\"usercp.php\" method=\"get\">"+
              "<input type=\"hidden\" name=\"ownsmiley\" value=\"add\">"+
              "<fieldset class=\"fieldset\" style=\"border: 2px solid white;padding: 5px\">"+
                "<legend>"+lang.add.required+"</legend>"+
              "<span title=\""+lang.add.url[0]+"\">"+lang.add.url[1]+"</span><br>"+               // Smiley's URL
              "<input type=\"text\" size=\"25\" name=\"url\" id=\"url\">"+
              "</fieldset><br>"+
              "<fieldset class=\"fieldset\" style=\"border: 2px solid white;padding: 5px\">"+
                "<legend>"+lang.add.optional+"</legend>"+
              "<span title=\""+lang.add.title[0]+"\">"+lang.add.title[1]+"</span><br>"+           // Smiley's title
              "<input type=\"text\" size=\"25\" name=\"title\" id=\"title\"><br>"+
              "<span title=\""+lang.add.alt[0]+"\">"+lang.add.alt[1]+"</span><br>"+               // Smiley's alternative text
              "<input type=\"text\" size=\"25\" name=\"alt\" id=\"alt\"><br>"+
              "<span title=\""+lang.add.shortcut[0]+"\">"+lang.add.shortcut[1]+ "</span><br>"+    // Smiley's shortcut
              "<input type=\"text\" size=\"25\" name=\"shortcut\" id=\"shortcut\">"+
              "</fieldset><br><br>"+
              "<button class=\"button\">"+lang.add.save+"</button>"+                              // Save-button
            "</form>";
        }
      } else if(get.ownsmiley == "edit"){ // edit smiley
        hideold();
        document.getElementById("ownsmiley_head").innerHTML=lang.edit.head;
        if(smileys.length == 0){
          document.getElementById("ownsmiley_body").innerHTML=lang.edit.nosmileys;
        }else{
          if(!get.smiley){
            var edit =
            "<input type=\"hidden\" name=\"active\" id=\"ownsmiley_active\" value=\"0\">"+
            "<form action=\"usercp.php\" method=\"get\">"+
              "<input type=\"hidden\" name=\"ownsmiley\" value=\"edit\">"+
              "<table style=\"width:50%; cursor: pointer;\" callpadding=\"3\" cellspacing=\"0\" align=\"center\">"+
                "<tr>"+
                  "<td colspan=\"3\" style=\"font-weight:bold;\">"+
                    lang.edit.text+
                  "</td>"+
                "</tr>";
            for(var i=0; i< smileys.length; i++){
              if(!smileys[i].shortcut) smileys[i].shortcut = lang.edit.noshortcut;
              if(!smileys[i].alt)      smileys[i].alt      = "";
              if(!smileys[i].title)    smileys[i].title    = "";
              edit+=
              "<tr onmouseover=\"if(document.getElementById('input_"+(i+1)+"').checked == false) this.style.backgroundColor='#535C4B';\" "+
                      "onmouseout=\"if(document.getElementById('input_"+(i+1)+"').checked == false) this.style.backgroundColor='transparent';\" "+
                      "onclick=\"if(document.getElementById('ownsmiley_active').value!='0'){"+
                        "document.getElementById('tr_'+document.getElementById('ownsmiley_active').value).style.backgroundColor='transparent';}"+
                        "document.getElementById('ownsmiley_active').value='"+(i+1)+"';"+
                        "document.getElementById('input_"+(i+1)+"').checked = true; this.style.backgroundColor='#4C5445';\" id=\"tr_"+(i+1)+"\""+
                        "style=\"height: 25px;\">"+
                "<td>"+
                  "<img src=\""+smileys[i].url+"\" alt=\""+smileys[i].alt+"\" title=\""+smileys[i].title+"\" border=\"0\">"+
                "</td>"+
                "<td style=\"font-weight: bold; vertical-align: middle;\">"+
                  smileys[i].shortcut+
                "</td>"+
                "<td style=\"text-align: right;\">"+
                  "<input type=\"radio\" name=\"smiley\" value=\""+(i+1)+"\" id=\"input_"+(i+1)+"\">"+
                "</td>"+
              "</tr>";
              if(i!=(smileys.length-1))
                edit+="<tr><td colspan=\"3\" style=\"height: 1px; background-color: black;padding: 0px;\">"+
                  "</td></tr>";
            }
            edit+="</table>";
            document.getElementById("ownsmiley_body").innerHTML = edit+
              "<br><br>"+
              "<select name=\"process\">"+
                "<option value=\"edit\">"+lang.edit.select.edit+"</option>"+
                "<option value=\"delete\">"+lang.edit.select.remove+"</option>"+
              "</select>"+
              "<br><br>"+
              "<button class=\"button\">"+lang.edit.select.button+"</button>"+
            "</form>";
          } else {
            get.smiley = parseInt(get.smiley);
            if(get.process == "edit"){
              if(!get.url){
                if(!smileys[get.smiley-1].shortcut) smileys[get.smiley-1].shortcut = "";
                if(!smileys[get.smiley-1].alt)      smileys[get.smiley-1].alt      = "";
                if(!smileys[get.smiley-1].title)    smileys[get.smiley-1].title    = "";
                 document.getElementById("ownsmiley_body").innerHTML=
                  "<form action=\"usercp.php\" method=\"get\">"+
                    "<input type=\"hidden\" name=\"ownsmiley\" value=\"edit\">"+
                    "<input type=\"hidden\" name=\"smiley\" value=\""+get.smiley+"\">"+
                    "<input type=\"hidden\" name=\"process\" value=\"edit\">"+
                    "<fieldset class=\"fieldset\" style=\"border: 2px solid white;padding: 5px\">"+
                      "<legend>"+lang.edit.required+"</legend>"+
                      "<span title=\""+lang.edit.url[0]+"\">"+lang.edit.url[1]+"</span><br>"+               // Smiley's URL
                      "<input type=\"text\" size=\"25\" name=\"url\" id=\"url\" value=\""+smileys[get.smiley-1].url+"\">"+
                    "</fieldset><br>"+
                    "<fieldset class=\"fieldset\" style=\"border: 2px solid white;padding: 5px\">"+
                      "<legend>"+lang.edit.optional+"</legend>"+
                      "<span title=\""+lang.edit.title[0]+"\">"+lang.edit.title[1]+"</span><br>"+           // Smiley's title
                      "<input type=\"text\" size=\"25\" name=\"title\" id=\"title\" value=\""+smileys[get.smiley-1].title+"\"><br>"+
                      "<span title=\""+lang.edit.alt[0]+"\">"+lang.edit.alt[1]+"</span><br>"+               // Smiley's alternative text
                      "<input type=\"text\" size=\"25\" name=\"alt\" id=\"alt\" value=\""+smileys[get.smiley-1].alt+"\"><br>"+
                      "<span title=\""+lang.edit.shortcut[0]+"\">"+lang.edit.shortcut[1]+"</span><br>"+    // Smiley's shortcut
                      "<input type=\"text\" size=\"25\" name=\"shortcut\" id=\"shortcut\" value=\""+smileys[get.smiley-1].shortcut+"\">"+
                    "</fieldset><br><br>"+
                    "<button class=\"button\">"+lang.edit.save+"</button>"+                              // Save-button
                  "</form>";
              } else {
                if(get.url == ""){
                  document.getElementById("ownsmiley_body").innerHTML = lang.edit.edit.failture;
                } else {
                  smileys[get.smiley-1].url      = decodeURIComponent(get.url);
                  smileys[get.smiley-1].alt      = (!get.alt)      ? false : unescape(get.alt).replace("+"," "); // Alternative Text is optional
                  smileys[get.smiley-1].title    = (!get.title)    ? false : unescape(get.title).replace("+"," "); // Title is optional
                  smileys[get.smiley-1].shortcut = (!get.shortcut) ? false : unescape(get.shortcut).replace("+", " "); // shortcut is optional

                  GM_deleteValue("data");

                  for(var i = 0;i<smileys.length;i++){
                    GM_setValue("data."+(i+1)+".alt", smileys[i].alt);
                    GM_setValue("data."+(i+1)+".title", smileys[i].title);
                    GM_setValue("data."+(i+1)+".url", smileys[i].url);
                    GM_setValue("data."+(i+1)+".shortcut", smileys[i].shortcut);
                  }

                  document.getElementById("ownsmiley_body").innerHTML = lang.edit.edit.success;
                }
              }
            } else if(get.process == "delete"){
              GM_deleteValue("data");
              var k=0;
              for(var i=0;i<smileys.length; i++){
                if(i!=(get.smiley-1)){
                  GM_setValue("data."+(k+1)+".alt", smileys[i].alt);
                  GM_setValue("data."+(k+1)+".title", smileys[i].title);
                  GM_setValue("data."+(k+1)+".url", smileys[i].url);
                  GM_setValue("data."+(k+1)+".shortcut", smileys[i].shortcut);

                  k++;
                }
              }
              document.getElementById("ownsmiley_body").innerHTML = lang.edit.remove;
            } else {
              document.getElementById("ownsmiley_body").innerHTML = lang.edit.noprocess;
            }
          }
        }
      } else if(get.ownsmiley == "set"){ //settings
        hideold();
        document.getElementById("ownsmiley_head").innerHTML=lang.set.head;
        if(get.length > 1){
          if(!(get.title && get.adjust && get.lang && get.title != "")){
            document.getElementById("ownsmiley_body").innerHTML=lang.set.failture;
          } else {
            GM_setValue("boxtitle", decodeURIComponent(get.title.replace("+", " ")));
            GM_setValue("adjust", (get.adjust==1)?true:false);
            GM_setValue("beautify", (get.beautify==1)?true:false);
            GM_setValue("lang", (get.lang=="DE")?"DE":"EN");
            document.getElementById("ownsmiley_body").innerHTML=lang.set.success;
          }
        } else {
          var boxtitle = GM_getValue("boxtitle", lang.set.boxtitledefault);
          document.getElementById("ownsmiley_body").innerHTML=
            lang.set.text+"<br><br><br>"+
            "<form action=\"usercp.php\" method=\"get\">"+
              "<input type=\"hidden\" name=\"ownsmiley\" value=\"set\">"+
                "<span title=\""+lang.set.title[0]+"\">"+lang.set.title[1]+"</span><br>"+       // Boxtitle
                "<input type=\"text\" size=\"25\" name=\"title\" id=\"title\" value=\""+boxtitle+"\"><br>"+
                "<span title=\""+lang.set.lang[0]+"\">"+lang.set.lang[1]+"</span><br>"+         // Systemlanguage
                getlangselect()+"<br>"+
                "<span title=\""+lang.set.adjust[0]+"\">"+lang.set.adjust[1]+"</span><br>"+     // Adjust textarea?
                getadjustmentradio()+"<br><br><br>"+
                "<span title=\""+lang.set.beautify[0]+"\">"+lang.set.beautify[1]+"</span><br>"+ // Beautify editor-window?
                getbeautifyradio()+"<br>"+
                "<button class=\"button\">"+lang.set.save+"</button>"+                          // Save-button
              "</form>";
        }
      }
    }
  }

  if(editorFiles.contains(fileName) || (fileName == "private" && get["do"] == "newpm")){ // add smileybox
    unsafeWindow.console.log("ownSmiley :: Editorfile");
    if(smileys.length>0){
      var newcont=  "<fieldset style=\"border: 1px solid white; border-radius: 5px;\">"+
                        "<legend style=\"margin-left: 5px; padding: 0 3px; color: #F3AA21; font-size: 11px;\">"+GM_getValue("boxtitle", lang.set.boxtitledefault)+"</legend>"+
                        "<ul id=\"own_smileybox\" class=\"smiliebox floatcontainer\" style=\"height: auto;\">";
      for(j=0; j<smileys.length; j++){
        newcont+=add_ownsmileylist(j);
        newcont+=add_ownsmileylist(++j);
        newcont+=add_ownsmileylist(++j);
      }
      newcont+="</ul></fieldset>";

      var box = document.createElement('div');
      box.setAttribute("class", "editor_smiliebox");
      box.setAttribute("id", "own_smileybox");
      box.setAttribute("style", "height: auto");
      box.innerHTML = newcont;

      document.getElementById('vB_Editor_001').firstElementChild.appendChild(box);
      unsafeWindow.console.log("ownSmiley :: Smileybox added");

      var smilie=document.getElementById('vB_Editor_001_smiliebox');

      var replace = "";

      for(var i=0;i<smileys.length;i++){
        if(smileys[i].shortcut != false)
          replace += "vB_Editor['vB_Editor_001'].editor.textarea.$.value = vB_Editor['vB_Editor_001'].editor.textarea.$.value.replace('"+smileys[i].shortcut+"', '[img]"+smileys[i].url+"[/img]'); ";
      }
      document.getElementsByName('vbform')[0].setAttribute("onsubmit", "if(document.getElementById('cb_disablesmilies').checked == false){"+replace+" vB_Editor['vB_Editor_001'].editor.textarea.$.textLength = vB_Editor['vB_Editor_001'].editor.textarea.$.value.length; vB_Editor['vB_Editor_001'].textarea.value = vB_Editor['vB_Editor_001'].editor.textarea.$.value; vB_Editor['vB_Editor_001'].textarea.textLength = vB_Editor['vB_Editor_001'].editor.textarea.$.value.length;} YAHOO.util.Event.removeListener(window,'beforeunload'); return vB_Editor['vB_Editor_001'].prepare_submit(this.subject.value, 4)");

      unsafeWindow.console.log("ownSmiley :: Shortcuts initialized");

      // adjust textarea after setting up the shortcut-parsing because the ck-editor is not loaded yet
      if(GM_getValue("adjust", false) == true){
        var str = "if(typeof document.getElementById('cke_contents_vB_Editor_001_editor') != undefined){"+
                    "var newheight = 203 + document.getElementById('own_smileybox').offsetHeight;"+
                    "var oldheight = document.getElementById('cke_vB_Editor_001_editor').offsetHeight;"+
                    "var height = document.getElementById('cke_contents_vB_Editor_001_editor').offsetHeight;"+
                    "if(newheight > oldheight){"+
                      "height += newheight - oldheight;"+
                    "}"+
                    "document.getElementById('cke_contents_vB_Editor_001_editor').style.height = height+'px';"+
                    "console.log('ownSmiley :: Textareaheight adjusted');"+
                  "} else {"+
                    "window.setTimeout(str, 500);"+
                  "}";
        window.setTimeout(str, 1500);
      }

      //beautify  the editor
      if(GM_getValue("beautify", false) == true){
        var standardsmilies = document.getElementById('vB_Editor_001_smiliebox');
        standardsmilies.style.height = "175px";
        standardsmilies = standardsmilies.parentNode;
        standardsmilies.style.border = "1px solid white";
        standardsmilies.style.borderRadius = "5px";
        standardsmilies.style.padding = "0";
        standardsmilies.style.margin = "0 3px 3px";
        var posticons = document.getElementsByClassName('posticons')[0];
        posticons.style.width = "-moz-calc(100% - 25px)";
        posticons.firstElementChild.style.width = "100%";
        posticons.firstElementChild.style.borderRadius = "5px";
      }
    } else {
      unsafeWindow.console.log("ownSmileys :: There are no smileys");
    }
  }
}