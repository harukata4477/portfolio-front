<template>
  <v-app dark>

    <template v-if="~$route.path.indexOf(`/rooms/${$route.params.id}`)"></template>
    <v-app-bar
      v-else
      height="50px"
      :clipped-left="clipped"
      fixed
      app
      color="info"
      style="right: 0; left: 0; height: 50px !important;"
    >
      <v-toolbar-title class="toolbar_title pl-0 display-1 white--text" align="center" @click="$router.push('/posts/')"> 
        <p style="margin: 0; font-weight: bold; font-family: 'Roboto'; display: flex; align-items: center;"><v-icon large color="white" class="mr-1">mdi-sitemap</v-icon>Post&nbsp;Map</p>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <notifications v-if="loginJudge" />
      <v-btn v-else color="white" style="font-weight: bold;" outlined @click="$router.push('/')">始めよう！</v-btn>
    </v-app-bar>

    <v-main class="index_main" v-if="$route.path == '/'">
      <nuxt />
    </v-main>
    <v-card v-else class="overflow-hidden" min-height="100vh">

      <template v-if="~$route.path.indexOf(`/rooms/${$route.params.id}`)"></template>
      <v-navigation-drawer
        v-else
        v-model="drawer"
        expand-on-hover
        permanent
        color="info"
        app
        class="nav"
      >
        <v-app-bar-nav-icon class="left_drawer white--text" />
        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="color: #fff; font-weight: bold;">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-sheet
        class="sheet"
      >
        <v-container
          fluid
          class="my-container pt-0 pb-0"
          style="width: 100%;"
          min-height="100vh"
        >

          <v-main v-if="~$route.path.indexOf(`/rooms/${$route.params.id}`)">
            <div style="display: flex; align-items: center;" v-if="$route.path === `/posts/${$route.params.id}`">
            <v-spacer></v-spacer>
              <v-icon v-if="side == false" @click="side = !side" color="info">mdi-message-reply-text</v-icon>
            </div>
            <nuxt />
          </v-main>
          <v-main v-else class="main">
            <div style="position: absolute; top: 10px; right: 50px; display: flex; align-items: center;" v-if="$route.path === `/posts/${$route.params.id}`">
            <v-spacer></v-spacer>
              <v-icon v-if="side == false" @click="side = !side" color="info">mdi-message-reply-text</v-icon>
            </div>
            <nuxt />
          </v-main>

          <template v-if="~$route.path.indexOf(`/rooms/${$route.params.id}`)"></template>
          <template v-else-if="$route.path === '/posts/'"></template>
          <template v-else-if="~$route.path.indexOf(`/create`)"></template>
          <template v-else-if="~$route.path.indexOf(`/calendars`)"></template>
          <template v-else-if="~$route.path.indexOf(`/login`)"></template>
          <template v-else-if="~$route.path.indexOf(`/signup`)"></template>
          <v-navigation-drawer
            v-else
            right
            app
            mobile-breakpoint="960"
            class="aside"
            v-model="side"
          >
            
            <div class="messages" style="display: block;" v-if="$route.path === `/posts/${$route.params.id}`">
              <messages-form type="type" :messageId="$route.params.id" />
            </div>
            <template v-else>
              <calendars />
            </template>

          </v-navigation-drawer>
        </v-container>
      </v-sheet>
    </v-card>

    <template v-if="~$route.path.indexOf(`/rooms/${$route.params.id}`)"></template>
    <v-footer v-else width="100%" style="background-color: rgba(0, 126, 255); position: fixed;  bottom: 0; left: 0; padding: 12px 0; z-index: 2;">
      <bottom-menu :id.sync="id" />
    </v-footer>

  </v-app>
</template>

<script>
import { VueLoading } from 'vue-loading-template'
import BottomMenu from '../components/BottomMenu.vue'
import Calendars from '../components/calendars/Calendars.vue'
import MessagesForm from '../components/messages/MessagesForm.vue'
import Notifications from '../components/notifications/Notifications.vue'
export default {
  components: { BottomMenu,VueLoading,MessagesForm,Notifications, Calendars },
    data () {
    return {
      id: '',
      user_url: '',
      user_post_url: '',
      collapseOnScroll: true,
      clipped: false,
      drawer: false,
      fixed: false,
      side: false,
      parentPage: false,
      loginJudge: false,

      items: [
        {
          icon: 'mdi-home',
          title: 'ホーム',
          to: '/posts/'
        },
        {
          icon: 'mdi-application',
          title: '自分の投稿',
          to: `${this.user_post_url}`
        },
        {
          icon: 'mdi-sitemap',
          title: 'マインドマップ',
          to: '/rooms/'
        },
        {
          icon: 'mdi-calendar-multiple',
          title: 'カレンダー',
          to: '/calendars'
        },
        {
          icon: 'mdi-account',
          title: 'マイアカウント',
          to: `${this.user_url}`
        },
      ],
    }
  },
  created () {
    if(localStorage.getItem('X-Access-Token')){
      this.loginJudge = true
    }else{
      this.loginJudge = false
    }
  },
  beforeCreate() {
    if(localStorage.getItem('id') == null){
      this.user_url = '/users/'
      this.user_post_url = '/users/posts/'
    }else{
      this.user_url = `/users/${localStorage.getItem('id')}`
      this.user_post_url = `/users/posts/${localStorage.getItem('id')}`
    }
  },
}
</script>

<style>
@keyframes fadeIn {
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}
.loading{
  position: absolute;
  top: 0;
  bottom:0;
  right:0;
  left:0;
  background: rgba(255, 255, 255, 0.199);
  z-index: 110;
}
.loading_inner{
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translate(50%,50%);
}
.loading_inner_text{
  margin: 0;
  animation: fadeIn infinite alternate 2s;
}
.alert{
  position: fixed !important; 
  top: 70px; 
  left: 2.5%; 
  z-index: 105; 
  width: 95%;
}

.toolbar_title{
  cursor: pointer; 
}
.index_main{
  padding: 50px 0 0 0 !important;
  height: calc(100vh - 48px);
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.index_main::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none;
}
.nav{
  display: none !important;
}
.left_drawer{
  height: 63px !important;
  margin-left: 10px;
}
.sheet{
  margin: 0;
}
.main{
  padding: 50px 0 0 0 !important;
  height: calc(100vh - 48px);
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.main::-webkit-scrollbar {
  display:none;
  -ms-overflow-style: none;
}
.v-toolbar__content{
  justify-content: space-between;
}
.aside{
  position: fixed !important;
  right: 0;
  z-index: 100;
}
.v-footer{
  display: block;
}
@media (min-width: 960px){
  .toolbar_title{
    position: absolute; 
    right: 50%; 
    transform: translateX(50%); 
    cursor:pointer; 
    display: flex; 
    align-items: center;
  }
  .nav{
    display: block !important;
  }
  .sheet{
    margin-left: 60px;
  }
  .my-container{
    max-width: 1250px;
    margin: 0 auto;
    display: flex;
    padding: 0 10px;
  }
  .main{
    padding: 50px 0 0 0 !important;
    width: calc(100% - 380px);
    height: 100vh;
  }
  .aside{
    transform: translateX(0%) !important;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
    position: unset !important;
    visibility: initial !important;
    margin-top: 80px;
    width: 330px !important;
    height: calc(100vh - 100px) !important;
    border-radius: 4px;
    padding: 0 1%;
    margin-left: 15px;
    z-index: 1;
    box-shadow: 0 1px 2px rgba(34,34,34,.25), 0 0 1px rgba(34,34,34,.35);
  }
  .v-footer{
    display: none;
  }
}
</style>
