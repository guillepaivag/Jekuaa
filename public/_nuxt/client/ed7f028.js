(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{480:function(t,e,n){var map={"./informatica.webp":487,"./matematica.webp":488,"./sinSeccion.webp":489};function o(t){var e=r(t);return n(e)}function r(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}o.keys=function(){return Object.keys(map)},o.resolve=r,t.exports=o,o.id=480},487:function(t,e,n){t.exports=n.p+"img/informatica.3ab6971.webp"},488:function(t,e,n){t.exports=n.p+"img/matematica.8a0c5ca.webp"},489:function(t,e,n){t.exports=n.p+"img/sinSeccion.42c6954.webp"},512:function(t,e,n){},540:function(t,e,n){"use strict";n(512)},577:function(t,e,n){"use strict";n.r(e);n(36),n(64);var o={name:"",directives:{ObserveVisibility:n(235).a},data:function(){return{}},props:{blogs:Array,existeMasDatos:Boolean,buscando:Boolean},methods:{cargarBlogs:function(t){t&&!this.buscando&&this.existeMasDatos&&this.$emit("cargarBlogs",{visible:t})},getURL:function(t){return window.location.href.includes("miembro-jekuaa")?"/miembro-jekuaa/blog/".concat(t):"/blog/".concat(t)}},watch:{},computed:{},mounted:function(){},created:function(){}},r=(n(540),n(31)),c=n(44),l=n.n(c),d=n(139),v=n(214),m=n(105),f=n(177),w=n(206),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"flex-container"},t._l(t.blogs,(function(e,r){return o("div",{key:r,staticClass:"flex-item"},[o("v-card",{staticClass:"mx-auto carta-blog"},[o("v-img",{staticClass:"white--text align-end",attrs:{height:"200px",src:n(480)("./"+(e.blog.seccion?e.blog.seccion:"sinSeccion")+".webp")}},[o("v-card-title",[t._v("\n                        "+t._s(e.blog.titulo)+"\n                    ")])],1),t._v(" "),o("v-card-subtitle",{staticClass:"pb-0"},[t._v("\n                    "+t._s(e.publicador.nombreUsuario)+"\n                ")]),t._v(" "),o("v-card-text",{staticClass:"text--primary"},[o("div",[t._v("\n                        "+t._s(e.blog.descripcion)+"\n                    ")])]),t._v(" "),o("v-card-actions",[o("v-btn",{attrs:{color:"#683bce",text:"",block:"",to:t.getURL(e.blog.referencia)}},[t._v("\n                        Ver blog\n                    ")])],1)],1)],1)})),0),t._v(" "),t.buscando&&t.existeMasDatos?o("div",{staticClass:"cargando"},[o("v-progress-circular",{attrs:{indeterminate:"",color:"#683bce",size:70,width:7}})],1):t._e(),t._v(" "),t.blogs.length?o("div",{directives:[{name:"observe-visibility",rawName:"v-observe-visibility",value:t.cargarBlogs,expression:"cargarBlogs"}],staticClass:"mt-15"}):t._e()])}),[],!1,null,"0fa8a992",null);e.default=component.exports;l()(component,{VBtn:d.a,VCard:v.a,VCardActions:m.a,VCardSubtitle:m.b,VCardText:m.c,VCardTitle:m.d,VImg:f.a,VProgressCircular:w.a})}}]);