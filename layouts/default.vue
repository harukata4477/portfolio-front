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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text"/>
      <v-toolbar-title class="display-1 white--text" align="center" @click="$router.push('/rooms/')" style="cursor:pointer; display: flex; align-items: center;" > 
        <p style="margin: 0 5px 0 2px; font-weight: bold; font-family: 'Roboto'; display: flex; align-items: center;">Post&nbsp;Map</p>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined 
          style="color: #fff; font-weight: bold;" @click="$router.push('/login')">ログイン</v-btn>
      
    </v-app-bar>
  <v-card class="overflow-hidden" min-height="100vh">
    <v-sheet
      id="scrolling-techniques-6"
      class="overflow-y-auto"
      max-height="100vh"
    >
    <v-container
      fluid
      class="my-container"
      min-height="100vh"
    >
        <v-main class="main">
          <div style="display: flex; align-items: center;" v-if="~$route.path.indexOf('/posts/')">
          <v-spacer></v-spacer>
            <div class="like">
              <v-icon  color="warning">mdi-thumb-up</v-icon>
              <!-- <v-icon color="warning">mdi-thumb-up-outline</v-icon> -->
            </div>
            <v-icon v-if="side == false" @click="side = !side" color="info">mdi-message-reply-text</v-icon>
          </div>
          <nuxt />
        </v-main>
      <v-navigation-drawer
        clipped
        floating
        right
        app
        fixed
        mobile-breakpoint="960"
        class="aside"
        v-model="side"
      >
        <!-- <memo />
        <calendar style="height: 49vh; overflow: hidden;"/> -->
        <div style="display: flex;" v-if="~$route.path.indexOf('/posts/')">
          <p>Live</p>
          <img style="width: 50px; height: 50px;" src="/live2.gif"/>
          <p>{{$route.path}}</p>
        </div>
        <template v-else>
          <p>お尻</p>
          <p>{{$route.path}}</p>
        </template>
      </v-navigation-drawer>
    </v-container>
    </v-sheet>
  </v-card>
  <v-footer width="100%" style="background-color: rgba(0, 126, 255); position: fixed;  bottom: 0; left: 0; padding: 12px 0; z-index: 2;">
    <bottom-menu />
  </v-footer>
  </v-app>
</template>

<script>
import BottomMenu from '../components/BottomMenu.vue'
export default {
  components: { BottomMenu },
    data () {
    return {
      collapseOnScroll: true,
      clipped: false,
      drawer: false,
      fixed: false,
      side: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'トップページ',
          to: '/rooms/'
        },
        {
          icon: 'mdi-television-guide',
          title: '今日の予定',
          to: '/today'
        },
        {
          icon: 'mdi-border-color',
          title: '新規作成',
          to: '/rooms/create'
        },
        {
          icon: 'mdi-application',
          title: 'その他',
          to: '/search/その他'
        },
      ],
    }
  },
}
</script>

<style scoped>

  @media (min-width: 960px){
    .main{
      padding: 52px 330px 34px 0px !important;
      margin: 0 2%;
    }
    .aside{
      position: fixed !important;
      width: 330px !important;
      /* max-height: 70vh !important; */
      right: 2% !important;
      top: 90px !important;
      height: 80vh !important;
      overflow: hidden !important;
      border-radius: 4px;
      padding: 0 1%;
      box-shadow: 0 1px 2px rgba(34,34,34,.25), 0 0 1px rgba(34,34,34,.35);
    }
  }
</style>
