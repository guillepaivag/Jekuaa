(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{837:function(p,r,n){"use strict";n.r(r);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("editor-content",{attrs:{editor:t.editor}})},s=[],a=n(773),d=n(774),l={components:{EditorContent:a.b},props:{modelValue:{type:String,default:""}},data:function(){return{editor:null}},watch:{modelValue:function(e){var o=this.editor.getHTML()===e;o||this.editor.commands.setContent(e,!1)}},mounted:function(){var e=this;this.editor=new a.a({extensions:[d.a],content:this.modelValue,onUpdate:function(){e.$emit("update:modelValue",e.editor.getHTML())}})},beforeUnmount:function(){this.editor.destroy()}},u=l,m=n(42),c=Object(m.a)(u,i,s,!1,null,null,null),v=r.default=c.exports}}]);