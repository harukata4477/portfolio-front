(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{695:function(t,e,n){var content=n(696);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(11).default)("7f6d4ad6",content,!0,{sourceMap:!1})},696:function(t,e,n){var r=n(10)(!1);r.push([t.i,"@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.loading{position:absolute;top:0;bottom:0;right:0;left:0;background:hsla(0,0%,100%,.199);z-index:100}.loading_inner{position:absolute;bottom:50%;right:50%;transform:translate(50%,50%)}.loading_inner_text{margin:0;-webkit-animation:fadeIn 2s infinite alternate;animation:fadeIn 2s infinite alternate}.alert{position:fixed!important;top:70px;left:2.5%;z-index:30;width:95%}.theme--light.v-pagination .v-pagination__item{background:#fff;color:rgba(0,0,0,.87)}.theme--light.v-pagination .v-pagination__item--active{color:#fff}.theme--light.v-pagination .v-pagination__navigation{background:#fff}.theme--dark.v-pagination .v-pagination__item{background:#1e1e1e;color:#fff}.theme--dark.v-pagination .v-pagination__item--active{color:#fff}.theme--dark.v-pagination .v-pagination__navigation{background:#1e1e1e}.v-pagination{align-items:center;display:inline-flex;list-style-type:none;justify-content:center;margin:0;max-width:100%;width:100%}.v-pagination.v-pagination{padding-left:0}.v-pagination>li{align-items:center;display:flex}.v-pagination--circle .v-pagination__item,.v-pagination--circle .v-pagination__more,.v-pagination--circle .v-pagination__navigation{border-radius:50%}.v-pagination--disabled{pointer-events:none;opacity:.6}.v-pagination__item{background:transparent;border-radius:4px;font-size:1rem;height:34px;margin:.3rem;min-width:34px;padding:0 5px;text-decoration:none;transition:.3s cubic-bezier(0,0,.2,1);width:auto;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-pagination__item--active{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.v-pagination__navigation{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);border-radius:4px;display:inline-flex;justify-content:center;align-items:center;text-decoration:none;height:32px;width:32px;margin:.3rem 10px}.v-pagination__navigation .v-icon{transition:.2s cubic-bezier(.4,0,.6,1);vertical-align:middle}.v-pagination__navigation--disabled{opacity:.6;pointer-events:none}.v-pagination__more{margin:.3rem;display:inline-flex;align-items:flex-end;justify-content:center;height:32px;width:32px}",""]),t.exports=r},708:function(t,e,n){"use strict";n(14),n(36),n(35),n(16),n(76),n(19),n(695);var r=n(25),o=n(89),l=n(13),d=n(291),c=n(8),h=n(6);e.a=Object(h.a)(l.a,Object(d.a)({onVisible:["init"]}),c.a).extend({name:"v-pagination",directives:{Resize:o.a},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function(t){return t%1==0}},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data:function(){return{maxButtons:0,selected:null}},computed:{classes:function(){return Object.assign({"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled},this.themeClasses)},items:function(){var t=parseInt(this.totalVisible,10);if(0===t)return[];var e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);var n=e%2==0?1:0,r=Math.floor(e/2),o=this.length-r+1+n;if(this.value>r&&this.value<o){var l=this.value-r+2,d=this.value+r-2-n;return[1,"..."].concat(this.range(l,d),["...",this.length])}if(this.value===r){var c=this.value+r-1-n;return[].concat(this.range(1,c),["...",this.length])}if(this.value===o){var h=this.value-r+1;return[1,"..."].concat(this.range(h,this.length))}return[].concat(this.range(1,r),["..."],this.range(o,this.length))}},watch:{value:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.selected=null,this.$nextTick(this.onResize),setTimeout((function(){return t.selected=t.value}),100)},onResize:function(){var t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next:function(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous:function(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range:function(t,e){for(var n=[],i=t=t>0?t:1;i<=e;i++)n.push(i);return n},genIcon:function(t,e,n,o,label){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":n},attrs:{disabled:n,type:"button","aria-label":label},on:n?{}:{click:o}},[t(r.a,[e])])])},genItem:function(t,i){var e=this,n=i===this.value&&(this.color||"primary"),r=i===this.value,o=r?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(n,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":i===this.value},attrs:{type:"button","aria-current":r,"aria-label":this.$vuetify.lang.t(o,i)},on:{click:function(){return e.$emit("input",i)}}}),[i.toString()])},genItems:function(t){var e=this;return this.items.map((function(i,n){return t("li",{key:n},[isNaN(Number(i))?t("span",{class:"v-pagination__more"},[i.toString()]):e.genItem(t,i)])}))},genList:function(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render:function(t){var e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}})},866:function(t,e,n){var content=n(907);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(11).default)("2202751c",content,!0,{sourceMap:!1})},906:function(t,e,n){"use strict";n(866)},907:function(t,e,n){var r=n(10)(!1);r.push([t.i,"@-webkit-keyframes fadeIn-data-v-30dc4e85{0%{opacity:0}to{opacity:1}}@keyframes fadeIn-data-v-30dc4e85{0%{opacity:0}to{opacity:1}}.user_header[data-v-30dc4e85]{align-items:center;height:60px;padding:0 10px}.menu[data-v-30dc4e85],.user_header[data-v-30dc4e85]{display:flex;justify-content:space-between}.menu[data-v-30dc4e85]{position:relative;list-style:none;padding:0;margin:0;width:100%;overflow-x:scroll;overflow-y:hidden;border-bottom:1px solid #eee;-ms-overflow-style:none;scrollbar-width:none}.menu[data-v-30dc4e85]::-webkit-scrollbar{display:none;-ms-overflow-style:none}.menu_notice[data-v-30dc4e85]{display:block;position:absolute;margin-top:-5px;right:0;-webkit-animation:fadeIn-data-v-30dc4e85 2s infinite alternate;animation:fadeIn-data-v-30dc4e85 2s infinite alternate;color:grey;font-size:10px}.menu li[data-v-30dc4e85]{min-width:100px;width:100%;font-size:13px;font-weight:700;cursor:pointer;color:grey}.menu li[data-v-30dc4e85]:hover{background-color:rgba(33,149,243,.09412);color:#2196f3}.menu_link[data-v-30dc4e85]{justify-content:center;margin:0;height:40px}.menu_link[data-v-30dc4e85],.type[data-v-30dc4e85]{display:flex;align-items:center;width:100%}.type[data-v-30dc4e85]{overflow-x:scroll;padding:0;height:35px}.type[data-v-30dc4e85],.type li[data-v-30dc4e85]{text-align:center}.type li[data-v-30dc4e85]{list-style:none;color:#fff;font-weight:700;background-color:rgb(75 163 239);padding:3px 7px;margin:0 6px;border-radius:20px;font-size:15px;min-width:-webkit-fit-content;min-width:-moz-fit-content;min-width:fit-content;cursor:pointer;box-shadow:0 2px .5px -2px rgb(0 0 0/20%),0 2px 2px 0 rgb(0 0 0/14%),0 1px 5px 0 rgb(0 0 0/12%)}.type li[data-v-30dc4e85]:hover{box-shadow:0 .6px .6px .5px rgb(0 0 0/20%)}.user[data-v-30dc4e85]{display:flex;align-items:center;cursor:pointer;width:70%}.user_img[data-v-30dc4e85]{width:30px;height:30px;border-radius:100%}.user_name[data-v-30dc4e85]{margin:0 0 0 10px;height:25px;width:100%;overflow:scroll}.user_header_left[data-v-30dc4e85]{width:70%;overflow:hidden;height:58px;display:flex;align-items:center}.user_header_left_title[data-v-30dc4e85]{font-weight:700;margin:0;font-size:20px;cursor:pointer}.user_header_right[data-v-30dc4e85]{align-items:center;height:100%;display:flex}.user_header_right_btn[data-v-30dc4e85]{display:flex;align-items:center;margin-right:10px;padding:3px;font-weight:700;background:rgba(0,126,255,.74118);color:#fff;border-radius:5px;box-shadow:0 2px 4px -1px rgb(0 0 0/20%);font-size:15px}.user_header_right_btn_icon[data-v-30dc4e85]{color:#fff;font-size:15px;margin-right:2px}.user_to_index[data-v-30dc4e85]{font-size:13px;color:rgb(0 126 255);height:45px;display:flex;align-items:center}.user_to_index_icon[data-v-30dc4e85]{font-size:14px;color:rgb(0 126 255)}.tag_list[data-v-30dc4e85]{position:absolute;top:2%;left:2%}.tag[data-v-30dc4e85]{white-space:pre;margin:0 5px;font-size:10px;font-weight:700;border-radius:10px;background:rgba(91,164,248,.7);display:inline-block}.contents[data-v-30dc4e85]{height:calc(100vh - 244px);overflow-y:scroll;overflow-x:hidden;border-bottom:1px solid #eee;-ms-overflow-style:none;scrollbar-width:none}.contents[data-v-30dc4e85]::-webkit-scrollbar{display:none;-ms-overflow-style:none}.contents_card_title[data-v-30dc4e85]{font-size:15px;font-weight:700;line-height:1.5;overflow:scroll;height:50px}.contents_card_user[data-v-30dc4e85]{display:flex}@media (min-width:530px){.content_img[data-v-30dc4e85]{max-width:350px;margin:auto}.menu_notice[data-v-30dc4e85]{display:none}}@media (min-width:600px){.post_content[data-v-30dc4e85]{max-width:32%;margin:0 .6%}}@media (min-width:960px){.contents[data-v-30dc4e85]{height:calc(100vh - 200px)}}",""]),t.exports=r},947:function(t,e,n){"use strict";n.r(e);var r=n(18),o=(n(102),{components:{VueLoading:n(103).VueLoading},data:function(){return{title:"投稿一覧",users:[],posts:[],like_counts:[],like_judges:[],currentPage:1,totalPage:1,page:1,loading:!0}},computed:{apiUrl:function(){return"http://54.248.224.191"}},created:function(){var t=this;localStorage.getItem("id")==this.$route.params.id?this.items=[{title:"ユーザー情報",link:"/users/"+this.$route.params.id},{title:"投稿一覧",link:"/users/posts/"+this.$route.params.id},{title:"いいね一覧",link:"/users/likes/"+this.$route.params.id},{title:"フォロー中",link:"/users/follows/"+this.$route.params.id},{title:"フォロワー",link:"/users/followers/"+this.$route.params.id},{title:"設定",link:"/users/edits/"+this.$route.params.id}]:this.items=[{title:"ユーザー情報",link:"/users/"+this.$route.params.id},{title:"投稿一覧",link:"/users/posts/"+this.$route.params.id},{title:"いいね一覧",link:"/users/likes/"+this.$route.params.id},{title:"フォロー中",link:"/users/follows/"+this.$route.params.id},{title:"フォロワー",link:"/users/followers/"+this.$route.params.id}],localStorage.getItem("X-Access-Token")?this.$axios.$get("api/posts/post_user/"+this.$route.params.id+"?page="+this.page,{headers:{"X-Access-Token":localStorage.getItem("X-Access-Token")}}).then((function(e){for(var i=0;i<e.data.length;i++)t.posts.push({id:e.data[i].attributes.id,user_id:e.data[i].attributes.user_id,title:e.data[i].attributes.title,kind:e.data[i].attributes.kind,tag_list:e.data[i].attributes.tag_list}),t.like_counts.push(e.data[i].attributes.likes.length),t.like_judges.push(e.data[i].attributes.like_judges),t.users.push(e.data[i].attributes.users);t.currentPage=e.pagination.current_page,t.totalPage=e.pagination.total_pages,t.loading=!1})).catch(this.loading=!1):this.$axios.$get("api/posts/post_user/"+this.$route.params.id+"?page="+this.page).then((function(e){for(var i=0;i<e.data.length;i++)t.posts.push({id:e.data[i].attributes.id,user_id:e.data[i].attributes.user_id,title:e.data[i].attributes.title,kind:e.data[i].attributes.kind,tag_list:e.data[i].attributes.tag_list}),t.like_counts.push(e.data[i].attributes.likes.length),t.like_judges.push(e.data[i].attributes.like_judges),t.users.push(e.data[i].attributes.users);t.currentPage=e.pagination.current_page,t.totalPage=e.pagination.total_pages,t.loading=!1})).catch(this.loading=!1)},methods:{like:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!localStorage.getItem("id")){n.next=6;break}return e.loading=!0,r={post_id:t.id,user_id:t.user_id},n.next=5,e.$axios.$post("api/likes/",r,{headers:{"X-Access-Token":localStorage.getItem("X-Access-Token")}});case 5:e.$axios.$get("api/posts/post_user/"+e.$route.params.id+"?page="+e.page,{headers:{"X-Access-Token":localStorage.getItem("X-Access-Token")}}).then((function(t){e.like_counts=[],e.like_judges=[];for(var i=0;i<t.data.length;i++)e.like_counts.push(t.data[i].attributes.likes.length),e.like_judges.push(t.data[i].attributes.like_judges);e.loading=!1}));case 6:case"end":return n.stop()}}),n)})))()},unlike:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!localStorage.getItem("id")){n.next=5;break}return e.loading=!0,n.next=4,e.$axios.$delete("api/likes/"+t.id,{headers:{"X-Access-Token":localStorage.getItem("X-Access-Token")}});case 4:e.$axios.$get("api/posts/post_user/"+e.$route.params.id+"?page="+e.page,{headers:{"X-Access-Token":localStorage.getItem("X-Access-Token")}}).then((function(t){e.like_counts=[],e.like_judges=[];for(var i=0;i<t.data.length;i++)e.like_counts.push(t.data[i].attributes.likes.length),e.like_judges.push(t.data[i].attributes.like_judges);e.loading=!1}));case 5:case"end":return n.stop()}}),n)})))()},morePage:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e.loading=!0,e.page=t,e.posts=[],e.users=[],e.like_counts=[],e.like_judges=[],e.$axios.$get("api/posts/post_user/"+e.$route.params.id+"?page="+e.page).then((function(t){for(var i=0;i<t.data.length;i++)e.posts.push({id:t.data[i].attributes.id,user_id:t.data[i].attributes.user_id,title:t.data[i].attributes.title,kind:t.data[i].attributes.kind,tag_list:t.data[i].attributes.tag_list}),e.like_counts.push(t.data[i].attributes.likes.length),e.like_judges.push(t.data[i].attributes.like_judges),e.users.push(t.data[i].attributes.users);e.currentPage=t.pagination.current_page,e.totalPage=t.pagination.total_pages,e.loading=!1}));case 7:case"end":return n.stop()}}),n)})))()}}}),l=(n(906),n(55)),d=n(65),c=n.n(d),h=n(165),v=n(271),f=n(51),m=n(668),_=n(162),x=n(215),k=n(708),y=n(666),w=n(670),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.loading?n("div",{staticClass:"loading"},[n("div",{staticClass:"loading_inner"},[n("p",{staticClass:"loading_inner_text"},[t._v("Loading...")]),t._v(" "),n("vue-loading",{staticClass:"loading_inner_mark",attrs:{type:"beat",color:"gold",size:{width:"60px",height:"60px"}}})],1)]):t._e(),t._v(" "),t._m(0),t._v(" "),n("p",{staticClass:"menu_notice"},[t._v("←scroll→")]),t._v(" "),n("ul",{staticClass:"menu"},t._l(t.items,(function(e,i){return n("li",{on:{click:function(n){return t.$router.push(e.link)}}},[t.title==t.items[i].title?n("p",{staticClass:"menu_link",staticStyle:{color:"#2196f3","border-bottom":"2px solid #2196f3"}},[t._v(t._s(e.title))]):n("p",{staticClass:"menu_link"},[t._v(t._s(e.title))])])})),0),t._v(" "),n("div",{staticClass:"contents"},[n("v-row",{staticClass:"mt-2",attrs:{dense:""}},t._l(t.posts,(function(e,a){return n("v-col",{key:"post-"+a,staticClass:"post_content mb-4",attrs:{cols:6}},[n("v-card",[n("v-img",{staticClass:"white--text align-end",attrs:{"background-color":"gray","min-height":"155px",gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",src:"/img/img"+e.kind+".svg"},on:{click:function(n){return t.$router.push("/posts/"+e.id)}}},[n("div",{staticClass:"tag_list"},t._l(e.tag_list,(function(e,b){return n("p",{key:"tag-"+b,staticClass:"tag pl-1 pr-1 mb-0 mr-1",domProps:{textContent:t._s(e)}})})),0),t._v(" "),n("v-card-title",{staticClass:"contents_card_title pt-0 pb-2",domProps:{textContent:t._s(e.title)}})],1),t._v(" "),n("v-card-actions",[n("div",{staticClass:"contents_card_user",on:{click:function(e){return t.$router.push("/users/"+t.users[a].id)}}},[n("v-img",{staticClass:"user_img",attrs:{src:""+t.apiUrl+t.users[a].image.url}}),t._v(" "),n("p",{staticClass:"user_name"},[t._v(t._s(t.users[a].name))])],1),t._v(" "),n("v-spacer"),t._v("\n            "+t._s(t.like_counts[a])+"\n            "),n("v-btn",{attrs:{icon:""}},[t.like_judges[a]?n("v-icon",{attrs:{color:"orange"},on:{click:function(e){return t.unlike(t.posts[a])}}},[t._v("mdi-thumb-up")]):n("v-icon",{on:{click:function(e){return t.like(t.posts[a])}}},[t._v("mdi-thumb-up-outline")])],1)],1)],1)],1)})),1),t._v(" "),n("div",{staticClass:"text-center mt-5 mb-8"},[n("v-pagination",{attrs:{length:this.totalPage,"total-visible":7},on:{input:function(e){return t.morePage(t.page)}},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)],1),t._v(" "),n("button",{staticClass:"user_to_index",on:{click:function(e){return t.$router.push("/users/")}}},[n("v-icon",{staticClass:"user_to_index_icon"},[t._v("mdi-home")]),t._v(" User一覧")],1)])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"user_header"},[n("div",{staticClass:"user_header_left"},[n("p",{staticClass:"user_header_left_title"},[t._v("投稿一覧")])]),t._v(" "),n("div",{staticClass:"user_header_right"})])}],!1,null,"30dc4e85",null);e.default=component.exports;c()(component,{VBtn:h.a,VCard:v.a,VCardActions:f.a,VCardTitle:f.c,VCol:m.a,VIcon:_.a,VImg:x.a,VPagination:k.a,VRow:y.a,VSpacer:w.a})}}]);