(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{702:function(e,t,n){"use strict";n.r(t);var l={props:{email:{type:String,default:""},noValidation:{type:Boolean,default:!1}},data:function(){return{rules:[function(e){return!!e||""},function(e){return/.+@.+\..+/.test(e)||""}]}},computed:{setEmail:{get:function(){return this.email},set:function(e){return this.$emit("update:email",e)}},form:function(){return{placeholder:this.noValidation?void 0:"your@email.com"}}}},o=n(55),r=n(65),c=n.n(r),d=n(119),component=Object(o.a)(l,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("v-text-field",{attrs:{rules:e.rules,label:"メールアドレスを入力",placeholder:e.form.placeholder,outlined:""},model:{value:e.setEmail,callback:function(t){e.setEmail=t},expression:"setEmail"}})}),[],!1,null,null,null);t.default=component.exports;c()(component,{VTextField:d.a})}}]);