var cookies = {
    'getAll': function(){
        var c = document.cookie.split(';'), r = new Object();
        for(var i = 0; i < c.length; i++){
            var tmp = c[i].split('=');
            if(tmp.length > 2){
                for(var j = 2; j < tmp.length; j++){
                    tmp[1] += '='+tmp[j];
                }
            }
            r[decodeURIComponent(jQuery.trim(tmp[0]))] = decodeURIComponent(jQuery.trim(tmp[1]));
        }
        return r;
    },
    'get': function(name){
        return this.all[name];
    },
    'set': function(name, value){
        var c = this.all;
        c[name] = value;
        this.saveAll();
    },
    'delete':function(name){
        if(this.all[name] != undefined){
            delete this.all[name];
            this.saveAll();
        }
    },
    'saveAll': function (){
        var c = new Array();
        jQuery.each(this.all, function(name, value){
            c[c.length] = encodeURIComponent(name)+'='+encodeURIComponent(value);
        });
        document.cookie = c.join('; ');
        this.all = this.getAll();
    },
    'all': undefined
};
cookies.all = cookies.getAll();