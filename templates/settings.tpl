{%=getLang('set/text')%}<br>
<br>
<br>
<form method="get" action="usercp.php">
    <input type="hidden" value="set" name="ownsmilie">
    <span title="{%=getLang('set/title[0]')%}">{%=getLang('set/title[1]')%}</span>
    <br>
    <input type="text" value="{%=o.title%}" id="title" name="title" size="25">
    <br>
    <span title="{%=getLang('set/lang[0]')%}">{%=getLang('set/lang[1]')%}</span>
    <br>
    <select name="lang">
        <!--<option value="en"{% if(o.lang == 'en'){ print(' selected'); } %}>English</option>-->
        <option value="de"{% if(o.lang == 'de'){ print(' selected'); } %}>Deutsch</option>
    </select>
    <br>
    <span title="{%=getLang('set/adjust[0]')%}">{%=getLang('set/adjust[1]')%}</span>
    <br>
    <input type="radio" value="1" id="ownsmilie_adjust_y" name="adjust"{% if(o.adjust == '1'){ print(' checked'); } %}><label for="ownsmilie_adjust_y">{%=getLang('set/adjustment/y')%}</label><br>
    <input type="radio" value="0" id="ownsmilie_adjust_n" name="adjust"{% if(o.adjust == '0'){ print(' checked'); } %}><label for="ownsmilie_adjust_n">{%=getLang('set/adjustment/n')%}</label><br>
    <br>
    <br>
    <span title="{%=getLang('set/beautify[0]')%}">{%=getLang('set/beautify[1]')%}</span>
    <br>
    <input type="radio" value="1" id="ownsmilie_beautify_y" name="beautify"{% if(o.beautify == '1'){ print(' checked'); } %}><label for="ownsmilie_beautify_y">{%=getLang('set/beautification/y')%}</label><br>
    <input type="radio" value="0" id="ownsmilie_beautify_n" name="beautify"{% if(o.beautify == '0'){ print(' checked'); } %}><label for="ownsmilie_beautify_n">{%=getLang('set/beautification/n')%}</label><br>
    <button class="button">{%=getLang('set/save')%}</button>
</form>