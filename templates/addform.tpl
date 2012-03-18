{%=getLang('add/text')%}
<br>
<br>
<br>
<form method="get" action="usercp.php">
    <input type="hidden" value="add" name="ownsmilie">
    <fieldset style="border: 2px solid white; padding: 5px;" class="fieldset">
        <legend>{%=getLang('add/required')%}</legend>
        <label title="{%=getLang('add/url[0]')%}" for="smilie_url">{%=getLang('add/url[1]')%}</label>
        <br>
        <input type="text" id="smilie_url" name="url" size="25">
    </fieldset>
    <br>
    <fieldset style="border: 2px solid white; padding: 5px;" class="fieldset">
        <legend>{%=getLang('add/opional')%}</legend>
        <label title="{%=getLang('add/title[0]')%}" for="smilie_title">{%=getLang('add/title[1]')%}</label>
        <br>
        <input type="text" id="smilie_title" name="title" size="25">
        <br>
        <label title="{%=getLang('add/alt[0]')%}" for="smilie_alt">{%=getLang('add/alt[1]')%}</label>
        <br>
        <input type="text" id="smilie_alt" name="alt" size="25">
        <br>
        <label title="{%=getLang('add/shortcut[0]')%}" for="smilie_shortcut">{%=getLang('add/shortcut[1]')%}</label>
        <br>
        <input type="text" id="smilie_shortcut" name="shortcut" size="25">
    </fieldset>
    <br>
    <br>
    <button class="button">{%=getLang('add/save')%}</button>
</form>