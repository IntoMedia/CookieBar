let cookieBar__opt = null;
if(typeof window.cookieBar.options !== 'undefined'){
    cookieBar__opt = window.cookieBar.options;
}
let cookieBar = {
    getCookie: function (Name) {
        let re = new RegExp(Name + "=[^;]+", "i");
        if (document.cookie.match(re)) {
            return document.cookie.match(re)[0].split("=")[1];
        }
        return null;
    },


    setCookie: function (name, value, days) {
        let expireDate = new Date();
        let expstring = (typeof days != "undefined") ? expireDate.setDate(expireDate.getDate() + parseInt(days)) : expireDate.setDate(expireDate.getDate() - 5);
        document.cookie = name + "=" + value + "; expires=" +expstring + "; path=/";
    },

    deleteCookie: function (name) {
        this.setCookie(name, "moot")
    },

    showEUbar: function () {
        if(cookieBar__opt !== null){
            this.options = cookieBar__opt;
            cookieBar__opt = null;
        }
        if (!this.getCookie('marertesitettunk_eu')) {
            let elemDiv = document.createElement('div');
            elemDiv.id = 'cookie_bar';
            elemDiv.className = 'cookiebox';
            elemDiv.innerHTML = `<span>${this.options.text[this.options.lang]}</span><div><button class="cookie-options" onclick="cookieBar.showOptions()">${this.options.options[this.options.lang]}</button> <button class="enable" onclick="cookieBar.enable()">${this.options.enable[this.options.lang]}</button></div>`;
            document.body.appendChild(elemDiv);
        }else{
            this.onEnabled();
        }
    },
    showOptions: function (){
        document.getElementById('cookie_bar').style.display = 'none';

        if(!document.getElementById('cookie_box')) {
            let elemDiv = document.createElement('div');
            elemDiv.id = 'cookie_box';
            elemDiv.className = 'cookiebox window';
            const lang = this.options.lang;

            elemDiv.innerHTML = `<h2>${this.options.title[lang]}</h2>`;
            for (const key in this.options.categories) {
                let opt = this.options.categories[key];
                elemDiv.innerHTML += `<div class="cookie-option"><input type="checkbox" name="cookie-box-option" checked value="${key}"><label>${opt.name[lang]}</label></div>`;
            }
            elemDiv.innerHTML += `<div><button class="enable-selected" onclick="cookieBar.enableSelected()">${this.options.enable_selected[lang]}</button><button class="enable" onclick="cookieBar.enable()">${this.options.enable_all[lang]}</button></div>`;
            document.body.appendChild(elemDiv);
        }else{
            document.getElementById('cookie_box').style.display = 'block';
        }
    },
    enableSelected: function (){
        let elm = document.getElementsByName('cookie-box-option');
        let en = [];
        for (const key in elm) {
            if(elm[key].checked){
                en.push(elm[key].value-1+1);
            }
        }
        document.getElementById('cookie_bar').style.display = 'none';
        if(document.getElementById('cookie_box')) {
            document.getElementById('cookie_box').style.display = 'none';
        }
        this.setCookie('marertesitettunk_eu', JSON.stringify(en), 365);
        this.onEnabled();
    },
    enable: function () {
        document.getElementById('cookie_bar').style.display = 'none';
        if(document.getElementById('cookie_box')) {
            document.getElementById('cookie_box').style.display = 'none';
        }
        this.setCookie('marertesitettunk_eu', 1, 365);
        this.onEnabled();
    },

    loadScript: function (url, callback){
        if(document.getElementById('loadedScript_'+url) === undefined){
            var head = document.head;
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.id = 'loadedScript_'+url;
            script.onreadystatechange = callback;
            script.onload = function(){callback(); };
            head.appendChild(script);
        }else{
            callback();
        }
    },

    onEnabled: function (){
        let c = this.getCookie('marertesitettunk_eu');
        if(c !== true){
            c = JSON.parse(c);
        }
        for (const key in this.options.services) {
            let sv = this.options.services[key];
            if(c === 1 || c.indexOf(sv.category)>-1){
                console.log(sv);
                if(!sv.url){
                    if(!sv.runAfter) {
                        this.loadScript(sv.url, sv.runAfter);
                    }else{
                        this.loadScript(sv.url, function (){});
                    }
                }else if(!sv.runAfter) {
                    sv.runAfter();
                }
            }
        }
    }
};
