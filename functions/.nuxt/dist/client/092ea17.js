(window.webpackJsonp=window.webpackJsonp||[]).push([[37,13,16],{532:function(j,f,s){},554:function(j,f,s){"use strict";var p=s(532),U=s.n(p)},557:function(j,f,s){},565:function(j,f,s){"use strict";s.r(f);var p=function(){var e=this,o=e.$createElement,a=e._self._c||o;return a("div",[a("h3",{staticClass:"mt-3",class:e.modo!="crear"?e.estaHabilitado?"green--text":"red--text":"black--text"},[a("b",[e._v(`
            `+e._s(e.titulo)+`
        `)])]),e._v(" "),a("v-stepper",{staticClass:"mt-5",attrs:{vertical:""},model:{value:e.step,callback:function(r){e.step=r},expression:"step"}},e._l(e.infoTextoFormulario,function(r,u){return a("div",{key:u},[a("v-stepper-step",{attrs:{color:"#683bce",rules:[function(){return!r.error}],complete:!r.requerido||!r.error&&r.existe,step:r.paso},on:{click:function(i){e.step=r.paso}}},[e._v(`
                `+e._s(r.titulo)+`
                `),r.descripcion?a("small",[e._v(" "+e._s(r.descripcion)+" ")]):e._e()]),e._v(" "),a("v-stepper-content",{attrs:{step:r.paso}},[r.paso===1?a("v-text-field",{attrs:{"error-messages":e.nombreUsuarioErrors,counter:e.logitudesDeTexto.nombreUsuario.max,min:e.logitudesDeTexto.nombreUsuario.min,label:"Nombre de usuario",required:"",disabled:e.soloLectura},on:{input:function(i){return e.$v.datosUsuario.nombreUsuario.$touch()},blur:function(i){return e.$v.datosUsuario.nombreUsuario.$touch()}},model:{value:e.datosUsuario.nombreUsuario,callback:function(i){e.$set(e.datosUsuario,"nombreUsuario",i)},expression:"datosUsuario.nombreUsuario"}}):e._e(),e._v(" "),r.paso===2?a("v-text-field",{attrs:{"error-messages":e.correoErrors,label:"Correo",required:"",disabled:e.soloLectura},on:{input:function(i){return e.$v.datosUsuario.correo.$touch()},blur:function(i){return e.$v.datosUsuario.correo.$touch()}},model:{value:e.datosUsuario.correo,callback:function(i){e.$set(e.datosUsuario,"correo",i)},expression:"datosUsuario.correo"}}):e._e(),e._v(" "),r.paso===3?a("v-text-field",{attrs:{"error-messages":e.nombreCompletoErrors,counter:e.logitudesDeTexto.nombreCompleto.max,label:"Nombre completo",disabled:e.soloLectura},on:{input:function(i){return e.$v.datosUsuario.nombreCompleto.$touch()},blur:function(i){return e.$v.datosUsuario.nombreCompleto.$touch()}},model:{value:e.datosUsuario.nombreCompleto,callback:function(i){e.$set(e.datosUsuario,"nombreCompleto",i)},expression:"datosUsuario.nombreCompleto"}}):e._e(),e._v(" "),r.paso===4?a("v-date-picker",{attrs:{color:"#683bce","full-width":"",locale:"es-es",disabled:e.soloLectura},model:{value:e.datosUsuario.fechaNacimiento,callback:function(i){e.$set(e.datosUsuario,"fechaNacimiento",i)},expression:"datosUsuario.fechaNacimiento"}}):e._e(),e._v(" "),r.paso===5?a("div",[a("v-select",{staticClass:"mb-5",attrs:{hint:""+(e.planSeleccionado.value?"Se selecciono el: "+e.planSeleccionado.text:"No has elegido un plan todav\xEDa"),items:e.planes,"item-text":"text","item-value":"value",label:"Plan","persistent-hint":"","return-object":"","single-line":"",disabled:e.soloLectura},model:{value:e.planSeleccionado,callback:function(i){e.planSeleccionado=i},expression:"planSeleccionado"}}),e._v(" "),e.planSeleccionado.value?a("div",{staticClass:"fechasCompras"},[a("v-row",{attrs:{justify:"space-around"}},[a("v-col",{attrs:{cols:"12",md:"7"}},[a("v-date-picker",{attrs:{color:"#683bce","full-width":"",range:"",disabled:e.soloLectura},model:{value:e.rangoFechaPremium,callback:function(i){e.rangoFechaPremium=i},expression:"rangoFechaPremium"}})],1),e._v(" "),a("v-col",{attrs:{cols:"12",md:"5"}},[a("v-time-picker",{attrs:{color:"#683bce",format:"24hr","full-width":"","use-seconds":"",disabled:e.soloLectura},model:{value:e.horaFechaPremium,callback:function(i){e.horaFechaPremium=i},expression:"horaFechaPremium"}})],1)],1)],1):e._e()],1):e._e(),e._v(" "),r.paso===6?a("div",[a("v-select",{staticClass:"mb-5",attrs:{hint:""+(e.rolSeleccionado.value?"Se selecciono el: "+e.rolSeleccionado.text:"No has elegido un rol todav\xEDa"),items:e.roles,"item-text":"text","item-value":"value",label:"Rol","persistent-hint":"","return-object":"","single-line":"",disabled:e.soloLectura},model:{value:e.rolSeleccionado,callback:function(i){e.rolSeleccionado=i},expression:"rolSeleccionado"}}),e._v(" "),a("div",{},[a("v-row",{attrs:{justify:"space-around"}},[a("v-col",{attrs:{cols:"12",md:"7"}},[a("v-combobox",{attrs:{disabled:e.soloLectura||!e.esMiembroJekuaa()||!e.necesitaSecciones(),items:e.secciones,label:"Secciones",multiple:"",chips:""},scopedSlots:e._u([{key:"selection",fn:function(i){return[a("v-chip",e._b({key:JSON.stringify(i.item),attrs:{"input-value":i.selected,disabled:i.disabled},on:{"click:close":function(l){return i.parent.selectItem(i.item)}}},"v-chip",i.attrs,!1),[a("v-avatar",{staticClass:"accent white--text",attrs:{left:""},domProps:{textContent:e._s(i.item.slice(0,1).toUpperCase())}}),e._v(`
                                            `+e._s(i.item)+`
                                        `)],1)]}}],null,!0),model:{value:e.datosUsuario.jekuaaRoles.secciones,callback:function(i){e.$set(e.datosUsuario.jekuaaRoles,"secciones",i)},expression:"datosUsuario.jekuaaRoles.secciones"}})],1),e._v(" "),a("v-col",{attrs:{cols:"12",md:"5"}},[a("v-switch",{attrs:{disabled:e.soloLectura||!e.esMiembroJekuaa(),label:"Instructor: "+e.datosUsuario.jekuaaRoles.instructor.toString()},model:{value:e.datosUsuario.jekuaaRoles.instructor,callback:function(i){e.$set(e.datosUsuario.jekuaaRoles,"instructor",i)},expression:"datosUsuario.jekuaaRoles.instructor"}})],1)],1)],1)],1):e._e(),e._v(" "),r.paso===7?a("v-text-field",{attrs:{"error-messages":e.nombreCompletoErrors,counter:e.logitudesDeTexto.nombreCompleto.max,label:"Jekuaa Points",type:"number",disabled:e.soloLectura},on:{input:function(i){return e.$v.datosUsuario.nombreCompleto.$touch()},blur:function(i){return e.$v.datosUsuario.nombreCompleto.$touch()}},model:{value:e.datosUsuario.jekuaaPoint,callback:function(i){e.$set(e.datosUsuario,"jekuaaPoint",i)},expression:"datosUsuario.jekuaaPoint"}}):e._e(),e._v(" "),r.paso===8?a("v-text-field",{attrs:{"error-messages":e.contrasenhaErrors,counter:e.logitudesDeTexto.contrasenha.max,min:e.logitudesDeTexto.contrasenha.min,label:"Contrase\xF1a",disabled:e.soloLectura},on:{input:function(i){return e.$v.contrasenha.$touch()},blur:function(i){return e.$v.contrasenha.$touch()}},model:{value:e.contrasenha,callback:function(i){e.contrasenha=i},expression:"contrasenha"}}):e._e(),e._v(" "),e.soloLectura&&r.paso===e.infoTextoFormulario.length?e._e():a("v-btn",{staticClass:"white--text",attrs:{color:"#683bce"},on:{click:e.next}},[e._v(`
                    `+e._s(r.paso===e.infoTextoFormulario.length?e.modo+" usuario":"Continue")+`
                `)]),e._v(" "),e.soloLectura?e._e():a("v-btn",{attrs:{text:""}},[e._v(`
                    Cancelar
                `)])],1)],1)}),0)],1)},U=[],A=s(33),y=s(109),B=s(24),T=s(14),F=s(347),D=s(511),h=s(512),g={nombreUsuario:{max:15,min:4},nombreCompleto:{max:50,min:0},contrasenha:{max:20,min:6}},C={mixins:[D.validationMixin],validations:{datosUsuario:{nombreUsuario:{required:h.required,minLength:Object(h.minLength)(g.nombreUsuario.min),maxLength:Object(h.maxLength)(g.nombreUsuario.max)},correo:{required:h.required,email:h.email},nombreCompleto:{maxLength:Object(h.maxLength)(g.nombreCompleto.max)},jekuaaPoint:{numeric:h.numeric}},contrasenha:{required:h.required,minLength:Object(h.minLength)(g.contrasenha.min),maxLength:Object(h.maxLength)(g.contrasenha.max)}},data:function(){return{datosUsuario:{nombreUsuario:"",correo:"",nombreCompleto:"",fechaNacimiento:"",jekuaaPremium:{plan:"",fechaCompra:"",fechaHasta:""},jekuaaRoles:{rol:"estudiante",secciones:[],instructor:!1},jekuaaPoint:0},contrasenha:"",estaHabilitado:!0,planSeleccionado:{text:"Elegir un plan",value:""},rangoFechaPremium:[],horaFechaPremium:"",rolSeleccionado:{text:"Estudiante",value:"estudiante"},step:1,modo:"lectura",planes:[{text:"Elegir un plan",value:""},{text:"B\xE1sico",value:"basico"},{text:"Avanzado",value:"avanzado"}],roles:[{text:"Estudiante",value:"estudiante"},{text:"MiembroJekaa",value:"miembroJekuaa"},{text:"Propietario",value:"propietario"}],secciones:["informatica","matematica"],logitudesDeTexto:g,datosRoles:[],infoTextoFormulario:[{paso:1,titulo:"Nombre de usuario",descripcion:"Identificador del usuario",error:!1,existe:!1,requerido:!0},{paso:2,titulo:"Correo",descripcion:"Identificador del usuario",error:!1,existe:!1,requerido:!0},{paso:3,titulo:"Nombre completo",descripcion:null,error:!1,existe:!1,requerido:!1},{paso:4,titulo:"Fecha de nacimiento",descripcion:null,error:!1,existe:!1,requerido:!1},{paso:5,titulo:"Datos Jekuaa Premium",descripcion:null,error:!1,existe:!0,requerido:!1},{paso:6,titulo:"Datos Jekuaa Roles",descripcion:null,error:!1,existe:!0,requerido:!1},{paso:7,titulo:"Datos Jekuaa Points",descripcion:null,error:!1,existe:!1,requerido:!1},{paso:8,titulo:"Contrase\xF1a del usuario",descripcion:null,error:!1,existe:!1,requerido:!0}]}},props:{uid:String,accionModo:String,usuario:Object,habilitado:Boolean},computed:{nombreUsuarioErrors:function(){var o=[];return this.$v.datosUsuario.nombreUsuario.$dirty&&(!this.$v.datosUsuario.nombreUsuario.minLength&&o.push("El nombre de usuario es muy corto."),!this.$v.datosUsuario.nombreUsuario.maxLength&&o.push("El nombre de usuario es muy largo."),!this.$v.datosUsuario.nombreUsuario.required&&o.push("Nombre de usuario es necesario.")),this.infoTextoFormulario[0].error=!!o.length,o},correoErrors:function(){var o=[];return this.$v.datosUsuario.correo.$dirty&&(!this.$v.datosUsuario.correo.email&&o.push("El correo debe de ser valido."),!this.$v.datosUsuario.correo.required&&o.push("Correo del usuario es necesaio.")),this.infoTextoFormulario[1].error=!!o.length,o},nombreCompletoErrors:function(){var o=[];return this.$v.datosUsuario.nombreCompleto.$dirty&&!this.$v.datosUsuario.nombreCompleto.maxLength&&o.push("El nombre de usuario es muy largo."),this.infoTextoFormulario[2].error=!!o.length,o},jekuaaPointsErrors:function(){var o=[];return this.$v.datosUsuario.jekuaaPoint.$dirty&&!this.$v.datosUsuario.jekuaaPoint.numeric&&o.push("Debe ser numerico."),this.infoTextoFormulario[6].error=!!o.length,o},contrasenhaErrors:function(){var o=[];return this.$v.contrasenha.$dirty&&(!this.$v.contrasenha.minLength&&o.push("La contrase\xF1a es muy corta."),!this.$v.contrasenha.maxLength&&o.push("La contrase\xF1a es muy larga."),this.modo==="crear"&&!this.$v.contrasenha.required&&o.push("La contrase\xF1a es requerida.")),this.infoTextoFormulario[7].error=!!o.length,o},soloLectura:function(){return this.modo==="leer"},titulo:function(){if(this.modo==="leer")return"Datos del usuario: ".concat(this.usuario.nombreUsuario," - ").concat(this.estaHabilitado?"(Habilitado)":"(Deshabilitado)");if(this.modo==="crear")return"Crear nuevo usuario";if(this.modo==="actualizar")return"Actualizar al usuario: ".concat(this.usuario.nombreUsuario," - ").concat(this.estaHabilitado?"(Habilitado)":"(Deshabilitado)")}},methods:{stringFechaPorSegundos:function(o){return new Date(new Date(o*1e3).getTime()-new Date().getTimezoneOffset()*6e4).toISOString().substring(0,19)},submit:function(){this.$v.$touch(),console.log("this.datosUsuario",this.datosUsuario);var o=this.infoTextoFormulario.find(function(i){return i.error||i.requerido&&!i.existe});if(o){alert("No se puede crear el usuario, verifique los campos.");return}var a=JSON.parse(JSON.stringify(this.datosUsuario));if(console.log("datosUsuario",a),a.nombreCompleto=a.nombreCompleto?a.nombreCompleto:"",a.fechaNacimiento=a.fechaNacimiento?new Date("".concat(a.fechaNacimiento,"T05:00:00.000Z")).getTime():null,a.jekuaaPremium.fechaCompra=a.jekuaaPremium.plan?new Date("".concat(a.jekuaaPremium.fechaCompra,"T").concat(this.horaFechaPremium)).getTime():null,a.jekuaaPremium.fechaHasta=a.jekuaaPremium.plan?new Date("".concat(a.jekuaaPremium.fechaHasta,"T").concat(this.horaFechaPremium)).getTime():null,a.jekuaaPoint=a.jekuaaPoint?Number(a.jekuaaPoint):0,console.log("this.modo",this.modo),this.modo==="crear")this.$emit("crearUsuario",{datosUsuario:a,contrasenha:this.contrasenha});else if(this.modo==="actualizar"){var r=this.filtrarDatosActualizados(a),u={};Object.keys(r).length&&(u=Object.assign(u,{datosUsuario:r})),this.contrasenha&&(u=Object.assign(u,{contrasenha:this.contrasenha})),this.$emit("actualizarUsuario",u)}},clear:function(){this.$v.$reset(),this.datosUsuario.nombreUsuario="",this.datosUsuario.correo="",this.datosUsuario.nombreCompleto="",this.datosUsuario.fechaNacimiento="",this.datosUsuario.jekuaaPremium={plan:"",fechaCompra:"",fechaHasta:""},this.datosUsuario.jekuaaRoles={rol:"estudiante",secciones:[],instructor:!1},this.datosUsuario.jekuaaPoint=0},necesitaSecciones:function(){var o=this.rolSeleccionado.value,a=[{rol:"propietario",nesecitaSecciones:!1,esMiembroJekuaa:!0,nivel:10},{rol:"miembroJekuaa",nesecitaSecciones:!0,esMiembroJekuaa:!0,nivel:5},{rol:"estudiante",nesecitaSecciones:!1,esMiembroJekuaa:!1,nivel:1}],r=a.find(function(u){return u.rol===o});return r.nesecitaSecciones},esMiembroJekuaa:function(){var o=this.rolSeleccionado.value,a=[{rol:"propietario",nesecitaSecciones:!1,esMiembroJekuaa:!0,nivel:10},{rol:"miembroJekuaa",nesecitaSecciones:!0,esMiembroJekuaa:!0,nivel:5},{rol:"estudiante",nesecitaSecciones:!1,esMiembroJekuaa:!1,nivel:1}],r=a.find(function(u){return u.rol===o});return r.esMiembroJekuaa},next:function(){if(this.step===8){this.submit();return}this.step++},filtrarDatosActualizados:function(o){var a={};o.nombreUsuario!=this.usuario.nombreUsuario&&Object.assign(a,{nombreUsuario:o.nombreUsuario}),o.correo!=this.usuario.correo&&Object.assign(a,{correo:o.correo}),o.nombreCompleto!=this.usuario.nombreCompleto&&Object.assign(a,{nombreCompleto:o.nombreCompleto}),this.usuario.fechaNacimiento?o.fechaNacimiento!=this.usuario.fechaNacimiento._seconds*1e3&&Object.assign(a,{fechaNacimiento:o.fechaNacimiento}):o.fechaNacimiento!=this.usuario.fechaNacimiento&&Object.assign(a,{fechaNacimiento:o.fechaNacimiento}),this.usuario.jekuaaPremium.plan?(o.jekuaaPremium.plan!=this.usuario.jekuaaPremium.plan||o.jekuaaPremium.fechaCompra!=this.usuario.jekuaaPremium.fechaCompra._seconds*1e3||o.jekuaaPremium.fechaHasta!=this.usuario.jekuaaPremium.fechaHasta._seconds*1e3)&&Object.assign(a,{jekuaaPremium:o.jekuaaPremium}):(o.jekuaaPremium.plan!=this.usuario.jekuaaPremium.plan||o.jekuaaPremium.fechaCompra!=this.usuario.jekuaaPremium.fechaCompra||o.jekuaaPremium.fechaHasta!=this.usuario.jekuaaPremium.fechaHasta)&&Object.assign(a,{jekuaaPremium:o.jekuaaPremium});var r=o.jekuaaRoles.secciones.sort(),u=this.usuario.jekuaaRoles.secciones.sort();return(o.jekuaaRoles.rol!=this.usuario.jekuaaRoles.rol||JSON.stringify(r)!=JSON.stringify(u)||o.jekuaaRoles.instructor!=this.usuario.jekuaaRoles.instructor)&&Object.assign(a,{jekuaaRoles:o.jekuaaRoles}),o.jekuaaPoint!=this.usuario.jekuaaPoint&&Object.assign(a,{jekuaaPoint:o.jekuaaPoint}),a}},watch:{habilitado:function(o,a){this.estaHabilitado=o},planSeleccionado:function(o,a){if(this.datosUsuario.jekuaaPremium.plan=o.value,!o.value){this.rangoFechaPremium=[],this.horaFechaPremium="",this.infoTextoFormulario[4].error=!1;return}(this.rangoFechaPremium.length<2||!this.horaFechaPremium)&&(this.infoTextoFormulario[4].error=!0)},rangoFechaPremium:function(o,a){if(this.planSeleccionado.value){if(console.log("this.planSeleccionado.value",this.planSeleccionado.value),console.log("nuevo",o),o.length<2){this.infoTextoFormulario[4].error=!0;return}this.infoTextoFormulario[4].error=!1;var r=new Date(o[0]),u=new Date(o[1]);r.getTime()<u.getTime()?(this.datosUsuario.jekuaaPremium.fechaCompra=o[0],this.datosUsuario.jekuaaPremium.fechaHasta=o[1]):r.getTime()>u.getTime()?(this.datosUsuario.jekuaaPremium.fechaCompra=o[1],this.datosUsuario.jekuaaPremium.fechaHasta=o[0]):this.rangoFechaPremium=[],console.log("this.datosUsuario.jekuaaPremium",this.datosUsuario.jekuaaPremium),this.horaFechaPremium||(this.infoTextoFormulario[4].error=!0)}},horaFechaPremium:function(o,a){this.planSeleccionado.value&&(this.rangoFechaPremium.length<2||!o?this.infoTextoFormulario[4].error=!0:this.infoTextoFormulario[4].error=!1)},rolSeleccionado:function(o,a){this.datosUsuario.jekuaaRoles.rol=o.value,this.esMiembroJekuaa()?this.necesitaSecciones()?this.datosUsuario.jekuaaRoles.secciones.length?this.infoTextoFormulario[5].error=!1:this.infoTextoFormulario[5].error=!0:(this.datosUsuario.jekuaaRoles.secciones=[],this.infoTextoFormulario[5].error=!1):(this.datosUsuario.jekuaaRoles.secciones=[],this.datosUsuario.jekuaaRoles.instructor=!1,this.infoTextoFormulario[5].error=!1)},"datosUsuario.jekuaaRoles.secciones":function(o,a){this.necesitaSecciones()&&(o.length?this.infoTextoFormulario[5].error=!1:this.infoTextoFormulario[5].error=!0)},"datosUsuario.nombreUsuario":function(o,a){this.infoTextoFormulario[0].existe=!!o},"datosUsuario.correo":function(o,a){this.infoTextoFormulario[1].existe=!!o},contrasenha:function(o,a){this.infoTextoFormulario[7].existe=!!o}},mounted:function(){var o=this;if(this.modo=this.accionModo,this.modo==="crear")this.datosUsuario={nombreUsuario:"",correo:"",nombreCompleto:"",fechaNacimiento:"",jekuaaPremium:{plan:"",fechaCompra:"",fechaHasta:""},jekuaaRoles:{rol:"estudiante",secciones:[],instructor:!1},jekuaaPoint:0},this.contrasenha="",this.planSeleccionado={text:"Elegir un plan",value:""},this.rangoFechaPremium=[],this.horaFechaPremium="",this.rolSeleccionado={text:"Estudiante",value:"estudiante"};else{if(this.infoTextoFormulario[7].requerido=!1,this.datosUsuario=JSON.parse(JSON.stringify(this.usuario)),this.estaHabilitado=this.habilitado,this.datosUsuario.fechaNacimiento=this.usuario.fechaNacimiento?this.stringFechaPorSegundos(this.usuario.fechaNacimiento._seconds).substr(0,10):"",this.planSeleccionado=this.planes.find(function(u){return u.value===o.usuario.jekuaaPremium.plan}),this.planSeleccionado.value){var a=this.stringFechaPorSegundos(this.usuario.jekuaaPremium.fechaCompra._seconds),r=this.stringFechaPorSegundos(this.usuario.jekuaaPremium.fechaHasta._seconds);this.rangoFechaPremium[0]=a.substr(0,10),this.rangoFechaPremium[1]=r.substr(0,10),this.datosUsuario.jekuaaPremium.fechaCompra=a.substr(0,10),this.datosUsuario.jekuaaPremium.fechaHasta=r.substr(0,10),this.horaFechaPremium=a.substr(11,a.length)}this.rolSeleccionado=this.roles.find(function(u){return u.value===o.usuario.jekuaaRoles.rol})}}},O=C,V=s(554),P=s(42),S=s(48),n=s.n(S),_=s(241),v=s(117),k=s(613),E=s(486),w=s(846),R=s(806),N=s(485),L=s(635),I=s(801),J=s(802),x=s(803),H=s(804),M=s(262),z=s(840),$=Object(P.a)(O,p,U,!1,null,null,null),K=f.default=$.exports;n()($,{VAvatar:_.a,VBtn:v.a,VChip:k.a,VCol:E.a,VCombobox:w.a,VDatePicker:R.a,VRow:N.a,VSelect:L.a,VStepper:I.a,VStepperContent:J.a,VStepperStep:x.a,VSwitch:H.a,VTextField:M.a,VTimePicker:z.a})},579:function(j,f,s){"use strict";var p=s(557),U=s.n(p)},621:function(j,f,s){},638:function(j,f,s){"use strict";s.r(f);var p=function(){var n=this,_=n.$createElement,v=n._self._c||_;return v("v-dialog",{attrs:{"max-width":"800px"},model:{value:n.estadoDialogController,callback:function(k){n.estadoDialogController=k},expression:"estadoDialogController"}},[v("v-card",[v("v-card-title",{staticClass:"informacionAccion textoInformacionAccion"},[n._v(`
            `+n._s(n.titulo)+`
        `)]),n._v(" "),v("v-card-text",{staticClass:"informacionAccion textoInformacionAccion"},[n._v(`
            `+n._s(n.mensaje)+`
        `)]),n._v(" "),v("v-card-text",{staticClass:"mt-5"},[n._v(`
            `+n._s(n.explicacion)+": "),v("b",[n._v(n._s(n.uid))])]),n._v(" "),v("div",{staticClass:"container text-center",attrs:{"max-width":"400px"}},[v("v-text-field",{staticClass:"inputConfirmacionAccion",attrs:{counter:50,label:n.uid,required:""},model:{value:n.uidConfirmacionAccion,callback:function(k){n.uidConfirmacionAccion=k},expression:"uidConfirmacionAccion"}})],1),n._v(" "),v("v-card-actions",{staticClass:"d-flex flex-row-reverse pb-5 pt-5"},[v("v-btn",{staticClass:"ml-4 mr-3",attrs:{disabled:n.uidConfirmacionAccion!=n.uid,color:"red",text:""},on:{click:n.realizarAccion}},[n._v(`
                `+n._s(n.textoAccion)+`
            `)]),n._v(" "),v("v-btn",{attrs:{color:"grey darken-2",text:""},on:{click:function(k){n.estadoDialogController=!1}}},[n._v(`
                Cerrar
            `)])],1)],1)],1)},U=[],A={data:function(){return{estadoDialogController:!1,uidConfirmacionAccion:"",textoAccion:""}},props:{titulo:String,mensaje:String,explicacion:String,uid:String,estadoDialog:Boolean,accion:String},watch:{estadoDialog:function(_,v){_&&(this.estadoDialogController=_)},estadoDialogController:function(_,v){_||(this.uidConfirmacionAccion="",this.$emit("dialogCerrado",{cerrado:!_}))}},methods:{realizarAccion:function(){this.$emit("accion",{uid:this.uid}),this.estadoDialogController=!1},setNombreAccion:function(){if(this.accion==="agregar")this.textoAccion="Agregar";else if(this.accion==="actualizar")this.textoAccion="Actualizar";else if(this.accion==="eliminar")this.textoAccion="Eliminar";else if(this.accion==="leer")this.textoAccion="Leer";else throw new Error("No existe esta operacion.")}},created:function(){this.setNombreAccion()}},y=A,B=s(579),T=s(42),F=s(48),D=s.n(F),h=s(117),g=s(128),C=s(79),O=s(346),V=s(262),P=Object(T.a)(y,p,U,!1,null,"2982e1d3",null),S=f.default=P.exports;D()(P,{VBtn:h.a,VCard:g.a,VCardActions:C.a,VCardText:C.c,VCardTitle:C.d,VDialog:O.a,VTextField:V.a})},741:function(j,f,s){"use strict";var p=s(621),U=s.n(p)},826:function(j,f,s){"use strict";s.r(f);var p=function(){var e=this,o=e.$createElement,a=e._self._c||o;return a("div",{staticClass:"container"},[e.datosUsuario&&e.datosAuth?a("div",{staticClass:"text-center mt-2 mb-5"},[a("v-btn",{staticClass:"ma-2",attrs:{outlined:"",color:"#683bce"},on:{click:function(r){e.authVisible=!0}}},[e._v(`
            Ver Auth
        `)]),e._v(" "),e.datosAuth&&e.datosAuth.disabled?a("v-btn",{staticClass:"ma-2",attrs:{outlined:"",color:"green darken-1"},on:{click:e.habilitar}},[e._v(`
            Habilitar usuario
        `)]):a("v-btn",{staticClass:"ma-2",attrs:{outlined:"",color:"gray darken-1"},on:{click:e.deshabilitar}},[e._v(`
            Deshabilitar usuario
        `)]),e._v(" "),a("v-btn",{staticClass:"ma-2",attrs:{outlined:"",color:"red darken-1"},on:{click:function(r){e.estadoDialogEliminacion=!0}}},[e._v(`
            Eliminar usuario
        `)])],1):a("div",{staticClass:"text-center mt-2 mb-5"},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1),e._v(" "),a("v-divider",{staticClass:"my-3"}),e._v(" "),e.datosUsuario&&e.datosAuth?a("div",[a("formularioUsuario",{attrs:{habilitado:!e.datosAuth.disabled,uid:e.uidUsuario,usuario:e.datosUsuario,accionModo:"actualizar"},on:{actualizarUsuario:function(r){return e.actualizarUsuario(r)}}})],1):e._e(),e._v(" "),e.datosUsuario&&e.datosAuth?a("v-divider",{staticClass:"my-3"}):e._e(),e._v(" "),a("confirmacionAccionPorUID",{attrs:{titulo:"\xBFQuieres borrar el usuario?",mensaje:"Esta acci\xF3n borrar\xE1 permanentemente los datos del usuario.",explicacion:"Para confirmar que deseas borrar este usuario, escribe su UID",uid:e.uidUsuario,estadoDialog:e.estadoDialogEliminacion,accion:"eliminar"},on:{accion:function(r){return e.borrarUsuario(r)},dialogCerrado:function(r){return e.dialogEliminacionCerrado(r)}}}),e._v(" "),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.authVisible,callback:function(r){e.authVisible=r},expression:"authVisible"}},[a("v-card",[a("v-card-title",[e._v(`
                Datos Authentication
            `)]),e._v(" "),a("v-card-text",[a("v-divider",{staticClass:"mb-3"}),e._v(" "),e.datosAuth?a("div",[a("p",[a("b",[e._v(" UID: ")]),e._v(" "+e._s(e.datosAuth.uid)+" ")]),e._v(" "),a("p",[a("b",[e._v(" Correo: ")]),e._v(" "+e._s(e.datosAuth.email)+" ")]),e._v(" "),a("p",[a("b",[e._v(" Correo verificado: ")]),e._v(" "+e._s(e.datosAuth.emailVerified)+" ")]),e._v(" "),a("p",[a("b",[e._v(" Nombre de usuario: ")]),e._v(" "+e._s(e.datosAuth.displayName)+" ")]),e._v(" "),a("p",[a("b",[e._v(" Habilitado: ")]),e._v(" "+e._s(!e.datosAuth.disabled)+" ")]),e._v(" "),a("p",[a("b",[e._v(" Creado: ")]),e._v(" "+e._s(e.datosAuth.metadata.creationTime)+" ")]),e._v(" "),a("p",[a("b",[e._v(" Ultima vez iniciado sesi\xF3n: ")]),e._v(" "+e._s(e.datosAuth.metadata.lastSignInTime)+" ")]),e._v(" "),a("p",[a("b",[e._v(" Premium: ")]),e._v(" "+e._s(e.datosAuth.customClaims.jekuaaPremium)+" ")]),e._v(" "),a("p",[a("b",[e._v(" Rol: ")]),e._v(" "+e._s(e.datosAuth.customClaims.rol)+" ")])]):a("div",[e._v(`
                    Cargando...
                `)]),e._v(" "),a("v-divider",{staticClass:"mt-3"})],1),e._v(" "),a("v-card-actions",[a("v-btn",{attrs:{color:"#683bce",text:""},on:{click:function(r){e.authVisible=!1}}},[e._v(`
                Cerrar
            `)]),e._v(" "),a("v-btn",{staticClass:"white--text",attrs:{color:"#683bce"},on:{click:e.verDatosAuth}},[e._v(`
                Recargar
            `)])],1)],1)],1)],1)},U=[],A=s(14),y=s(12),B=s(15),T=s(17),F=s(13),D=s(18),h=s(19),g=s(4),C=s(71),O=s(35),V=s(56),P=s(565),S=s(638),n=s(41);function _(e,o){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);o&&(r=r.filter(function(u){return Object.getOwnPropertyDescriptor(e,u).enumerable})),a.push.apply(a,r)}return a}function v(e){for(var o=1;o<arguments.length;o++){var a=arguments[o]!=null?arguments[o]:{};o%2?_(Object(a),!0).forEach(function(r){Object(g.a)(e,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):_(Object(a)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(a,r))})}return e}var k={name:"datosUsuario",middleware:"esMiembroJekuaa",data:function(){return{uidUsuario:this.$route.params.uidUsuario,uidUsuarioConfirmacionEliminar:"",estadoDialogEliminacion:!1,datosUsuario:null,datosAuth:null,usuarioActualizado:null,authVisible:!1}},components:{confirmacionAccionPorUID:S.default,formularioUsuario:P.default},methods:v(v({},Object(n.b)({errorHandler:"modules/system/errorHandler"})),{},{verDatosAuth:function(){var o=this;return Object(h.a)(regeneratorRuntime.mark(function a(){var r,u,i,l;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,r=o.$firebase.auth().currentUser,!r){t.next=8;break}return t.next=5,r.getIdToken();case 5:t.t0=t.sent,t.next=9;break;case 8:t.t0="";case 9:return r=t.t0,u="Bearer ".concat(r),t.next=13,o.$axios.$post("/miembroJekuaa/verDatosAuthPorUID/".concat(o.uidUsuario),{auth:u});case 13:i=t.sent,o.datosAuth=i.resultado,t.next=23;break;case 17:return t.prev=17,t.t1=t.catch(0),t.next=21,o.errorHandler(t.t1.response.data);case 21:l=t.sent,l.includes("error")?o.$nuxt.error({statusCode:t.t1.response.status}):l.includes("login")&&o.$router.push("/autenticacion/inicioSesion");case 23:case"end":return t.stop()}},a,null,[[0,17]])}))()},borrarUsuario:function(o){var a=this;return Object(h.a)(regeneratorRuntime.mark(function r(){var u,i,l,b,t;return regeneratorRuntime.wrap(function(d){for(;;)switch(d.prev=d.next){case 0:if(u=o.uid,d.prev=1,i=a.$firebase.auth().currentUser,!i){d.next=9;break}return d.next=6,i.getIdToken();case 6:d.t0=d.sent,d.next=10;break;case 9:d.t0="";case 10:return i=d.t0,l="Bearer ".concat(i),d.next=14,a.$axios.$post("/miembroJekuaa/eliminarUsuarioPorUID/".concat(a.uidUsuario),{auth:l});case 14:b=d.sent,a.$router.push("/miembro-jekuaa/usuarios/lista-usuarios"),d.next=24;break;case 18:return d.prev=18,d.t1=d.catch(1),d.next=22,a.errorHandler(d.t1.response.data);case 22:t=d.sent,t.includes("error")?a.$nuxt.error({statusCode:d.t1.response.status}):t.includes("login")&&a.$router.push("/autenticacion/inicioSesion");case 24:case"end":return d.stop()}},r,null,[[1,18]])}))()},dialogEliminacionCerrado:function(o){var a=o.cerrado;this.estadoDialogEliminacion=!a},actualizarUsuario:function(o){var a=this;return Object(h.a)(regeneratorRuntime.mark(function r(){var u,i,l,b,t,c;return regeneratorRuntime.wrap(function(m){for(;;)switch(m.prev=m.next){case 0:if(u=o.datosUsuario,i=o.contrasenha,console.log("data",o),m.prev=2,l=a.$firebase.auth().currentUser,!l){m.next=10;break}return m.next=7,l.getIdToken();case 7:m.t0=m.sent,m.next=11;break;case 10:m.t0="";case 11:return l=m.t0,b="Bearer ".concat(l),m.next=15,a.$axios.$post("/miembroJekuaa/actualizarUsuarioPorUID/".concat(a.uidUsuario),{auth:b,datosActualizados:u,contrasenha:i});case 15:t=m.sent,a.usuarioActualizado=t.resultado,m.next=25;break;case 19:return m.prev=19,m.t1=m.catch(2),m.next=23,a.errorHandler(m.t1.response.data);case 23:c=m.sent,c.includes("error")?a.$nuxt.error({statusCode:m.t1.response.status}):c.includes("login")&&a.$router.push("/autenticacion/inicioSesion");case 25:case"end":return m.stop()}},r,null,[[2,19]])}))()},habilitar:function(){var o=this;return Object(h.a)(regeneratorRuntime.mark(function a(){var r,u,i,l;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,r=o.$firebase.auth().currentUser,!r){t.next=8;break}return t.next=5,r.getIdToken();case 5:t.t0=t.sent,t.next=9;break;case 8:t.t0="";case 9:return r=t.t0,u="Bearer ".concat(r),t.next=13,o.$axios.$post("/miembroJekuaa/habilitarUsuarioPorUID/".concat(o.uidUsuario),{auth:u,habilitar:!0});case 13:i=t.sent,o.datosAuth=i.resultado,t.next=23;break;case 17:return t.prev=17,t.t1=t.catch(0),t.next=21,o.errorHandler(t.t1.response.data);case 21:l=t.sent,l.includes("error")?o.$nuxt.error({statusCode:t.t1.response.status}):l.includes("login")&&o.$router.push("/autenticacion/inicioSesion");case 23:case"end":return t.stop()}},a,null,[[0,17]])}))()},deshabilitar:function(){var o=this;return Object(h.a)(regeneratorRuntime.mark(function a(){var r,u,i,l;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,r=o.$firebase.auth().currentUser,!r){t.next=8;break}return t.next=5,r.getIdToken();case 5:t.t0=t.sent,t.next=9;break;case 8:t.t0="";case 9:return r=t.t0,u="Bearer ".concat(r),t.next=13,o.$axios.$post("/miembroJekuaa/habilitarUsuarioPorUID/".concat(o.uidUsuario),{auth:u,habilitar:!1});case 13:i=t.sent,o.datosAuth=i.resultado,t.next=23;break;case 17:return t.prev=17,t.t1=t.catch(0),t.next=21,o.errorHandler(t.t1.response.data);case 21:l=t.sent,l.includes("error")?o.$nuxt.error({statusCode:t.t1.response.status}):l.includes("login")&&o.$router.push("/autenticacion/inicioSesion");case 23:case"end":return t.stop()}},a,null,[[0,17]])}))()}}),created:function(){var o=this;return Object(h.a)(regeneratorRuntime.mark(function a(){var r,u,i,l,b;return regeneratorRuntime.wrap(function(c){for(;;)switch(c.prev=c.next){case 0:if(c.prev=0,o.uidUsuario=o.$route.params.uidUsuario,r=o.$firebase.auth().currentUser,!r){c.next=7;break}return c.next=6,r.getIdToken();case 6:r=c.sent;case 7:return u="Bearer ".concat(r),c.next=10,o.$axios.$post("/miembroJekuaa/verDatosUsuarioPorUID/".concat(o.uidUsuario),{auth:u});case 10:return i=c.sent,c.next=13,o.$axios.$post("/miembroJekuaa/verDatosAuthPorUID/".concat(o.uidUsuario),{auth:u});case 13:l=c.sent,o.datosUsuario=i.resultado,o.datosAuth=l.resultado,c.next=24;break;case 18:return c.prev=18,c.t0=c.catch(0),c.next=22,o.errorHandler(c.t0.response.data);case 22:b=c.sent,b.includes("error")?o.$nuxt.error({statusCode:c.t0.response.status}):b.includes("login")&&o.$router.push("/autenticacion/inicioSesion");case 24:case"end":return c.stop()}},a,null,[[0,18]])}))()}},E=k,w=s(741),R=s(42),N=s(48),L=s.n(N),I=s(117),J=s(128),x=s(79),H=s(346),M=s(489),z=s(239),$=Object(R.a)(E,p,U,!1,null,null,null),K=f.default=$.exports;L()($,{VBtn:I.a,VCard:J.a,VCardActions:x.a,VCardText:x.c,VCardTitle:x.d,VDialog:H.a,VDivider:M.a,VProgressCircular:z.a})}}]);