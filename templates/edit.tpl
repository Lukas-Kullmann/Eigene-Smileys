<input type="hidden" name="active" id="ownsmiley_active" value="0">
<form method="get" action="usercp.php">
    <input type="hidden" value="edit" name="ownsmilie">
    <table align="center" cellspacing="0" callpadding="3" style="width: 50%; cursor: pointer;">
        <tbody>
            <tr>
                <td style="font-weight: bold;" colspan="3">{%=getLang('edit/text')%}</td>
            </tr>
            <tr>
                <td style="height: 1px; background-color: black; padding: 0px;" colspan="3">
            </tr>
{%
for(var i = 0; i < o.length; i++) {
var j = i+1;
if(!o[i].alt) {      o[i].alt      = ""; }
if(!o[i].title) {    o[i].title    = ""; }
%}
            <tr style="height: 25px;" id="tr_{%=j%}" onclick="if(document.getElementById('ownsmiley_active').value!='0'){document.getElementById('tr_'+document.getElementById('ownsmiley_active').value).style.backgroundColor='transparent';}document.getElementById('ownsmiley_active').value='{%=j%}';document.getElementById('input_{%=j%}').checked = true; this.style.backgroundColor='#4C5445';" onmouseout="if(document.getElementById('input_{%=j%}').checked == false) this.style.backgroundColor='transparent';" onmouseover="if(document.getElementById('input_{%=j%}').checked == false) this.style.backgroundColor='#535C4B';">
                <td>
                    <img border="0" title="" alt="{%=o[i].alt%}" src="{%=o[i].url%}">
                </td>
                <td style="font-weight: bold; vertical-align: middle;">{% if(o[i].shortcut) { print(o[i].shortcut); } else { print(getLang('edit/noshortcut'), true); } %}</td>
                <td style="text-align: right;">
                    <input type="radio" id="input_{%=j%}" value="{%=j%}" name="smilie">
                </td>
            </tr>
{% if(i!=(o.length-1)) { %}
            <tr>
                <td colspan="3" style="height: 1px; background-color: black;padding: 0px;"></td>
            </tr>
{% } } %}
        </tbody>
    </table>
    <br>
    <br>
    <select name="process">
        <option value="edit">{%=getLang('edit/select/edit')%}</option>
        <option value="delete">{%=getLang('edit/select/remove')%}</option>
    </select>
    <br>
    <br>
    <button class="button">{%=getLang('edit/select/button')%}</button>
</form>