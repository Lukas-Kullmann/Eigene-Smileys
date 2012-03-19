function loaded(){
    var fileName = getFileName();
    var get      = getGet();
    if(jQuery.inArray(fileName, cPanelFiles)!=-1){ //controlpanel-page
        // sitebar erstellen
        jQuery('#usercp_nav').append(tmpl('include(templates/sitebar.tpl)', [{link:'add', title: 'panel/add'}, {link:'edit', title: 'panel/edit'}, {link:'set', title: 'panel/config'}]));

        if(fileName=="usercp"){ //possible editing-page
            if(get.ownsmilie == "add"){ // add smiley
                hideold();
                jQuery('#ownsmilie_head').html(getLang('add/head'));
                if(get.length > 1){ // form was submitted
                    addnewsmilie(get.url, get.title, get.alt, get.shortcut);
                } else {
                    jQuery('#ownsmilie_body').html(tmpl('include(templates/addform.tpl)'));
                }
            } else if(get.ownsmilie == "edit"){ // edit smiley
                hideold();
                jQuery('#ownsmilie_head').html(getLang('edit/head'));
                if(smilies.length == 0){
                    jQuery('#ownsmilie_body').html(getLang('edit/nosmilies'));
                }else{
                    if(!get.smilie){
                        jQuery('#ownsmilie_body').html(tmpl('include(templates/edit.tpl)', smilies));
                    } else {
                        get.smilie = parseInt(get.smilie);
                        if(get.process == "edit"){
                            if(!get.url){
                                if(!smilies[get.smilie-1].shortcut) smilies[get.smilie-1].shortcut = "";
                                if(!smilies[get.smilie-1].alt)      smilies[get.smilie-1].alt      = "";
                                if(!smilies[get.smilie-1].title)    smilies[get.smilie-1].title    = "";

                                jQuery('#ownsmilie_body').html(tmpl('include(templates/details.tpl)', {'get':get,'smilie':smilies[get.smilie-1]}));
                            } else {
                                if(get.url == ""){
                                    jQuery('#ownsmilie_body').html(getLang('edit/failure'));
                                } else {
                                    smilies[get.smilie-1].url      = decodeURIComponent(get.url);
                                    smilies[get.smilie-1].alt      = (!get.alt)      ? false : unescape(get.alt).replace("+"," ");
                                    smilies[get.smilie-1].title    = (!get.title)    ? false : unescape(get.title).replace("+"," ");
                                    smilies[get.smilie-1].shortcut = (!get.shortcut) ? false : unescape(get.shortcut).replace("+", " ");

                                    deleteAll();

                                    for(var i = 0;i<smilies.length;i++){
                                        GM_setValue("data."+(i+1)+".alt", smilies[i].alt);
                                        GM_setValue("data."+(i+1)+".title", smilies[i].title);
                                        GM_setValue("data."+(i+1)+".url", smilies[i].url);
                                        GM_setValue("data."+(i+1)+".shortcut", smilies[i].shortcut);
                                    }

                                    jQuery('#ownsmilie_body').html(getLang('edit/edit/success'));
                                }
                            }
                        } else if(get.process == "delete"){
                            deleteAll();
                            var k=0;
                            for(var i=0;i<smilies.length; i++){
                                if(i!=(get.smilie-1)){
                                    GM_setValue("data."+(k+1)+".alt", smilies[i].alt);
                                    GM_setValue("data."+(k+1)+".title", smilies[i].title);
                                    GM_setValue("data."+(k+1)+".url", smilies[i].url);
                                    GM_setValue("data."+(k+1)+".shortcut", smilies[i].shortcut);

                                    k++;
                                }
                            }
                            jQuery('#ownsmilie_body').html(getLang('edit/remove'));
                        } else {
                            jQuery('#ownsmilie_body').html(getLang('edit/noprocess'));
                        }
                    }
                }
            } else if(get.ownsmilie == "set"){ //settings
                hideold();
                jQuery('#ownsmilie_head').html(getLang('set/head'));
                if(get.length > 1){
                    if(!(get.title && get.adjust && get.lang && get.title != "")){
                        jQuery('#ownsmilie_body').html(getLang('set/failure'));
                    } else {
                        GM_setValue("boxtitle", decodeURIComponent(get.title.replace("+", " ")));
                        GM_setValue("adjust", (get.adjust==1)?true:false);
                        GM_setValue("beautify", (get.beautify==1)?true:false);
                        GM_setValue("lang", (get.lang=="de")?"de":"en");
                        jQuery('#ownsmilie_body').html(getLang('set/success'));
                    }
                } else {
                    var boxtitle = GM_getValue("boxtitle", getLang('set/boxtitledefault')),
                        lang = GM_getValue('lang','de').toLowerCase(),
                        adjust = GM_getValue("adjust", false),
                        beautify = GM_getValue("beautify", false);

                    if(adjust){
                        adjust = 1;
                    } else {
                        adjust = 0;
                    }

                    if(beautify) {
                        beautify = 1;
                    } else {
                        beautify = 0;
                    }

                    jQuery('#ownsmilie_body').html(tmpl('include(templates/settings.tpl)', {'title': boxtitle, 'lang':lang, 'adjust': adjust, 'beautify': beautify}));
                }
            }
        }
    }

    if(jQuery.inArray(fileName, editorFiles)!=-1 || (fileName == "private" && get["do"] == "newpm")){ // add smiliebox
        unsafeWindow.console.log("ownSmilie :: Editorfile");
        if(smilies.length>0){
            jQuery('#vB_Editor_001 > div:first-child').append(tmpl('include(templates/smiliebox.tpl)', {len: smilies.length, boxtitle: GM_getValue("boxtitle", getLang('set/boxtitledefault'))}));

            var replace = "";

            for(var i=0;i<smilies.length;i++){
                if(smilies[i].shortcut != false)
                    replace += "vB_Editor['vB_Editor_001'].editor.textarea.$.value = vB_Editor['vB_Editor_001'].editor.textarea.$.value.replace(new RegExp('"+smilies[i].shortcut+"', 'g'), '[img]"+smilies[i].url+"[/img]'); ";
            }
            jQuery('.vbform:first').attr("onsubmit", "if(document.getElementById('cb_disablesmilies').checked == false){"+replace+" vB_Editor['vB_Editor_001'].editor.textarea.$.textLength = vB_Editor['vB_Editor_001'].editor.textarea.$.value.length; vB_Editor['vB_Editor_001'].textarea.value = vB_Editor['vB_Editor_001'].editor.textarea.$.value; vB_Editor['vB_Editor_001'].textarea.textLength = vB_Editor['vB_Editor_001'].editor.textarea.$.value.length;} YAHOO.util.Event.removeListener(window,'beforeunload'); return vB_Editor['vB_Editor_001'].prepare_submit(this.subject.value, 4)");

            unsafeWindow.console.log("ownSmilie :: Shortcuts initialized");

            // adjust textarea after setting up the shortcut-parsing because the ck-editor is not loaded yet
            if(GM_getValue("adjust", false) == true){
                var str = "if(typeof document.getElementById('cke_contents_vB_Editor_001_editor') != undefined){"+
                "var newheight = 203 + document.getElementById('own_smiliebox').offsetHeight;"+
                "var oldheight = document.getElementById('cke_vB_Editor_001_editor').offsetHeight;"+
                "var height = document.getElementById('cke_contents_vB_Editor_001_editor').offsetHeight;"+
                "if(newheight > oldheight){"+
                "height += newheight - oldheight;"+
                "}"+
                "document.getElementById('cke_contents_vB_Editor_001_editor').style.height = height+'px';"+
                "console.log('ownSmilie :: Textareaheight adjusted');"+
                "} else {"+
                "window.setTimeout(str, 500);"+
                "}";
                window.setTimeout(str, 1500);
            }
        } else {
            unsafeWindow.console.log("ownSmilies :: There are no smilies");
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
    }
}