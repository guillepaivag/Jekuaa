(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{525:function(e,t,o){"use strict";o(14),o(12),o(15),o(18),o(11),o(19);var c=o(4);function r(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function n(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?r(Object(source),!0).forEach((function(t){Object(c.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):r(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d={};function l(e,t){for(var i=0;i<e.length;i++){v(e[i],t)}}function m(e,t,o){for(var i=0;i<e.length;i++){h(e[i],t,o)}}function f(e){d[e.uid]=n(n({},e),{},{categorias:{}})}function v(e,t){d[t].categorias[e.uid]=n(n({},e),{},{subCategorias:{}})}function h(e,t,o){d[t].categorias[o].subCategorias[e.uid]=e}!function(e){for(var i=0;i<e.length;i++){f(e[i])}}([{uid:"informatica",nombre:"Informática"},{uid:"matematica",nombre:"Matemática"}]),l([{uid:"algoritmos",nombre:"Algoritmos"},{uid:"desarrollo-web",nombre:"Desarrollo Web"},{uid:"redes",nombre:"Redes"}],"informatica"),l([{uid:"calculo",nombre:"Cálculo"}],"matematica"),m([{uid:"busqueda",nombre:"Busqueda"},{uid:"eficiencia",nombre:"Eficiencia"},{uid:"ordenacion",nombre:"Ordenación"}],"informatica","algoritmos"),m([{uid:"disenho-web",nombre:"Diseño web"},{uid:"vuejs",nombre:"Vue.js"}],"informatica","desarrollo-web"),m([{uid:"tcp",nombre:"TCP"}],"informatica","redes"),m([{uid:"derivada",nombre:"Derivada"}],"matematica","calculo"),t.a=d},527:function(e,t,o){},530:function(e,t,o){"use strict";o.r(t);o(14);var c=o(525),r={data:function(){return{categorias:[],categoriaSeleccionada:{uid:"",nombre:""},dialog:!1,hoverCategoria:null,informacionSecciones:c.a}},props:{seccion:Object},components:{},computed:{},watch:{categoriaSeleccionada:function(e,t){e.uid!==t.uid&&this.$emit("categoriaSeleccionada",e)}},methods:{inicializarListaCategorias:function(){for(var e=Object.keys(this.informacionSecciones[this.seccion.uid].categorias),i=0;i<e.length;i++){var element=e[i];this.categorias.push({uid:this.informacionSecciones[this.seccion.uid].categorias[element].uid,nombre:this.informacionSecciones[this.seccion.uid].categorias[element].nombre})}this.categoriaSeleccionada=this.categorias[0]},seleccionarCategoria:function(e){this.categoriaSeleccionada=e,this.dialog=!1}},created:function(){this.inicializarListaCategorias()}},n=(o(540),o(41)),d=o(59),l=o.n(d),m=o(110),f=o(121),v=o(65),h=o(264),C=o(511),O=o(129),component=Object(n.a)(r,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"titulos"},[o("b",{staticClass:"titulo-text"},[e._v(e._s(e.seccion.nombre)+" / ")]),e._v(" "),o("b",{staticClass:"titulo-text categoria-text",on:{click:function(t){e.dialog=!e.dialog}}},[e._v("\n            "+e._s(e.categoriaSeleccionada.nombre)+"\n        ")])]),e._v(" "),o("v-dialog",{attrs:{scrollable:"","max-width":"300px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[o("v-card",[o("v-card-title",[e._v("Categorias: "+e._s(e.seccion.nombre))]),e._v(" "),o("v-divider"),e._v(" "),o("v-card-text",{staticStyle:{height:"300px"}},e._l(e.categorias,(function(t,c){return o("div",{key:c,staticClass:"mt-1"},[o("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"#683bce",block:"",disabled:e.categoriaSeleccionada.uid==t.uid},on:{click:function(o){return e.seleccionarCategoria(t)},mouseover:function(o){e.hoverCategoria=t.uid},mouseleave:function(t){e.hoverCategoria=null}}},[e.hoverCategoria===t.uid?o("v-icon",{staticClass:"mr-2",attrs:{right:"",dark:""}},[e._v("\n                            mdi-check\n                        ")]):e._e(),e._v(" "),o("p",{staticClass:"textoBotonLista"},[e._v("\n                            "+e._s(t.nombre)+"\n                        ")])],1)],1)})),0),e._v(" "),o("v-divider"),e._v(" "),o("v-card-actions",{staticClass:"justify-center"})],1)],1)],1)}),[],!1,null,"676b777a",null);t.default=component.exports;l()(component,{VBtn:m.a,VCard:f.a,VCardActions:v.a,VCardText:v.c,VCardTitle:v.d,VDialog:h.a,VDivider:C.a,VIcon:O.a})},540:function(e,t,o){"use strict";o(527)}}]);