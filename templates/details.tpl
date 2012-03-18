<form method="get" action="usercp.php">
    <input type="hidden" value="edit" name="ownsmilie">
    <input type="hidden" value="{%=o.get.smilie%}" name="smilie">
    <input type="hidden" value="edit" name="process">
    <fieldset style="border: 2px solid white; padding: 5px;" class="fieldset">
        <legend>{%=getLang('edit/required')%}</legend>
        <label for="smilie_url" title="{%=getLang('edit/url[0]')%}">{%=getLang('edit/url[1]')%}</label>
        <br>
        <input type="text" value="{%=o.smilie.url%}" id="smilie_url" name="url" size="25">
    </fieldset>
    <br>
    <fieldset style="border: 2px solid white; padding: 5px;" class="fieldset">
        <legend>{%=getLang('edit/optional')%}</legend>
        <span title="{%=getLang('edit/title[0]')%}">{%=getLang('edit/title[1]')%}</span>
        <br>
        <input type="text" value="{%=o.smilie.title%}" id="title" name="title" size="25">
        <br>
        <label for="smilie_alt" title="{%=getLang('edit/alt[0]')%}">{%=getLang('edit/alt[1]')%}</label>
        <br>
        <input type="text" value="{%=o.smilie.alt%}" id="smilie_alt" name="alt" size="25">
        <br>
        <label for="smilie_shortcut" title="{%=getLang('edit/shortcut[0]')%}">{%=getLang('edit/shortcut[1]')%}</label>
        <br>
        <input type="text" value="{%=o.smilie.shortcut%}" id="smilie_shortcut" name="shortcut" size="25">
    </fieldset>
    <br>
    <br>
    <button class="button">{%=getLang('edit/save')%}</button>
</form>