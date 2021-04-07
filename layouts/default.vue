<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      temporary
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="pt-3 pb-3"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="info"
      style="right: 0;"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="left_drawer white--text" />
      <v-toolbar-title class="pl-0 display-1 white--text" align="center" @click="$router.push('/rooms/')" style="cursor:pointer; display: flex; align-items: center;" > 
        <p style="margin: 0; font-weight: bold; font-family: 'Roboto'; display: flex; align-items: center;"><v-icon large color="white" class="mr-1">mdi-sitemap</v-icon>Post&nbsp;Map</p>
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
     
      <notifications :url="$route.path" />
    </v-app-bar>
  <v-card class="overflow-hidden" min-height="100vh">
    <v-sheet
    >
    <v-container
      fluid
      class="my-container pt-0 pb-0"
      style="width: 100%;"
      min-height="100vh"
    >
        <v-main v-if="~$route.path.indexOf(`/rooms/${$route.params.id}`)">
          <div style="display: flex; align-items: center;" v-if="~$route.path.indexOf('/posts/main/')">
          <v-spacer></v-spacer>
            <v-icon v-if="side == false" @click="side = !side" color="info">mdi-message-reply-text</v-icon>
          </div>
          <nuxt />
        </v-main>

        <v-main v-else class="main">
          <div style="position: absolute; top: 10px; right: 40px; display: flex; align-items: center;" v-if="~$route.path.indexOf('/posts/main/')">
          <v-spacer></v-spacer>
            <v-icon v-if="side == false" @click="side = !side" color="info">mdi-message-reply-text</v-icon>
          </div>
          <nuxt />
        </v-main>
      <template v-if="~$route.path.indexOf(`/rooms/${$route.params.id}`)"></template>
      <template v-else-if="$route.path === '/posts/'"></template>
      <v-navigation-drawer
        v-else
        right
        app
        mobile-breakpoint="960"
        class="aside"
        v-model="side"
      >
        
        <div class="messages" style="display: block;" v-if="~$route.path.indexOf('/posts/main/')">
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
.main{
  padding: 56px 0 0 0 !important;
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
.left_drawer{
    display: none;
}
.v-footer{
  display: block;
}
@media (min-width: 960px){
  .my-container{
    max-width: 1250px;
    margin: 0 auto;
    display: flex;
    padding: 0 10px;
  }
  .main{
    padding: 64px 15px 0 0 !important;
    width: calc(100% - 380px);
    height: 100vh;
  }
  .left_drawer{
    display: block;
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
    z-index: 1;
    box-shadow: 0 1px 2px rgba(34,34,34,.25), 0 0 1px rgba(34,34,34,.35);
  }
  .v-footer{
    display: none;
  }
}
</style>
