<div class="editor_smiliebox" id="own_smiliebox" style="height: auto;">
    <fieldset style="border: 1px solid white; border-radius: 5px;">
        <legend style="margin-left: 5px; padding: 0 3px; color: #F3AA21; font-size: 11px;">{%=o.boxtitle%}</legend>
        <ul id="own_smileybox" class="smiliebox floatcontainer" style="height: auto;">
{%
for(j=0; j<o.len; j++){
    print(add_smilielist(j), true);
    print(add_smilielist(++j), true);
    print(add_smilielist(++j), true);
}
%}
        </ul>
    </fieldset>
</div>