(window.webpackJsonp=window.webpackJsonp||[]).push([[19,20],{525:function(t,e,o){"use strict";o(14),o(12),o(15),o(18),o(11),o(19);var r=o(4);function n(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?n(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):n(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var l={};function d(t,e){for(var i=0;i<t.length;i++){f(t[i],e)}}function v(t,e,o){for(var i=0;i<t.length;i++){h(t[i],e,o)}}function m(t){l[t.uid]=c(c({},t),{},{categorias:{}})}function f(t,e){l[e].categorias[t.uid]=c(c({},t),{},{subCategorias:{}})}function h(t,e,o){l[e].categorias[o].subCategorias[t.uid]=t}!function(t){for(var i=0;i<t.length;i++){m(t[i])}}([{uid:"informatica",nombre:"Informática"},{uid:"matematica",nombre:"Matemática"}]),d([{uid:"algoritmos",nombre:"Algoritmos"},{uid:"desarrollo-web",nombre:"Desarrollo Web"},{uid:"redes",nombre:"Redes"}],"informatica"),d([{uid:"calculo",nombre:"Cálculo"}],"matematica"),v([{uid:"busqueda",nombre:"Busqueda"},{uid:"eficiencia",nombre:"Eficiencia"},{uid:"ordenacion",nombre:"Ordenación"}],"informatica","algoritmos"),v([{uid:"disenho-web",nombre:"Diseño web"},{uid:"vuejs",nombre:"Vue.js"}],"informatica","desarrollo-web"),v([{uid:"tcp",nombre:"TCP"}],"informatica","redes"),v([{uid:"derivada",nombre:"Derivada"}],"matematica","calculo"),e.a=l},526:function(t,e,o){var map={"./informatica.jpg":533,"./sinSeccion.jpg":534};function r(t){var e=n(t);return o(e)}function n(t){if(!o.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=n,t.exports=r,r.id=526},527:function(t,e,o){},530:function(t,e,o){"use strict";o.r(e);o(14);var r=o(525),n={data:function(){return{categorias:[],categoriaSeleccionada:{uid:"",nombre:""},dialog:!1,hoverCategoria:null,informacionSecciones:r.a}},props:{seccion:Object},components:{},computed:{},watch:{categoriaSeleccionada:function(t,e){t.uid!==e.uid&&this.$emit("categoriaSeleccionada",t)}},methods:{inicializarListaCategorias:function(){for(var t=Object.keys(this.informacionSecciones[this.seccion.uid].categorias),i=0;i<t.length;i++){var element=t[i];this.categorias.push({uid:this.informacionSecciones[this.seccion.uid].categorias[element].uid,nombre:this.informacionSecciones[this.seccion.uid].categorias[element].nombre})}this.categoriaSeleccionada=this.categorias[0]},seleccionarCategoria:function(t){this.categoriaSeleccionada=t,this.dialog=!1}},created:function(){this.inicializarListaCategorias()}},c=(o(540),o(41)),l=o(59),d=o.n(l),v=o(110),m=o(121),f=o(65),h=o(264),_=o(511),C=o(129),component=Object(c.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"titulos"},[o("b",{staticClass:"titulo-text"},[t._v(t._s(t.seccion.nombre)+" / ")]),t._v(" "),o("b",{staticClass:"titulo-text categoria-text",on:{click:function(e){t.dialog=!t.dialog}}},[t._v("\n            "+t._s(t.categoriaSeleccionada.nombre)+"\n        ")])]),t._v(" "),o("v-dialog",{attrs:{scrollable:"","max-width":"300px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[o("v-card",[o("v-card-title",[t._v("Categorias: "+t._s(t.seccion.nombre))]),t._v(" "),o("v-divider"),t._v(" "),o("v-card-text",{staticStyle:{height:"300px"}},t._l(t.categorias,(function(e,r){return o("div",{key:r,staticClass:"mt-1"},[o("v-btn",{staticClass:"ma-2 white--text",attrs:{color:"#683bce",block:"",disabled:t.categoriaSeleccionada.uid==e.uid},on:{click:function(o){return t.seleccionarCategoria(e)},mouseover:function(o){t.hoverCategoria=e.uid},mouseleave:function(e){t.hoverCategoria=null}}},[t.hoverCategoria===e.uid?o("v-icon",{staticClass:"mr-2",attrs:{right:"",dark:""}},[t._v("\n                            mdi-check\n                        ")]):t._e(),t._v(" "),o("p",{staticClass:"textoBotonLista"},[t._v("\n                            "+t._s(e.nombre)+"\n                        ")])],1)],1)})),0),t._v(" "),o("v-divider"),t._v(" "),o("v-card-actions",{staticClass:"justify-center"})],1)],1)],1)}),[],!1,null,"676b777a",null);e.default=component.exports;d()(component,{VBtn:v.a,VCard:m.a,VCardActions:f.a,VCardText:f.c,VCardTitle:f.d,VDialog:h.a,VDivider:_.a,VIcon:C.a})},532:function(t,e,o){},533:function(t,e,o){t.exports=o.p+"img/informatica.5e2531f.jpg"},534:function(t,e,o){t.exports=o.p+"img/sinSeccion.b6f9318.jpg"},540:function(t,e,o){"use strict";o(527)},543:function(t,e,o){"use strict";o(532)},544:function(t,e,o){"use strict";o.r(e);var r=o(20),n=(o(79),o(530)),c=o(762),l=o(565),d=o(361);c.a.addLocale(l),c.a.setDefaultLocale("es");var v,m,f={name:"ListaBlogs",data:function(){return{listaDatosBlogs:[],mostrarCarga:!0,paginationButtons:!1,cantidadBlogs:5,categoria:{uid:"",nombre:""},dialogDatosBlog:!1,datosBlog:null}},props:{seccion:Object},components:{Spinner:d.default,ListaCategorias:n.default},methods:{mostrarDatosBlog:function(t){this.dialogDatosBlog=!0,this.datosBlog=this.listaDatosBlogs[t]},timeAgo:function(t){return new c.a("es-ES").format(1e3*t._seconds)},inicialNombreUsuario:function(t){return t?t[0].toUpperCase():""}},computed:{listarSubCategorias:function(){for(var t=this.datosBlog.blog.subCategorias,e="",i=0;i<t.length;i++){var element=t[i];e+="".concat(element),i<t.length-1&&(e+=", ")}return e}},watch:{dialogDatosBlog:function(t,e){t||(this.datosBlog=null)},categoria:(m=Object(r.a)(regeneratorRuntime.mark((function t(e,o){var body,r,n,c,l,i,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.uid!==o.uid){t.next=2;break}return t.abrupt("return");case 2:return t.prev=2,this.mostrarCarga=!0,body={seccion:this.seccion.uid,categoria:this.categoria.uid,cantidad:this.cantidadBlogs},r={headers:{"Content-Type":"application/json"}},t.next=8,this.$axios.post("/blog/estudiante/listaBlogsPorMG",body,r);case 8:for(n=t.sent,c=n.data.resultado,l=[],i=0;i<c.length;i++)d=c[i],l.push({blog:d,publicador:{fotoPerfil:"",nombreUsuario:""}});this.listaDatosBlogs=l,t.next=21;break;case 15:return t.prev=15,t.t0=t.catch(2),console.error(t.t0),t.next=20,this.$store.dispatch("modules/sistema/errorHandler",t.t0);case 20:t.sent;case 21:return t.prev=21,this.mostrarCarga=!1,t.finish(21);case 24:case"end":return t.stop()}}),t,this,[[2,15,21,24]])}))),function(t,e){return m.apply(this,arguments)}),listaDatosBlogs:(v=Object(r.a)(regeneratorRuntime.mark((function t(e,o){var r,i,n,body,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r={headers:{"Content-Type":"application/json"}},i=0;case 2:if(!(i<e.length)){t.next=13;break}return n=e[i],body={uid:n.blog.publicador},t.next=7,this.$axios.post("/usuarios/estudiante/authUsuario",body,r);case 7:c=t.sent,this.listaDatosBlogs[i].publicador.nombreUsuario=c.data.resultado.displayName,this.listaDatosBlogs[i].publicador.fotoPerfil=c.data.resultado.photoURL;case 10:i++,t.next=2;break;case 13:case"end":return t.stop()}}),t,this)}))),function(t,e){return v.apply(this,arguments)})},mounted:function(){return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()}},h=f,_=(o(543),o(41)),C=o(59),x=o.n(C),B=o(242),w=o(110),k=o(121),y=o(65),j=o(759),D=o(760),O=o(359),S=o(264),V=o(511),U=o(129),P=o(169),L=o(358),R=o(263),component=Object(_.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"newMovies mt-10 mb-10"},[r("div",{},[r("client-only",[r("ListaCategorias",{attrs:{seccion:t.seccion},on:{categoriaSeleccionada:function(e){t.categoria=e}}}),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.mostrarCarga,expression:"mostrarCarga"}],staticClass:"mt-5 mb-5",attrs:{id:"loadingMovie"}},[r("Spinner")],1),t._v(" "),!t.mostrarCarga&&t.categoria.uid&&t.listaDatosBlogs.length?r("div",{staticClass:"custom-carousel mt-5 mb-5"},[r("v-carousel",{attrs:{"hide-delimiters":"",height:"auto"}},t._l(t.listaDatosBlogs,(function(e,i){return r("v-carousel-item",{key:i},[r("v-card",{staticClass:"carta-blog mx-auto mt-5 mb-5",attrs:{"max-width":"700"}},[r("v-card-text",[r("div",[t._v("Jekuaapy blog")]),t._v(" "),r("p",{staticClass:"text-h4 text--primary"},[t._v("\n                  "+t._s(e.blog.titulo)+"\n                ")]),t._v(" "),r("div",{staticClass:"text--primary"},[t._v("\n                  "+t._s(e.blog.descripcion)+"\n                ")]),t._v(" "),e.publicador.nombreUsuario?r("div",{staticClass:"mt-3"},[r("nuxt-link",{attrs:{to:"/estudiante/"+e.publicador.nombreUsuario}},[r("v-avatar",{attrs:{color:"#ffffff"}},[e.publicador.fotoPerfil?r("v-img",{staticClass:"elevation-6",attrs:{alt:"",src:e.publicador.fotoPerfil}}):r("span",{staticClass:"headline inicialNombreUsuario"},[t._v("\n                        "+t._s(t.inicialNombreUsuario(e.publicador.nombreUsuario))+"\n                      ")])],1),t._v(" "),r("b",{staticClass:"ml-3"},[t._v("\n                      "+t._s(e.publicador.nombreUsuario)+" \n                    ")])],1)],1):r("span",{staticClass:"headline inicialNombreUsuario"},[t._v("\n                  ...\n                ")])]),t._v(" "),r("v-card-actions",[r("v-btn",{attrs:{text:"",color:"#ff1d89"},on:{click:function(e){return t.mostrarDatosBlog(i)}}},[t._v("\n                  Ver información\n                ")]),t._v(" "),r("v-btn",{attrs:{text:"",color:"#683bce",to:"/blog/"+e.blog.referencia}},[t._v("\n                  Ver blog\n                ")])],1)],1)],1)})),1)],1):t._e(),t._v(" "),r("v-dialog",{attrs:{"max-width":"800px"},model:{value:t.dialogDatosBlog,callback:function(e){t.dialogDatosBlog=e},expression:"dialogDatosBlog"}},[t.datosBlog?r("v-card",[r("v-img",{staticClass:"white--text",attrs:{src:o(526)("./"+(t.datosBlog.blog.seccion?t.datosBlog.blog.seccion:"sinSeccion")+".jpg"),height:"200px"}},[r("v-card-title",[r("span",[t._v("\n                "+t._s(t.datosBlog.blog.titulo)+"\n              ")]),t._v(" "),r("v-spacer"),t._v(" "),r("v-btn",{attrs:{icon:"",color:"white"},on:{click:function(e){t.dialogDatosBlog=!1}}},[r("v-icon",[t._v("\n                  mdi-close\n                ")])],1)],1)],1),t._v(" "),r("v-card-title",[t._v("\n            "+t._s(t.datosBlog.blog.titulo)+"\n          ")]),t._v(" "),r("v-card-subtitle",[t._v("\n            "+t._s(t.datosBlog.blog.cantidadMeGusta)+" me gusta\n          ")]),t._v(" "),r("v-card-text",[r("div",{},[r("v-row",{staticClass:"mb-6",attrs:{"no-gutters":""}},[r("v-col",{attrs:{lg:"8",md:"8"}},[r("div",{staticClass:"mt-4 pb-3"},[t._v("\n                    "+t._s(t.datosBlog.blog.descripcion)+"\n                  ")]),t._v(" "),r("v-divider"),t._v(" "),r("div",{staticClass:"mt-5",staticStyle:{display:"block"}},[r("b",[t._v("Fecha creación: ")]),t._v(" "+t._s(t.timeAgo(t.datosBlog.blog.fechaCreacion))+"\n                  ")]),t._v(" "),r("div",{staticStyle:{display:"block"}},[r("b",[t._v("Fecha actualización: ")]),t._v(" "+t._s(t.timeAgo(t.datosBlog.blog.fechaActualizacion))+"\n                  ")])],1),t._v(" "),r("v-col",[r("div",[r("v-card-text",[t._v("\n                      Sección: "),r("nuxt-link",{staticClass:"link-detalle",attrs:{to:"/blogs/"+t.seccion.uid}},[t._v(" "+t._s(t.seccion.nombre)+" ")])],1),t._v(" "),r("v-card-text",[t._v("\n                      Categoria: "),r("nuxt-link",{staticClass:"link-detalle",attrs:{to:"/blogs/"+t.seccion.uid+"/"+t.categoria.uid}},[t._v(" "+t._s(t.categoria.nombre)+" ")])],1),t._v(" "),r("v-card-text",[t._v("\n                      Sub-categorias: "),t._l(t.datosBlog.blog.subCategorias,(function(e,o){return r("div",{key:o,staticStyle:{display:"inline"}},[o<t.datosBlog.blog.subCategorias.length-1?r("nuxt-link",{staticClass:"link-detalle",attrs:{to:"/blogs/"+t.seccion.uid+"/"+t.categoria.uid+"/"+e}},[t._v("\n                          "+t._s(e)+", \n                        ")]):r("nuxt-link",{staticClass:"link-detalle",attrs:{to:"/blogs/"+t.seccion.uid+"/"+t.categoria.uid+"/"+e}},[t._v("\n                          "+t._s(e)+"\n                        ")])],1)}))],2)],1)])],1)],1)]),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"#683bce",text:"",to:"/blog/"+t.datosBlog.blog.referencia}},[t._v("\n              Ver blog\n            ")])],1)],1):t._e()],1)],1)],1)])}),[],!1,null,"3d2bae56",null);e.default=component.exports;x()(component,{ListaCategorias:o(530).default,Spinner:o(361).default}),x()(component,{VAvatar:B.a,VBtn:w.a,VCard:k.a,VCardActions:y.a,VCardSubtitle:y.b,VCardText:y.c,VCardTitle:y.d,VCarousel:j.a,VCarouselItem:D.a,VCol:O.a,VDialog:S.a,VDivider:V.a,VIcon:U.a,VImg:P.a,VRow:L.a,VSpacer:R.a})}}]);