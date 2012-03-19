// ==UserScript==
// @name           own_smileys
// @namespace      wop
// @description    creates a smileybox below the standard-smiles
// @include        http://forum.worldofplayers.*/forum/*
// @author         Satans Krümelmonster
// @version        2.5.4
// ==/UserScript==

//OPERA EDITION
// don't forget to install Grease Monkey Emulation Script http://userscripts.org/scripts/review/88932
window.addEventListener('DOMContentLoaded', function(){  //#Junk: Keine Ahnung, erst mit dieser Verränkung wird der Script aktiv, wenn auch das DOM geladen wird
	loaded();
},false);

function loaded(){

	cPanelFiles = new Array("calendar", "moderation", "private", "profile", "subscription", "usercp");  //#Junk: Irgendwie wills die Variablenzuweisungen innen haben
	editorFiles = new Array("newthread", "newreply", "infraction", "editpost");
	lang        = new phrases(GM_getValue("lang", "EN"));
	smileys   = getSmileys();
	images     = new Array(); // images to preload
	var fileName = getFileName();
	var get      = getGet();
  if(contains(cPanelFiles,fileName)){ //controlpanel-page
    //create elements
    var div1    = document.createElement("div");
    var h2      = document.createElement("h2");
    var div2    = document.createElement("div");
    var ul      = document.createElement("ul");
    var li1     = document.createElement("li");
    var li2     = document.createElement("li");
    var li3     = document.createElement("li");
    var li4      = document.createElement("li");
    var a_add   = document.createElement("a");
    var a_edit  = document.createElement("a");
    var a_set   = document.createElement("a");
    var a_export = document.createElement("a");

    //set attributes
    div1.setAttribute("class", "block");

    h2.setAttribute("class", "blockhead");
    div2.setAttribute("class", "blockbody");
    ul.setAttribute("class", "blockrow");
    a_add.setAttribute("href", "usercp.php?ownsmiley=add");
    a_edit.setAttribute("href", "usercp.php?ownsmiley=edit");
    a_set.setAttribute("href", "usercp.php?ownsmiley=set");
    a_export.setAttribute("href", "usercp.php?ownsmiley=export");

    //set texts
    h2.appendChild(document.createTextNode(lang.panel.head));
    a_add.appendChild(document.createTextNode(lang.panel.add));
    a_edit.appendChild(document.createTextNode(lang.panel.edit));
    a_set.appendChild(document.createTextNode(lang.panel.config));
    a_export.appendChild(document.createTextNode(lang.panel.export));

    //merge texts
    li1.appendChild(a_add);             //                        STRUCTURE
    ul.appendChild(li1);                //
                                        //                   ---- div.block ---
    li2.appendChild(a_edit);            //                  |                  |
    ul.appendChild(li2);                //                 h2            div.blockbody
                                        //                  |                  |
    li3.appendChild(a_set);             //                  |         --- ul.blockrow ---
    ul.appendChild(li3);                //                  |        |         |         |

    li4.appendChild(a_export);
    ul.appendChild(li4);
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
                  k++

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
      } else if(get.ownsmiley == "export"){
        hideold();
        document.getElementById('ownsmiley_head').innerHTML=lang.export.title;
        document.getElementById("ownsmiley_body").innerHTML=
            lang.export.text+"<br><br>"+
            '<textarea cols="150" rows="20">'+JSON.stringify(smileys)+'</textarea>';
       }
    }
  }

  if(contains(editorFiles,fileName) || (fileName == "private" && get["do"] == "newpm")){ // add smileybox
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



	  for(var i=0;i<smileys.length;i++){ //#Junk: Dirty, aber dürfte bei den aufkommenden Datenmengen gehen
        if(smileys[i].shortcut != false)
          replace += "vB_Editor['vB_Editor_001'].editor.textarea.$.value; while(vB_Editor['vB_Editor_001'].editor.textarea.$.value.indexOf('"+smileys[i].shortcut+"') !=-1){vB_Editor['vB_Editor_001'].editor.textarea.$.value=vB_Editor['vB_Editor_001'].editor.textarea.$.value.replace('"+smileys[i].shortcut+"', '[img]"+smileys[i].url+"[/img]');}  ";
      }


	//Mag irgendwie das erste length - Setzen nicht, wegen nem Modification Error
	document.getElementsByName('vbform')[0].setAttribute("onsubmit", "if(document.getElementById('cb_disablesmilies').checked == false){"+replace+" vB_Editor['vB_Editor_001'].textarea.value = vB_Editor['vB_Editor_001'].editor.textarea.$.value; } YAHOO.util.Event.removeListener(window,'beforeunload'); return vB_Editor['vB_Editor_001'].prepare_submit(this.subject.value, 4)");




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

function getSmileys(){
  var data = GM_listValues();
  var smiley = new Array();
  var id;
  var type;
  var got = new Array();
  for(var i=0; i<data.length;i++){ // filter values
    if(data[i].indexOf("data")!=-1){
      id   = parseInt(data[i].substring(data[i].indexOf(".")+1, data[i].lastIndexOf(".")));
      type = data[i].substr(data[i].lastIndexOf(".")+1);
      if(!contains(got,id)){
        smiley[id-1] = new Object();
        got[got.length] = id;
      }
      smiley[id-1][type] = GM_getValue(data[i]);
    }
  }
  return smiley;
}

function getadjustmentradio(){
  var adjust = GM_getValue("adjust", false);
  if(adjust == true){
    return "<input type=\"radio\" name=\"adjust\" value=\"1\" checked>"+lang.set.adjustment.y+"<br><input type=\"radio\" name=\"adjust\" value=\"0\">"+lang.set.adjustment.n;
  } else {
    return "<input type=\"radio\" name=\"adjust\" value=\"1\">"+lang.set.adjustment.y+"<br><input type=\"radio\" name=\"adjust\" value=\"0\" checked>"+lang.set.adjustment.n;
  }
}

function getbeautifyradio(){
  var beautify = GM_getValue("beautify", false);
  if(beautify == true){
    return "<input type=\"radio\" name=\"beautify\" value=\"1\" checked>"+lang.set.beautification.y+"<br><input type=\"radio\" name=\"beautify\" value=\"0\">"+lang.set.beautification.n;
  } else {
    return "<input type=\"radio\" name=\"beautify\" value=\"1\">"+lang.set.beautification.y+"<br><input type=\"radio\" name=\"beautify\" value=\"0\" checked>"+lang.set.beautification.n;
  }
}

function getlangselect(){
  var language = GM_getValue("lang", "EN");
  if(language == "DE"){
    return "<select name=\"lang\"><option value=\"EN\">English</option><option value=\"DE\" selected>Deutsch</option></select>";
  } else {
    return "<select name=\"lang\"><option value=\"EN\" selected>English</option><option value=\"DE\">Deutsch</option></select>";
  }
}

function phrases(langcode){
  this.panel        = new Object();
  this.add          = new Object();
  this.edit         = new Object();
  this.edit.select    = new Object();
  this.edit.edit      = new Object();
  this.set          = new Object();
  this.set.adjustment = new Object();
  this.set.beautification = new Object();
  this.export         = new Object();

  this.panel.head     = "Own Smilies";
  this.panel.add      = "Add own smilie";
  this.panel.edit     = "Edit own smilies";
  this.panel.config   = "Settings";
  this.panel.export   = "Export";

  this.add.head       = "Add own smilie";
  this.add.text       = "Insert a new smilie into your smileybox.<br>Later, you can edit or delete it from there by clicking the \"Edit own smilies\"-Link in your control-panel.";
  this.add.required   = "Required information";
  this.add.optional   = "Optional information";
  this.add.url        = new Array("The smilie's URL", "Smilie URL");
  this.add.title      = new Array("Appears if you stop the mouse over the image for a moment", "Title");
  this.add.alt        = new Array("Appears if the image cannot be loaded or still hast to be loaded", "Alternative text");
  this.add.shortcut   = new Array("Gets transformend into the img-tag by sending the post. Warning: Shoult not be a systemcode.", "Shortcut");
  this.add.success    = "Smilie successfully added.";
  this.add.failture   = "Smilie could not be added. You have to fill all form fields.";
  this.add.save       = "Save";

  this.edit.head      = "Edit own smilies";
  this.edit.text      = "Choose smilie";
  this.edit.nosmileys = "There are no smilies to edit.";
  this.edit.noprocess = "What should I do with the smilie?";
  this.edit.required  = "Required information";
  this.edit.optional  = "Optional information";
  this.edit.url       = new Array("The smilie's URL", "Smilie URL");
  this.edit.title     = new Array("Appears if you stop the mouse over the image for a moment", "Title");
  this.edit.alt       = new Array("Appears if the image cannot be loaded or still hast to be loaded", "Alternative text");
  this.edit.shortcut   = new Array("Gets transformend into the img-tag by sending the post. Warning: Shoult not be a systemcode.", "Shortcut");
  this.edit.remove    = "Smilie successfully deleted";
  this.edit.select.edit = "Edit selected smilie";
  this.edit.select.remove = "Remove selected smilie";
  this.edit.select.button = "Submit";
  this.edit.edit.success  = "Smilie successfully edited";
  this.edit.edit.failture = "Smilie could not be edited. You have to fill all form fields.";
  this.edit.noshortcut = "<i>No shortcut defined</i>";
  this.edit.save      = "Save changes";

  this.set.head       = "Edit Settings";
  this.set.text       = "Change your settings.";
  this.set.title      = new Array("Own-smiliebox's title", "Box-title");
  this.set.lang       = new Array("Controlpanel-language", "Language");
  this.set.adjust     = new Array("Adjust Textfield-height on the Smiliebox's height", "Adjust textarea");
  this.set.adjustment.y = "Yes";
  this.set.adjustment.n = "No";
  this.set.beautify   = new Array("Beautify editor-window", "Beautification");
  this.set.beautification.y = "Yes";
  this.set.beautification.n = "No";
  this.set.save       = "Save settings";
  this.set.boxtitledefault = "Own smilies";
  this.set.success    = "Settings saved";
  this.set.failture   = "Settings count not be saved.<br> You have to fill all form fields.";

  this.export.title   = "Export own smilies";
  this.export.text    = "Export your own smilies to save them for the next update";

  // overwrite language
  if(langcode == "DE"){ //german
    this.panel.head     = "Eigene Smileys";
    this.panel.add      = "Eigenen Smiley hinzufügen";
    this.panel.edit     = "Eigene Smileys bearbeiten";
    this.panel.config   = "Einstellungen";
    this.panel.export   = "Exportieren";

    this.add.head       = "Eigenen Smiley hinzufügen";
    this.add.text       = "Fügt einen Smiley in deine Smileybox hinzu.<br>Später kannst du ihn mit einem Klick auf den \"Eigene Smileys bearbeiten\"-Link in deinem Kontrollzentrum bearbeiten.";
    this.add.required   = "Benötigte Angabe";
    this.add.optional   = "Optionale Angabe";
    this.add.url        = new Array("Die URL des Smileys", "URL des Smileys");
    this.add.title      = new Array("Erscheint bei kurzem stoppen der Maus auf dem Smiley", "Titel");
    this.add.alt        = new Array("Erscheint, wenn das Bild noch geladen werden muss oder nicht geladen werden kann.", "Alternativer Text");
    this.add.shortcut   = new Array("Wird beim absenden des Posts automatisch in den img-Tag umgewandelt. Achtung: Sollte kein Standardsmileycode sein.", "Shortcut");
    this.add.success    = "Smiley erfolgreich hinzugefügt.";
    this.add.failture   = "Der Smiley wurde nicht hinzugefügt. Es müssen alle Formularfelder ausgefüllt werden.";
    this.add.save       = "Speichern";

    this.edit.head      = "Eigene Smileys bearbeiten";
    this.edit.text      = "Wähle einen Smiley aus.";
    this.edit.nosmileys = "Es gibt keine Smileys, die bearbeitet werden könnten.";
    this.edit.noprocess = "Was soll mit dem Smiley gemacht werden?";
    this.edit.required  = "Benötigte Angabe";
    this.edit.optional  = "Optionale Angabe";
    this.edit.url       = new Array("Die URL des Smileys", "URL des Smileys");
    this.edit.title     = new Array("Erscheint bei kurzem stoppen der Maus auf dem Smiley", "Titel");
    this.edit.alt       = new Array("Erscheint, wenn das Bild noch geladen werden muss oder nicht geladen werden kann.", "Alternativer Text");
    this.edit.shortcut   = new Array("Wird beim absenden des Posts automatisch in den img-Tag umgewandelt. Achtung: Sollte kein Standardsmileycode sein.", "Shortcut");
    this.edit.remove    = "Smiley erfolgreich gelöscht";
    this.edit.select.edit = "Ausgewählten Smiley bearbeiten";
    this.edit.select.remove = "Ausgewählten Smiley löschen";
    this.edit.select.button = "Los";
    this.edit.edit.success  = "Smiley erfolgreich bearbeitet.";
    this.edit.edit.failture = "Smiley konnte nicht bearbeitet werden. Fülle alle Pflichfelder aus.";
    this.edit.noshortcut = "<i>Kein Shortcut definiert</i>";
    this.edit.save      = "Änderungen speichern";

    this.set.head       = "Einstellungen bearbeiten";
    this.set.text       = "Hier können die Einstellungen bearbeitet werden.";
    this.set.title      = new Array("Der Titel der Eigene-Smiley-Box", "Boxtitel");
    this.set.lang       = new Array("Die Sprache im Kontrollzentrum", "Sprache");
    this.set.adjust     = new Array("Gibt an, ob das Editortextfeld automatisch auf die Höhe der Smileybox angepasst wird, falls die Boxen zusammen großer sind, als das Textfeld.", "Editortextfeld anpassen");
    this.set.adjustment.y = "Ja";
    this.set.adjustment.n = "Nein";
    this.set.beautify   = new Array("Editorfesnster verschönern", "Verschönerung");
    this.set.beautification.y = "Yes";
    this.set.beautification.n = "No";
    this.set.save       = "Einstellungen speichern.";
    this.set.boxtitledefault = "Eigene Smileys";
    this.set.success    = "Einstellung gespeichert";
    this.set.failture   = "Einstellungen konnten nicht gespeichert werden.<br>Es müssen alle Formularfelder ausgefüllt werden.";

    this.export.title   = "Eigene Smileys exportieren";
    this.export.text    = "Exportiere deine eigenen Smileys um sie für das nächste Update zu sichern";

  }
}

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

function hideold(){
  var subthread = document.getElementById("new_subscribed_threads");
  subthread.getElementsByTagName("h2")[0].setAttribute("id", "ownsmiley_head");
  document.getElementById("ownsmiley_head").innerHTML="";

  subthread.getElementsByTagName("div")[0].firstElementChild.setAttribute("id", "ownsmiley_body");
  document.getElementById("ownsmiley_body").innerHTML="";
  document.getElementById("ownsmiley_body").style.padding="5px";
  document.getElementById("ownsmiley_body").style.fontSize="10px";

  subthread = subthread.getElementsByTagName("div")[0];
  subthread.removeChild(subthread.lastElementChild);

  if(document.getElementsByTagName("body")[0].innerHTML.indexOf('id="new_subscribed_forums"')!=-1){ // there are subscribed forums
    document.getElementById("new_subscribed_forums").parentNode.removeChild(document.getElementById("new_subscribed_forums"));
  }
}

function getFileName(){
  var url=self.location.href;
  if(url.indexOf("?") != -1){
    url = url.split("?",1)[0];
  }
  return url.substr(url.lastIndexOf("/")+1, (url.lastIndexOf(".")-url.lastIndexOf("/")-1));
}

function getGet(){
  if(window.location.search != ""){
    var get = window.location.search.substr(1, window.location.search.length);
    if(get.indexOf("&") != -1){
      get = get.split("&");
    } else {
      get = new Array(get);
    }
    var ret = new Object();
    var index;
    var i=0;
    for(i=0;i<get.length;i++){
      index = get[i].indexOf("=");
      ret[get[i].substr(0,index)] = get[i].substr(index+1);
    }
    ret.length=(ret.length==undefined)?i: i-1;
    return ret;
  }
  return new Object();
}
function contains(array, item)//#Junk: Opera mag irgendwie das mit dem Prototypen irgendwie nicht (oder ich hab den genauen Fehler dabei nicht gefunden)
{
	for(var i=0;i<array.length;i++)
	{
		if(array[i]==item){
		  return true;
		}
	}
	return false;
}

var JSON;if (!JSON) {JSON = {};}(function () {'use strict';function f(n) {return n < 10 ? '0' + n : n;}if (typeof Date.prototype.toJSON !== 'function') {Date.prototype.toJSON = function (key) {return isFinite(this.valueOf())? this.getUTCFullYear() + '-' +f(this.getUTCMonth() + 1) + '-' +f(this.getUTCDate()) + 'T' +f(this.getUTCHours()) + ':' +f(this.getUTCMinutes()) + ':' +f(this.getUTCSeconds()) + 'Z': null;
};String.prototype.toJSON =Number.prototype.toJSON =Boolean.prototype.toJSON = function (key) {return this.valueOf();};}var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta = { '\b': '\\b','\t': '\\t','\n': '\\n','\f': '\\f','\r': '\\r','"' : '\\"','\\': '\\\\'},rep;
function quote(string) {escapable.lastIndex = 0;return escapable.test(string) ? '"' + string.replace(escapable, function (a) {var c = meta[a];return typeof c === 'string'? c: '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);}) + '"' : '"' + string + '"';}function str(key, holder) {var i, k, v, length,mind = gap,partial,value = holder[key];if (value && typeof value === 'object' &&typeof value.toJSON === 'function') {value = value.toJSON(key);}if (typeof rep === 'function') {value = rep.call(holder, key, value);
}switch (typeof value) {case 'string':return quote(value);case 'number':return isFinite(value) ? String(value) : 'null';case 'boolean':case 'null':return String(value);case 'object':if (!value) {return 'null';}gap += indent;partial = [];if (Object.prototype.toString.apply(value) === '[object Array]') {length = value.length;for (i = 0; i < length; i += 1) {partial[i] = str(i, value) || 'null';}
v = partial.length === 0? '[]': gap? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']': '[' + partial.join(',') + ']';gap = mind;return v;}if (rep && typeof rep === 'object') {length = rep.length;for (i = 0; i < length; i += 1) {if (typeof rep[i] === 'string') {k = rep[i];v = str(k, value);if (v) {partial.push(quote(k) + (gap ? ': ' : ':') + v);}}}} else {
for (k in value) {if (Object.prototype.hasOwnProperty.call(value, k)) {v = str(k, value);if (v) {partial.push(quote(k) + (gap ? ': ' : ':') + v);}}}}v = partial.length === 0? '{}': gap? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}': '{' + partial.join(',') + '}';gap = mind;return v;}}if (typeof JSON.stringify !== 'function') {JSON.stringify = function (value, replacer, space) {
var i;gap = '';indent = '';if (typeof space === 'number') {for (i = 0; i < space; i += 1) {indent += ' ';}} else if (typeof space === 'string') {indent = space;}rep = replacer;if (replacer && typeof replacer !== 'function' &&(typeof replacer !== 'object' ||typeof replacer.length !== 'number')) {throw new Error('JSON.stringify');}return str('', {'': value});};}if (typeof JSON.parse !== 'function') {
JSON.parse = function (text, reviver) {var j;function walk(holder, key) {var k, v, value = holder[key];if (value && typeof value === 'object') {for (k in value) {if (Object.prototype.hasOwnProperty.call(value, k)) {v = walk(value, k);if (v !== undefined) {value[k] = v;} else {delete value[k];}}}}return reviver.call(holder, key, value);}text = String(text);cx.lastIndex = 0;
if (cx.test(text)) {text = text.replace(cx, function (a) {return '\\u' +('0000' + a.charCodeAt(0).toString(16)).slice(-4);});}if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {j = eval('(' + text + ')');return typeof reviver === 'function'? walk({'': j}, ''): j;}throw new SyntaxError('JSON.parse');};}}());


document.getElementsByClassName = function(classname){
  var nodes = document.getElementsByTagName("*");
  var ret = new Array();
  var retcount = 0;
  for(var i=0;i<nodes.length;i++){
    if(contains(nodes[i].classList,classname)){
      ret[retcount++]=nodes[i];
    }
  }
  return ret;
}
var cPanelFiles;
var editorFiles;
var lang;
var smileys;
var images;

//asd