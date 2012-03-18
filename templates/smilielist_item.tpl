<li>
    <div class="table">
        <div class="tablecell">
            <img style="cursor: pointer;" src="{%=o.url%}" alt="{%=o.alt%}" title="{%=o.title%}" class="inlineimg" border="0" onClick="vB_Editor['vB_Editor_001'].editor.insertHtml('{%
                if(!o.shortcut){ // no shortcut defined
                    print("[img]'+this.src+'[/img]', (this.src.length+11)");
                } else {
                    print(o.shortcut+"', "+o.shortcut.length);
                }
            %}, 0);" id="ownsmiley_{%=+o.num%}">
        </div>
    </div>
</li>