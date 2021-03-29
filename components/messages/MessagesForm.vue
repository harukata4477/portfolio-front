<template>
  <div>
    <v-alert style="position: fixed; top: 70px; width: 95%; z-index: 30;" type="error" v-model="submitAlert" transition="slide-y-transition">
      ログインしてください。
    </v-alert>
    <v-row style="align-items:center; padding: 20px;">
      <v-icon>mdi-comment-text</v-icon>
      <p style="margin: 0; padding-left: 5px; font-weight: bold; font-size: 20px; color: #565656;">Comments</p>
      <v-spacer></v-spacer>
      <p class="mb-0" color="dimgray">Live</p>
      <vue-loading type="bubbles" color="gold" :size="{ width: '50px', height: '50px'}"></vue-loading>
    </v-row>
    <v-list  id ='messages' three-line style="overflow: scroll; max-height: 100%; margin-bottom: 60px;">
      <template v-for="(message, i) in messages">
        <v-divider
          :key="i"
        >
        </v-divider>

        <v-list-item>
          <v-list-item-avatar style="cursor:pointer;" @click="$router.push(`/users/${message.user_id}`)">
            <v-img :src="`http://localhost:3000${message.user_image.url}`"></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="mt-4" style="padding: 0;">
            <div style="display: flex;">
              <v-list-item-action-text class="mr-2" style="font-size:13px;">{{message.user_name}} • {{message.created_at}}</v-list-item-action-text>
            </div>
            <p style="color: rgba(0, 0, 0, 0.9); margin-top: 5px; line-height: 1.4;">{{message.message}}</p>
          </v-list-item-content>
        </v-list-item>
      </template>
      <!-- <p v-show="moreJudge" @click="messageMore" class="more">もっとみる</p> -->
    </v-list>

    <v-col cols="12" aria-hidden style="position: absolute; bottom: 0; right: 50%; transform: translateX(50%); background: #fff; z-index: 10; border-top: solid 1px rgba(0, 0, 0, 0.12);">
      <v-text-field hide-details @keypress.enter="handleClick" filled dense rounded v-model="item" placeholder="メッセージ"></v-text-field>
    </v-col>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
import ActionCable from 'actioncable';
export default {
  components:{
    VueLoading
  },
  props: {
    messageId:{
      type: String,
      required: true,
      default: '',
    }
  },
  data(){
    return{
      item: '',
      messages:[],

      submitAlert: false
    }
  },
  created(){
    this.$axios.$get(`api/messages/${this.messageId}`).then(res => {
      for (let i = 0; i < res.data.length; i++){
        var date = new Date(res.data[i].attributes.created_at)
        var year = date.getFullYear();
        var month = date.getMonth() + 1 ;
        var day = date.getDate();
        var created_at = year + '/' + month + '/' + day
        this.messages.push({
          message: res.data[i].attributes.message,
          created_at: created_at,
          user_id: res.data[i].attributes.users.id,
          user_name: res.data[i].attributes.users.name,
          user_image: res.data[i].attributes.users.image,
        })
      }
    })

    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

    this.messageChannel = cable.subscriptions.create( "MessageChannel",{
      received: (data) => {
        this.messages.unshift({
          user_id: data['user'].id,
          user_name: data['user'].name,
          user_image: data['user'].image,
          message: data['message'].message,
          created_at: 'たった今'
        })
      },
    })
  },

  methods:{
    handleClick() {
      if (localStorage.getItem('id')){
        if(this.item){
          this.messageChannel.perform('speak', { 
            message: this.item, 
            user_id: localStorage.getItem('id'), 
            post_id: this.messageId, 
          });
          this.item = ""
        } 
      }else{
        this.submitAlert = true
      }
    },
  },

  watch: {
    submitAlert (val) {
      val && setTimeout(() => {
        this.submitAlert = false
      }, 2000)
    }
  }
  
}
</script>