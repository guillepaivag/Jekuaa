(window.webpackJsonp=window.webpackJsonp||[]).push([[11,14],{525:function(e,t,n){"use strict";n(14),n(12),n(15),n(18),n(11),n(19);var o=n(4);function r(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?r(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):r(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var l={};function d(e,t){for(var i=0;i<e.length;i++){v(e[i],t)}}function f(e,t,n){for(var i=0;i<e.length;i++){h(e[i],t,n)}}function m(e){l[e.uid]=c(c({},e),{},{categorias:{}})}function v(e,t){l[t].categorias[e.uid]=c(c({},e),{},{subCategorias:{}})}function h(e,t,n){l[t].categorias[n].subCategorias[e.uid]=e}!function(e){for(var i=0;i<e.length;i++){m(e[i])}}([{uid:"informatica",nombre:"Informática"},{uid:"matematica",nombre:"Matemática"}]),d([{uid:"algoritmos",nombre:"Algoritmos"},{uid:"desarrollo-web",nombre:"Desarrollo Web"},{uid:"redes",nombre:"Redes"}],"informatica"),d([{uid:"calculo",nombre:"Cálculo"}],"matematica"),f([{uid:"busqueda",nombre:"Busqueda"},{uid:"eficiencia",nombre:"Eficiencia"},{uid:"ordenacion",nombre:"Ordenación"}],"informatica","algoritmos"),f([{uid:"disenho-web",nombre:"Diseño web"},{uid:"vuejs",nombre:"Vue.js"}],"informatica","desarrollo-web"),f([{uid:"tcp",nombre:"TCP"}],"informatica","redes"),f([{uid:"derivada",nombre:"Derivada"}],"matematica","calculo"),t.a=l},531:function(e,t,n){},536:function(e,t,n){},542:function(e,t,n){"use strict";n(531)},546:function(e,t,n){"use strict";n.r(t);var o=n(641),r=n(787),c=n(268),l=n(525),d={data:function(){return{informacionSecciones:l.a}},mixins:[Object(o.a)({connector:r.a})],directives:{ObserveVisibility:c.a},methods:{visibilityChanged:function(e){e&&!this.state.isLastPage&&this.state.showMore()},mostrarNombre:function(e,t){return"seccion"===e?this.informacionSecciones[t.seccion].nombre:"categoria"===e?this.informacionSecciones[t.seccion].categorias[t.categoria].nombre:this.informacionSecciones[t.seccion].categorias[t.categoria].subCategorias[t.subCategoria].nombre}}},f=(n(542),n(41)),m=n(59),v=n.n(m),h=n(110),_=n(121),C=n(65),y=n(590),O=n(129),component=Object(f.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.state?n("div",{staticClass:"contenedor"},[e._l(e.state.hits,(function(t){return n("v-card",{key:t.objectID,staticClass:"item-blog"},[n("v-card-text",[n("div",[e._v("\n                Jekuaapy blog\n            ")]),e._v(" "),n("p",{staticClass:"text-h4 titulo mt-3"},[n("nuxt-link",{staticStyle:{color:"#683bce"},attrs:{to:"/blog/"+t.referencia}},[e._v("\n                    "+e._s(t.titulo)+"\n                ")])],1),e._v(" "),t.seccion?n("p",[n("nuxt-link",{staticStyle:{color:"#777777"},attrs:{to:"/blogs/"+t.seccion}},[e._v("\n                    "+e._s(e.mostrarNombre("seccion",{seccion:t.seccion}))+"\n                ")]),e._v("\n                /\n                "),n("nuxt-link",{staticStyle:{color:"#777777"},attrs:{to:"/blogs/"+t.seccion+"/"+t.categoria}},[e._v("\n                    "+e._s(e.mostrarNombre("categoria",{seccion:t.seccion,categoria:t.categoria}))+"\n                ")])],1):e._e(),e._v(" "),t.seccion?n("p",e._l(t.subCategorias,(function(o,r){return n("v-chip",{key:r,staticClass:"mr-2 pl-4 pr-4",attrs:{color:"#683bce","text-color":"white",to:"/blogs/"+t.seccion+"/"+t.categoria+"/"+o}},[n("v-icon",{attrs:{left:""}},[e._v("\n                        mdi-book-open\n                    ")]),e._v("\n                    "+e._s(e.mostrarNombre("subCategoria",{seccion:t.seccion,categoria:t.categoria,subCategoria:o}))+"\n                ")],1)})),1):n("p",[e._v("\n                Blog normal\n            ")]),e._v(" "),n("div",{staticClass:"text--primary"},[e._v("\n                "+e._s(t.descripcion)+"\n            ")])]),e._v(" "),n("v-card-actions",[n("v-btn",{attrs:{text:"",color:"#683bce",to:"/blog/"+t.referencia}},[e._v("\n                Ver blog\n            ")])],1)],1)})),e._v(" "),n("div",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:e.visibilityChanged,expression:"visibilityChanged"}]})],2):e._e()}),[],!1,null,"c669df34",null);t.default=component.exports;v()(component,{VBtn:h.a,VCard:_.a,VCardActions:C.a,VCardText:C.c,VChip:y.a,VIcon:O.a})},549:function(e,t,n){"use strict";n(536)},556:function(e,t,n){"use strict";n.r(t);var o=n(788),r=n(791),c=n(789),l=n(570),d=n.n(l),f=(n(569),{components:{"app-infinite-hits-blogs":n(546).default,"ais-instant-search":o.a,"ais-search-box":r.a,"ais-highlight":c.a},data:function(){return{searchClient:d()("RNRNTDZS3N","af4d4e9d36a7ceb75e258007c3ceccf2"),indexName:"blogs_prod"}},created:function(){}}),m=(n(549),n(41)),component=Object(m.a)(f,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"container"},[n("ais-instant-search",{attrs:{"search-client":e.searchClient,"index-name":e.indexName}},[n("div",{staticClass:"search-panel"},[n("div",{staticClass:"search-panel__results"},[n("ais-search-box",{staticClass:"searchbox",attrs:{placeholder:"Busque los blogs"}}),e._v(" "),n("app-infinite-hits-blogs",{scopedSlots:e._u([{key:"item",fn:function(e){var t=e.item;return[n("ais-highlight",{attrs:{hit:t,attribute:"titulo"}})]}}])})],1)])])],1)])}),[],!1,null,"05e6f222",null);t.default=component.exports}}]);