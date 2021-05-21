<template>
  <div style="display: inline-block;">
    <v-alert class="alert" icon="mdi-bell" type="info" v-model="notificationAlert" transition="slide-y-transition">
       通知があります。
    </v-alert>
    <v-dialog
      v-model="notificationForm"
      persistent
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          color="transparent"
          fab
          hide-details="auto"
          depressed
          small
        >
          <v-badge
            color="orange"
            overlap
            :content="counts"
            :value="counts"
            icon
          ><v-icon color="white">mdi-bell</v-icon></v-badge>
        </v-btn>
      </template>
      <v-card>

        <div v-if="loading" class="loading">
          <div class="loading_inner">
            <p class="loading_inner_text">Loading...</p>
            <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
          </div>
        </div>

        <v-card-title class="headline">
          通知
          <v-spacer></v-spacer>
          <div style="cursor: pointer;" class="all_check" @click="allUpdate">
            <v-icon style="font-size: 20px;">mdi-check</v-icon>
            <p>全て既読にする</p>
          </div>
        </v-card-title>

        <v-card-text style="overflow-y: scroll; overflow-x: hidden; height: 70vh;">
          <v-container style="border-bottom: solid 1px #eee;" v-for="notification in notifications">
            <template v-if="notification.core.action == 'follow'">
              <div class="all_check">
                <p>{{notification.core.created_at}}</p>
                <v-spacer></v-spacer>
                <v-icon style="font-size: 20px;">mdi-check</v-icon>
                <p style="cursor: pointer;" @click="update(notification.core.id)">既読する</p>
              </div>
              <p><strong class="notification_hover" @click="$router.push(`/users/${notification.visitor.id}`), notificationForm = false">{{notification.visitor.name}}</strong>&nbsp;に「フォロー」されました。</p>
            </template>
            <template v-else-if="notification.core.action == 'message'">
              <div class="all_check">
                <p>{{notification.core.created_at}}</p>
                <v-spacer></v-spacer>
                <v-icon style="font-size: 20px;">mdi-check</v-icon>
                <p style="cursor: pointer;" @click="update(notification.core.id)">既読する</p>
              </div>
              <p><strong class="notification_hover" @click="$router.push(`/posts/${notification.message.post_id}`), notificationForm = false">Post{{notification.message.post_id}}</strong>&nbsp;に「メッセージ」が届いております。</p>
            </template>
            <template v-else-if="notification.core.action == 'like'">
              <div class="all_check">
                <p>{{notification.core.created_at}}</p>
                <v-spacer></v-spacer>
                <v-icon style="font-size: 20px;">mdi-check</v-icon>
                <p style="cursor: pointer;" @click="update(notification.core.id)">既読する</p>
              </div>
              <p><strong class="notification_hover" @click="$router.push(`/posts/${notification.like}`), notificationForm = false">Post{{notification.like}}</strong>&nbsp;が「いいね」されました。</p>
            </template>
            <v-spacer></v-spacer>
          </v-container>
          <template v-if="currentPage == totalPage"></template>
          <p v-else @click="morePage" class="mt-6 mb-6" style="text-align: center; cursor:pointer;">もっと見る</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="notificationForm = false"
          >
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
import ActionCable from 'actioncable';
export default {
  components: { VueLoading },

  data () {
    return{
      page: 1,
      counts: 0,
      notifications: [],
      loading: true,

      currentPage: 1,
      totalPage: 1,

      notificationForm: false,
      notificationAlert: false,
      load_judge: false,
      apiUrlWebSocket: process.env.API_URL
    }
  },

  computed: {
    webSocket() {
      if(process.env.NODE_ENV === 'production'){
        this.apiUrlWebSocket = process.env.API_URL
        return process.env.API_URL
      }else{
        // return 'ws://localhost:5000/cable'
        this.apiUrlWebSocket = process.env.API_URL
        return process.env.API_URL
      }
    }
  },
  created () {
    this.index()

    const cable = ActionCable.createConsumer(this.webSocket);

    this.NotificationChannel = cable.subscriptions.create( "NotificationChannel",{
      received: (data) => { 
        if(data['notification'].checked){
        }else{
          if(localStorage.getItem('id') == data['notification'].visited_id){
            var date = new Date(data['notification'].created_at)
            var year = date.getFullYear();
            var month = date.getMonth() + 1 ;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var created_at = year + '/' + month + '/' + day + ' ' + hour + ':' + minute
  
            this.notifications.unshift({
              core: {
                id: data['notification'].id,
                action: data['notification'].action,
                created_at: created_at
              },
              like: data['notification'].post_id,
              visitor: data['visitor'],
              message: data['message'],
            })
            this.notificationAlert = true
            this.counts += 1
            if(this.counts == 10){
              this.counts = '10+'
            }
          }
        }
      },
    })
  },
  methods: {
    async index(){
      if(localStorage.getItem('id')){
        this.loading = true
        await  this.$axios.$get(`api/notifications`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.counts = res.data.length
          if(this.counts == 10){
            this.counts = '10+'
          }
          for(let i = 0; i < res.data.length; i++){
            var date = new Date(res.data[i].attributes.created_at)
            var year = date.getFullYear();
            var month = date.getMonth() + 1 ;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var created_at = year + '/' + month + '/' + day + ' ' + hour + ':' + minute
  
            this.notifications.push({
              core: {
                id: res.data[i].attributes.id,
                action: res.data[i].attributes.action,
                created_at: created_at
              },
              like: res.data[i].attributes.post_id,
              visitor: res.data[i].attributes.visitor,
              message: res.data[i].attributes.message,
            })
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
          if(this.totalPage == 0){
            this.totalPage = 1
          }
          this.loading = false
        })
      }else{
        this.load_judge = true
      }
    },

    async morePage(){
      this.loading = true
      this.currentPage++
      this.$axios.$get(`api/notifications?page=${this.currentPage}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        for(let i = 0; i < res.data.length; i++){
          var date = new Date(res.data[i].attributes.created_at)
          var year = date.getFullYear();
          var month = date.getMonth() + 1 ;
          var day = date.getDate();
          var hour = date.getHours();
          var minute = date.getMinutes();
          var created_at = year + '/' + month + '/' + day + ' ' + hour + ':' + minute

          this.notifications.push({
            core: {
              id: res.data[i].attributes.id,
              action: res.data[i].attributes.action,
              created_at: created_at
            },
            like: res.data[i].attributes.post_id,
            visitor: res.data[i].attributes.visitor,
            message: res.data[i].attributes.message,
          })
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
        }
        this.loading = false
      })  
    },
    async allUpdate(){
      this.loading = true
      if(localStorage.getItem('id')){
        const params = {
          user_id: localStorage.getItem('id')
        }
        await this.$axios.$patch('api/notifications/all_update',params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(
          this.notifications = [],
          this.index()
        )
      }else{
        this.load_judge = true
      }
    },
    async update(id){
      this.loading = true
      if(localStorage.getItem('id')){
        const params = {
          user_id: localStorage.getItem('id'),
          notification_id: id
        }
        await this.$axios.$patch(`api/notifications/${id}`,params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
        this.notifications = []
        this.index()
      }else{
        this.load_judge = true
      }
    }
  },
  watch: {
    notificationAlert (val) {
      val && setTimeout(() => {
        this.notificationAlert = false
      }, 2000)
    },
    load_judge (val) {
      val && setTimeout(() => {
        this.load_judge = false
        this.loading = false
      }, 1000)
    },
  },
}
</script>

<style>
.notification_hover{
  color: gray;
  transition: .2s;
  cursor: pointer;
}
.notification_hover:hover{
  color: #2196f3;
  text-decoration: underline #2196f3;
}
.morePage{
  cursor: pointer;
  text-align: center;
}
.all_check{
  display: flex;
  align-items: center;
  font-size: 12px;
}
.all_check p{
  margin: 0;
}
</style>
