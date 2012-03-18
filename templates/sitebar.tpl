<div class="block">
    <h2 class="blockhead">{%=getLang('panel/head')%}</h2>
    <div class="blockbody">
        <ul class="blockrow">
{% for(var i = 0; i < o.length; i++ ){ %}
            <li>
                <a href="usercp.php?ownsmilie={%=o[i].link%}">
                    {%=getLang(o[i].title)%}
                </a>
            </li>
{% } %}
        </ul>
    </div>
</div>