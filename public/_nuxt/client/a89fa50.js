(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{538:function(e,t,l){},551:function(e,t,l){"use strict";l(538)},558:function(e,t,l){"use strict";l.r(t);var n={name:"ImagenURL",components:{VImg:l(169).a},data:function(){return{imageUrl:"",imageAlt:""}},methods:{selectImage:function(){this.$emit("select-file",{src:this.imageUrl,alt:this.imageAlt})}}},c=(l(551),l(41)),r=l(59),m=l.n(r),o=l(110),d=l(511),v=l(211),component=Object(c.a)(n,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"mt-5 mb-5 container"},[l("v-divider",{staticClass:"mb-5"}),e._v(" "),l("v-text-field",{attrs:{label:"Ingresa la URL de tu imagen",required:""},model:{value:e.imageUrl,callback:function(t){e.imageUrl=t},expression:"imageUrl"}}),e._v(" "),l("v-text-field",{attrs:{label:"Ingresa el ALT de tu imagen",required:""},model:{value:e.imageAlt,callback:function(t){e.imageAlt=t},expression:"imageAlt"}}),e._v(" "),l("v-btn",{staticClass:"mt-5 btnImage",attrs:{color:"#ff1d89",block:""},on:{click:e.selectImage}},[e._v("\n          Seleccionar\n      ")]),e._v(" "),l("v-divider",{staticClass:"mt-5"})],1)}),[],!1,null,"9151d25c",null);t.default=component.exports;m()(component,{VBtn:o.a,VDivider:d.a,VTextField:v.a})}}]);