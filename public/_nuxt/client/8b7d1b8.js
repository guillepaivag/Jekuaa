(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{556:function(f,n,t){},619:function(f,n,t){"use strict";var d=t(14),h=t.n(d),c=t(12),j=t.n(c),u=t(15),p=t.n(u),v=t(17),P=t.n(v),E=t(13),m=t.n(E),D=t(18),s=t.n(D),i=t(4),e=t(24),l=t.n(e),O=t(556),B=t.n(O),b=t(2),C=t(22),U=t(8);function M(_,o){var a=Object.keys(_);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(_);o&&(r=r.filter(function(T){return Object.getOwnPropertyDescriptor(_,T).enumerable})),a.push.apply(a,r)}return a}function y(_){for(var o=1;o<arguments.length;o++){var a=arguments[o]!=null?arguments[o]:{};o%2?M(Object(a),!0).forEach(function(r){Object(i.a)(_,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(_,Object.getOwnPropertyDescriptors(a)):M(Object(a)).forEach(function(r){Object.defineProperty(_,r,Object.getOwnPropertyDescriptor(a,r))})}return _}n.a=Object(U.a)(C.a).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes:function(){return y({"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader,"v-data-table--has-top":!!this.$slots.top,"v-data-table--has-bottom":!!this.$slots.bottom},this.themeClasses)}},methods:{genWrapper:function(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(b.f)(this.height)}},[this.$createElement("table",this.$slots.default)])}},render:function(o){return o("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}})},637:function(f,n,t){"use strict";t.r(n);var d=function(){var s=this,i=s.$createElement,e=s._self._c||i;return e("div",[e("v-simple-table",{attrs:{dense:""},scopedSlots:s._u([{key:"default",fn:function(){return[e("thead",[e("tr",[e("th",{staticClass:"text-left"},[s._v(`
                UID
                `)]),s._v(" "),e("th",{staticClass:"text-left"},[s._v(`
                Correo
                `)]),s._v(" "),e("th",{staticClass:"text-left"},[s._v(`
                Usuario
                `)]),s._v(" "),e("th",{staticClass:"text-left"},[s._v(`
                Acciones
                `)])])]),s._v(" "),e("tbody",s._l(s.listaUsuarios,function(l,O){return e("tr",{key:O},[e("td",[s._v(s._s(l.uid))]),s._v(" "),e("td",[s._v(s._s(l.correo))]),s._v(" "),e("td",[s._v(s._s(l.nombreUsuario))]),s._v(" "),e("td",[e("v-btn",{staticClass:"ma-2",attrs:{outlined:"",color:"#683bce",block:"",to:"/miembro-jekuaa/usuarios/"+l.uid}},[s._v(`
                            Ver datos
                        `)])],1)])}),0)]},proxy:!0}])})],1)},h=[],c={data:function(){return{listaUsuarios:[]}},props:{usuarios:Array},watch:{usuarios:function(i,e){this.listaUsuarios=this.usuarios}},methods:{},created:function(){this.listaUsuarios=this.usuarios}},j=c,u=t(42),p=t(48),v=t.n(p),P=t(117),E=t(619),m=Object(u.a)(j,d,h,!1,null,null,null),D=n.default=m.exports;v()(m,{VBtn:P.a,VSimpleTable:E.a})}}]);