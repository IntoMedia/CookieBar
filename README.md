# CookieBar
Cookie Bar

## How to use?

```
<script src="/template/cookieBar.min.js" defer></script>
<script>
    cookieBar = window.cookieBar || {};
    cookieBar.options = {
        lang:'hu',
        text:{
           hu:'Mi és a partnereink információkat – például sütiket – tárolunk egy eszközön vagy hozzáférünk az eszközön tárolt információkhoz, és személyes adatokat – például egyedi azonosítókat és az eszköz által küldött alapvető információkat – kezelünk személyre szabott hirdetések és tartalom nyújtásához, hirdetés- és tartalomméréshez, nézettségi adatok gyűjtéséhez, valamint termékek kifejlesztéséhez és a termékek javításához.',
           en:'EN text'
        },
        enable:{
          en: 'OK',
          hu:'Rendben'
        },
        options:{
          en: 'EN text',
          hu:'Személyre szabás'
        },
        title:{
            en: 'EN text',
            hu:'Szolgáltatások személyre szabása',
        },
        enable_all:{
            en: 'EN text',
            hu:'Összes engedélyezése'
        },
        enable_selected:{
            en: 'EN text',
            hu:'Kiválasztottak engedélyezése'
        },
        categories:{
            1:{
                name:{
                    hu:'Statisztika',
                    en:'Statistycs'
                }
            },
            2:{
                name:{
                    hu:'Személyre szabás',
                    en: 'EN text'
                }
            },
            3:{
                name:{
                    hu:'Fejlesztés',
                    en:'Development'
                }
            }
        },
        services:[
            {
                category:1,
                url:'https://www.google-analytics.com/analytics.js',
                runAfter: function (){
                    ga('create', 'xxxx');
                }
            },
            {
                category: 3,
                runAfter: function (){
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "xxxxxx");
                }
            }
        ]
    };
    window.addEventListener('load', function (event) {
        cookieBar.showEUbar();
    }, false);
</script>
```
