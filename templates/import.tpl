<fieldset class="fieldset" style="border: 2px solid white; padding: 5px;">
    <legend>{%=getLang('import/export/head')%}</legend>
    {%=getLang('import/export/text')%}<br><br>
{%
var exportstring = JSON.stringify(smilies);
var rows = Math.round(exportstring.length/150)+3;
%}
    <textarea cols="150" rows="{% if(rows > 20) { print(20); } else { print(rows); }%}">{%=exportstring%}</textarea>
</fieldset>
<fieldset class="fieldset" style="border: 2px solid white; padding: 5px;">
    <legend>{%=getLang('import/import/head')%}</legend>
    {%=getLang('import/import/string')%}<br><br>
    <textarea cols="150" rows="20" id="ownsmilie_import_string"></textarea>
    <br><br>
    <form action='' onsubmit="document.cookie='ownsmilie_import='+encodeURIComponent(document.getElementById('ownsmilie_import_string').value); return true;">
        <input type="hidden" name="ownsmilie" value="import">
        <input type="hidden" name="step" value="import">
        <input type="checkbox" name="replace" id="ownsmile_import_replace">
        <label for="ownsmile_import_replace">{%=getLang('import/import/replace')%}</label><br><br>
        <input type="submit" value="{%=getLang('import/import/button')%}">
    </form>
</fieldset>