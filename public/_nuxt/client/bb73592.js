(window.webpackJsonp=window.webpackJsonp||[]).push([[27,16,23],{526:function(t,e,n){var map={"./informatica.jpg":533,"./sinSeccion.jpg":534};function r(t){var e=o(t);return n(e)}function o(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=o,t.exports=r,r.id=526},533:function(t,e,n){t.exports=n.p+"img/informatica.5e2531f.jpg"},534:function(t,e,n){t.exports=n.p+"img/sinSeccion.b6f9318.jpg"},537:function(t,e,n){},550:function(t,e,n){"use strict";n(537)},557:function(t,e,n){"use strict";n.r(e);var r={name:"visualizador-blog",props:{contenidoBlog:String}},o=(n(550),n(41)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"contenedor_blog_padre"},[n("div",{staticClass:"contenedor_blog mt-5 mb-5",domProps:{innerHTML:t._s(t.contenidoBlog)}})])}),[],!1,null,"efe6acec",null);e.default=component.exports},566:function(t,e,n){},577:function(t,e,n){t.exports=n.p+"img/portada-usuario.899fd65.jpg"},578:function(t,e,n){},602:function(t,e,n){"use strict";n(578)},605:function(t,e,n){"use strict";n(25),n(566);var r=n(5).default.extend({name:"translatable",props:{height:Number},data:function(){return{elOffsetTop:0,parallax:0,parallaxDist:0,percentScrolled:0,scrollTop:0,windowHeight:0,windowBottom:0}},computed:{imgHeight:function(){return this.objHeight()}},beforeDestroy:function(){window.removeEventListener("scroll",this.translate,!1),window.removeEventListener("resize",this.translate,!1)},methods:{calcDimensions:function(){var t=this.$el.getBoundingClientRect();this.scrollTop=window.pageYOffset,this.parallaxDist=this.imgHeight-this.height,this.elOffsetTop=t.top+this.scrollTop,this.windowHeight=window.innerHeight,this.windowBottom=this.scrollTop+this.windowHeight},listeners:function(){window.addEventListener("scroll",this.translate,!1),window.addEventListener("resize",this.translate,!1)},objHeight:function(){throw new Error("Not implemented !")},translate:function(){this.calcDimensions(),this.percentScrolled=(this.windowBottom-this.elOffsetTop)/(parseInt(this.height)+this.windowHeight),this.parallax=Math.round(this.parallaxDist*this.percentScrolled)}}}),o=n(7),c=Object(o.a)(r);e.a=c.extend().extend({name:"v-parallax",props:{alt:{type:String,default:""},height:{type:[String,Number],default:500},src:String,srcset:String},data:function(){return{isBooted:!1}},computed:{styles:function(){return{display:"block",opacity:this.isBooted?1:0,transform:"translate(-50%, ".concat(this.parallax,"px)")}}},mounted:function(){this.init()},methods:{init:function(){var t=this,img=this.$refs.img;img&&(img.complete?(this.translate(),this.listeners()):img.addEventListener("load",(function(){t.translate(),t.listeners()}),!1),this.isBooted=!0)},objHeight:function(){return this.$refs.img.naturalHeight}},render:function(t){var e=t("div",{staticClass:"v-parallax__image-container"},[t("img",{staticClass:"v-parallax__image",style:this.styles,attrs:{src:this.src,srcset:this.srcset,alt:this.alt},ref:"img"})]),content=t("div",{staticClass:"v-parallax__content"},this.$slots.default);return t("div",{staticClass:"v-parallax",style:{height:"".concat(this.height,"px")},on:this.$listeners},[e,content])}})},630:function(t,e,n){},636:function(t,e,n){"use strict";n.r(e);var r=n(20),o=(n(79),n(42),n(69),{name:"carta-presentacion",data:function(){return{informacionUsuario:null,usuario:null,show:!1}},props:{uidUsuario:String},computed:{descripcion:function(){return this.informacionUsuario.descripcion.replace(/\n/g,"<br>")}},created:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$firebase.firestore().collection("Usuarios").doc(t.uidUsuario),e.next=3,n.get();case 3:return r=e.sent,t.usuario=r.data(),o=t.$firebase.firestore().collection("InformacionUsuarios").doc(t.uidUsuario),e.next=8,o.get();case 8:c=e.sent,t.informacionUsuario=c.data();case 10:case"end":return e.stop()}}),e)})))()}}),c=(n(602),n(41)),l=n(59),d=n.n(l),v=n(110),f=n(121),m=n(65),h=n(511),_=n(125),x=n(129),w=n(169),C=n(263),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.usuario&&t.informacionUsuario?r("div",{staticClass:"container"},[r("h3",{staticClass:"mb-5 titulo-presentacion"},[t._v("\n        Presentación del publicador:\n    ")]),t._v(" "),r("div",[r("v-card",{staticClass:"mx-auto"},[r("v-img",{attrs:{src:n(577),height:"200px"}}),t._v(" "),r("v-card-title",[t._v("\n                ¡Hola, soy "),r("b",{staticClass:"texto-nombreCompleto ml-1"},[t._v(" "+t._s(t.usuario.nombreCompleto)+"!")])]),t._v(" "),r("v-card-subtitle",[t._v("\n                "+t._s(t.usuario.nombreUsuario)+" - "+t._s(t.informacionUsuario.rolDescriptivo)+"\n            ")]),t._v(" "),r("v-card-actions",[r("v-btn",{attrs:{color:"#683bce",text:"",to:"/estudiante/"+t.usuario.nombreUsuario}},[t._v("\n                Mi perfil\n            ")]),t._v(" "),r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"#683bce",text:""},on:{click:function(e){t.show=!t.show}}},[r("b",[t._v("Información")]),t._v(" "),r("v-icon",[t._v(t._s(t.show?"mdi-chevron-up":"mdi-chevron-down"))])],1)],1),t._v(" "),r("v-expand-transition",[r("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}]},[r("v-divider"),t._v(" "),r("v-card-text",{domProps:{innerHTML:t._s(t.descripcion)}})],1)])],1)],1)]):t._e()}),[],!1,null,"5e834442",null);e.default=component.exports;d()(component,{VBtn:v.a,VCard:f.a,VCardActions:m.a,VCardSubtitle:m.b,VCardText:m.c,VCardTitle:m.d,VDivider:h.a,VExpandTransition:_.a,VIcon:x.a,VImg:w.a,VSpacer:C.a})},727:function(t,e,n){"use strict";n(630)},782:function(t,e,n){"use strict";n.r(e);var r=n(20),o=(n(79),n(560)),c=n.n(o),l=n(557),d={name:"",data:function(){return{referenciaBlog:"",blog:{},contenidoBlog:"",meGustaEsteBlog:!1,dialogRegistro:!1}},components:{"carta-presentacion":n(636).default,"visualizador-blog":l.default},methods:{accionMeGusta:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.verificarSiInicioSesion()){e.next=3;break}return t.dialogRegistro=!0,e.abrupt("return");case 3:if(!t.meGustaEsteBlog){e.next=7;break}return e.next=6,t.quitarMeGusta();case 6:return e.abrupt("return");case 7:return e.next=9,t.darMeGusta();case 9:case"end":return e.stop()}}),e)})))()},darMeGusta:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,body,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n=t.$firebase.auth().currentUser){e.next=4;break}return e.abrupt("return",null);case 4:return e.next=6,n.getIdToken();case 6:r=e.sent,t.$store.commit("modules/usuarios/setTOKEN",r),body={meGusta:!0},o={headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(r)}},t.$axios.post("/blog/estudiante/meGusta/".concat(t.blog.uid),body,o),t.meGustaEsteBlog=!0,t.blog.cantidadMeGusta++,e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.log("error: ",e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})))()},quitarMeGusta:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,body,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n=t.$firebase.auth().currentUser){e.next=4;break}return e.abrupt("return",null);case 4:return e.next=6,n.getIdToken();case 6:r=e.sent,t.$store.commit("modules/usuarios/setTOKEN",r),body={meGusta:!1},o={headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(r)}},t.$axios.post("/blog/estudiante/meGusta/".concat(t.blog.uid),body,o),t.meGustaEsteBlog=!1,t.blog.cantidadMeGusta--,e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.log("error: ",e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})))()},verificarSiInicioSesion:function(){return!!this.$store.state.modules.usuarios.uid}},computed:{},created:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((n=t.$store.state.modules.usuarios).uid){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,t.$firebase.firestore().collection("Usuarios").doc(n.uid).collection("BlogsMG").doc(t.blog.uid).get();case 5:r=e.sent,t.meGustaEsteBlog=!!r.exists;case 7:case"end":return e.stop()}}),e)})))()},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,l,d,v,f,m,h,_,x,w,C;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.app,n=t.$firebase,r=t.$axios,o=t.redirect,l=t.params,d=l.referencia,v={},f="",e.prev=4,m=n.firestore().collection("Blogs").where("referencia","==",d),e.next=8,m.get();case 8:return(h=e.sent).empty&&o("/blog"),_=h.docs[0],v=_.data(),x={headers:{"Content-Type":"application/json"}},e.next=15,r.get("/blog/estudiante/obtenerContenido/".concat(v.uid),x);case 15:return w=e.sent,C=new c.a.Converter,f=C.makeHtml(w.data.resultado),e.abrupt("return",{referenciaBlog:d,blog:v,contenidoBlog:f});case 21:e.prev=21,e.t0=e.catch(4),console.log("err",e.t0);case 24:case"end":return e.stop()}}),e,null,[[4,21]])})))()}},v=(n(727),n(41)),f=n(59),m=n.n(f),h=n(110),_=n(121),x=n(65),w=n(359),C=n(264),k=n(511),B=n(129),G=n(605),S=n(358),j=n(263),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-parallax",{attrs:{dark:"",src:n(526)("./"+(t.blog.seccion?t.blog.seccion:"sinSeccion")+".jpg"),height:"300"}},[r("v-row",{attrs:{align:"center",justify:"center"}},[r("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[r("h1",{staticClass:"text-h4 font-weight-thin mb-4"},[t._v("\n                    Jekuaapy\n                ")]),t._v(" "),r("h4",{staticClass:"subheading"},[t._v("\n                    "+t._s(t.blog.titulo)+"\n                ")])])],1)],1),t._v(" "),r("div",{staticClass:"container mt-10 mb-5"},[r("div",{staticClass:"mb-10"},[r("h2",{staticClass:"subtitulos"},[t._v(" Descripción ")]),t._v(" "),r("v-divider",{staticClass:"mt-3 mb-3"}),t._v("\n            "+t._s(t.blog.descripcion)+"\n        ")],1),t._v(" "),r("v-btn",{staticClass:"iconoMeGusta",attrs:{icon:"",color:t.meGustaEsteBlog?"#ff1d89":""},on:{click:t.accionMeGusta}},[r("v-icon",[t._v("mdi-heart")])],1),t._v("\n        "+t._s(t.blog.cantidadMeGusta)+"\n\n        "),r("v-divider",{}),t._v(" "),r("visualizador-blog",{attrs:{contenidoBlog:t.contenidoBlog}}),t._v(" "),r("v-divider",{}),t._v(" "),r("v-btn",{staticClass:"iconoMeGusta",attrs:{icon:"",color:t.meGustaEsteBlog?"#ff1d89":""},on:{click:t.accionMeGusta}},[r("v-icon",[t._v("mdi-heart")])],1),t._v("\n        "+t._s(t.blog.cantidadMeGusta)+"\n\n        "),r("v-row",{staticClass:"mt-10 mb-10",attrs:{"no-gutters":""}},[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("div",{staticClass:"contenido-l"},[r("h2",{staticClass:"subtitulos"},[t._v(" Fecha creación: ")]),t._v(" "),r("v-divider",{staticClass:"mt-3 mb-3"}),t._v("\n                    "+t._s(new Date(1e3*t.blog.fechaCreacion.seconds).toISOString().substr(0,10))+"\n                ")],1)]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("div",{staticClass:"contenido-d"},[r("h2",{staticClass:"subtitulos"},[t._v(" Fecha actualización: ")]),t._v(" "),r("v-divider",{staticClass:"mt-3 mb-3"}),t._v("\n                    "+t._s(new Date(1e3*t.blog.fechaActualizacion.seconds).toISOString().substr(0,10))+"\n                ")],1)])],1)],1),t._v(" "),r("div",{staticClass:"mb-15"},[r("carta-presentacion",{attrs:{uidUsuario:t.blog.publicador}})],1),t._v(" "),r("v-dialog",{attrs:{width:"500"},model:{value:t.dialogRegistro,callback:function(e){t.dialogRegistro=e},expression:"dialogRegistro"}},[r("v-card",[r("v-card-title",{staticClass:"text-h6 cabecera_registro"},[t._v("\n                Primero debes iniciar sesión\n            ")]),t._v(" "),r("v-card-text",[r("p",[t._v("Para dar "),r("b",[t._v("me gusta")]),t._v(" a este blog de Jekuaapy debes registrarte o iniciar sesión.")]),t._v(" "),r("v-divider",{staticClass:"mb-6"}),t._v(" "),r("p",[t._v("Si tienes una cuenta en Jekuaapy puedes iniciar sesión "),r("nuxt-link",{attrs:{to:"/autenticacion/inicioSesion"}},[t._v("aquí")]),t._v(".")],1),t._v(" "),r("p",[t._v("En caso que no tengas una cuenta en Jekuaapy puedes registrarte "),r("nuxt-link",{attrs:{to:"/autenticacion/registro"}},[t._v("aquí")])],1)],1),t._v(" "),r("v-divider"),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"#683bce",text:""},on:{click:function(e){t.dialogRegistro=!1}}},[t._v("\n                Cerrar\n            ")])],1)],1)],1)],1)}),[],!1,null,"1864141d",null);e.default=component.exports;m()(component,{VBtn:h.a,VCard:_.a,VCardActions:x.a,VCardText:x.c,VCardTitle:x.d,VCol:w.a,VDialog:C.a,VDivider:k.a,VIcon:B.a,VParallax:G.a,VRow:S.a,VSpacer:j.a})}}]);