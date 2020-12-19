(function(t){function e(e){for(var n,a,i=e[0],s=e[1],u=e[2],f=0,p=[];f<i.length;f++)a=i[f],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&p.push(c[a][0]),c[a]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n]);l&&l(e);while(p.length)p.shift()();return o.push.apply(o,u||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],n=!0,i=1;i<r.length;i++){var s=r[i];0!==c[s]&&(n=!1)}n&&(o.splice(e--,1),t=a(a.s=r[0]))}return t}var n={},c={app:0},o=[];function a(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=n,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(r,n,function(e){return t[e]}.bind(null,n));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var l=s;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"034f":function(t,e,r){"use strict";r("85ec")},"3f0a":function(t,e,r){},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),c=r("5f5b"),o=r("b1e0"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("img",{attrs:{alt:"Vue logo",src:r("cf05")}}),n("articles-component")],1)},i=[],s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("h1",[t._v("Articoli in vendita")]),r("hr"),t.error?r("p",{staticClass:"error"},[t._v(t._s(t.error))]):t._e(),r("div",{staticClass:"articles-container"},[r("b-card-group",{staticStyle:{"justify-content":"center"},attrs:{deck:""}},t._l(t.articles,(function(e,n){return r("b-card",{key:e._id,staticClass:"m-2 ",staticStyle:{"max-width":"450px","min-width":"450px"},attrs:{"no-body":"",item:e,index:n}},[r("div",{staticClass:"row h-100"},[r("b-col",{attrs:{sm:"6"}},[r("b-img",{staticClass:"h-100 embed-responsive",staticStyle:{"object-fit":"cover"},attrs:{fluid:"",src:"https://picsum.photos/1024/400/?image=41",alt:"Image 1"}})],1),r("b-col",{staticClass:"py-3",attrs:{sm:"6"}},[r("h4",[t._v(t._s(e.nomeArticolo))]),r("b-card-text",[t._v(" "+t._s(e.descrizione)+" ")]),r("b-card-text",[t._v(" Prezzo: "),r("h4",[t._v(t._s(e.prezzo)+" $")])]),r("b-card-text",[t._v(" Venditore: "+t._s(e.venditore)+" ")])],1)],1)])})),1)],1)])},u=[],l=(r("96cf"),r("1da1")),f=(r("d81d"),r("d3b7"),r("5530")),p=r("d4ec"),d=r("bee2"),b=r("bc3a"),v=r.n(b),h="http://localhost:5000/api/home",m=function(){function t(){Object(p["a"])(this,t)}return Object(d["a"])(t,null,[{key:"getArticles",value:function(){return new Promise((function(t,e){v.a.get(h).then((function(e){t(e.data.map((function(t){return Object(f["a"])({},t)})))})).catch((function(t){e(t)}))}))}},{key:"deleteArticles",value:function(t){return v.a.delete("".concat(h).concat(t))}}]),t}(),g=m,y={name:"ArticleComponent",data:function(){return{articles:[],error:""}},created:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.getArticles();case 3:t.articles=e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),t.error=e.t0.message;case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))()}},_=y,x=(r("97d7"),r("2877")),w=Object(x["a"])(_,s,u,!1,null,"c93aa208",null),j=w.exports,O={name:"App",components:{ArticlesComponent:j}},k=O,C=(r("034f"),Object(x["a"])(k,a,i,!1,null,null,null)),P=C.exports;r("f9e3"),r("2dd8");n["default"].config.productionTip=!1,new n["default"]({render:function(t){return t(P)}}).$mount("#app"),n["default"].use(c["a"]),n["default"].use(o["a"])},"85ec":function(t,e,r){},"97d7":function(t,e,r){"use strict";r("3f0a")},cf05:function(t,e,r){t.exports=r.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.09eb5b1e.js.map