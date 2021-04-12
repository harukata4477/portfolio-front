<template>
  <div class="post pb-16">

    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

    <v-alert class="alert" type="error" v-model="submitAlert" transition="slide-y-transition">
      ログインが必要になります。
    </v-alert>

    <v-icon class="post_icon" v-if="currentUser_id == post.user_id" @click="$router.push(`/posts/edits/${$route.params.id}`)" color="info">mdi-wrench</v-icon>
    <v-row class="post_like mt-2 mr-2">
      <v-spacer></v-spacer>
      <p v-if="like_judge" @click="unlike" class="mb-0 ml-2">{{likes}}<v-icon class="pb-1 pl-1" color="orange">mdi-thumb-up</v-icon></p>
      <p v-else class="mb-0 ml-2" @click="like">{{likes}}<v-icon class="pb-1 pl-1" color="gray">mdi-thumb-up-outline</v-icon></p>
    </v-row>

    <div class="post_header">
      <h1 class="post_header_title display-1 mt-5 mb-2">{{post.title}}</h1>
      <div class="post_header_left">
        <p color="gray" class="post_header_created_at grey--text"><v-icon class=" mr-1 grey--text" x-small>mdi-autorenew</v-icon>{{post.updated_at}}</p>
        <v-spacer></v-spacer>
        <div class="post_header_tag">
          <p class="post_header_tag_list" v-for="(tag, i) in post.tag_list" :key="`tag-${i}`">{{tag}}</p>
        </div>
      </div>
    </div>

    <div class="mind_map">
      <Mindmap class="mindmap" style="height: 70vh" :zoomable="judge" :draggable="false" :keyboard="false" :nodeClick="false" :showUndo="false" :showNodeAdd="false" :contextMenu="false" :download="false" :strokeWidth="3" :ySpacing='40' :fitView="false"  v-model="contents"></Mindmap>
      <div class="mind_map_move">
        <v-icon @click="judge = !judge" v-if="judge" color="info">mdi-cursor-default</v-icon>
        <v-icon @click="judge = !judge" v-else color="info">mdi-cursor-default-outline</v-icon>
      </div>
    </div>

    <div class="post_content" v-for="(content, index) in postContents" :key="`content-${index}`">
      <h2 class="post_content_ttl mt-12 mb-10" v-if="content.kind == 'title'">{{content.title}}</h2>
      <h3 class="post_content_sub-ttl ml-1 mt-6 mb-5" v-text="content.sub_title" v-else-if="content.kind == 'sub_title'"></h3>
      <p class="post_content_txt ml-1 mt-5 mb-5" v-text="content.text" v-else-if="content.kind == 'text'"></p>
      <v-card class="mt-12 mb-12" flat v-else-if="content.kind == 'picture'">
        <v-img contain max-height="320" :src="`http://localhost:3000${content.picture.url}`"></v-img>
      </v-card>
    </div>
    
  </div>
</template>

<script>
import Mindmap from '@hellowuxin/mindmap'
import { VueLoading } from 'vue-loading-template';

export default {
  components: {
    Mindmap,
    VueLoading,
  },
  data(){
    return{ 
      contents: [{}],
      post: {},
      title: '',
      sub_title: '',
      text: '',
      picture: '',
      postContents: [],
      likes:0,
      currentUser_id: localStorage.getItem('id'),

      judge: false,
      like_judge:false,
      submitAlert: false,
      loading: true,
    }
  },
  created(){
    this.index()
  },
  methods:{
    async index(){
      this.loading = true
      if(localStorage.getItem('id')){
        await this.$axios.$get(`api/posts/${this.$route.params.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.contents = res.data.attributes.contents.content
          this.postContents = res.data.attributes.post_contents
          var date = new Date(res.data.attributes.updated_at)
          var year = date.getFullYear();
          var month = date.getMonth() + 1 ;
          var day = date.getDate();
          var updated_at = year + '/' + month + '/' + day
          this.post = {
            id: res.data.attributes.id,
            user_id: res.data.attributes.user_id,
            title: res.data.attributes.title,
            updated_at: updated_at,
            tag_list: res.data.attributes.tag_list,
          },
          this.likes = res.data.attributes.likes.length
          this.like_judge = res.data.attributes.like_judges
          this.loading = false
        })
      }else{
        this.$axios.$get(`api/posts/${this.$route.params.id}`).then(res => {
          this.contents = res.data.attributes.contents.content
          this.postContents = res.data.attributes.post_contents
          var date = new Date(res.data.attributes.updated_at)
          var year = date.getFullYear();
          var month = date.getMonth() + 1 ;
          var day = date.getDate();
          var updated_at = year + '/' + month + '/' + day
          this.post = {
            id: res.data.attributes.id,
            user_id: res.data.attributes.user_id,
            title: res.data.attributes.title,
            updated_at: updated_at,
            tag_list: res.data.attributes.tag_list,
          },
          this.likes = res.data.attributes.likes.length
          this.like_judge = res.data.attributes.like_judges
          this.loading = false
        })
      }
    },

    async likeIndex(){
      if(localStorage.getItem('id')){
        this.loading = true
        await this.$axios.$get(`api/posts/${this.$route.params.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.likes = res.data.attributes.likes.length
          this.like_judge = res.data.attributes.like_judges
          this.loading = false
        })
      }else{
        await this.$axios.$get(`api/posts/${this.$route.params.id}`).then(res => {
          this.likes = res.data.attributes.likes.length
          this.like_judge = res.data.attributes.like_judges
          this.loading = false
        })
      }
    },

    async like(){
      if(localStorage.getItem('X-Access-Token')){
        this.loading = true
        const params = {
          post_id: this.$route.params.id,
          user_id: this.post.user_id
        }
        await this.$axios.$post(`api/likes/`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
        this.likeIndex()
      }else if (localStorage.getItem('id') == null){
        this.submitAlert = true
      }
    },

    async unlike(){
      if(localStorage.getItem('X-Access-Token')){
        this.loading = true
        await this.$axios.$delete(`api/likes/${this.$route.params.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
        this.likeIndex()
      }else if (localStorage.getItem('id') == null){
        this.submitAlert = true
      }
    },
  },

  watch: {
    submitAlert (val) {
      val && setTimeout(() => {
        this.submitAlert = false
      }, 2000)
    },
  },

  errorCaptured(){
    window.location.href = `/posts/${this.$route.params.id}`
  }
}
</script>

<style scoped>
.mindmap{
  font-weight: bold !important;
}
.post_icon{
  position: absolute; 
  top: 10px; 
  left: 0;
}
.post_like p{
  cursor:pointer;
}
.post_header_title{
  text-align: center;
  font-weight: bold;
}
.post_header_left{
  display: flex;
  align-items: center;
}
.post_header_left p{
  margin-bottom: 5px;
}
.post_header_created_at{
  display: flex;
  align-items: center;
  font-size: 12px;
}
.post_header_tag{
  width: 50%;
  display: flex;
  overflow: scroll; 
}
.post_header_tag_list{
  white-space: pre;
  font-size: 10px;
  background-color:rgb(211, 238, 252);
  border-radius:5px;
  font-weight: bold;
  color: gray;
  margin-left: 5px;
  padding: 1px 2px;
}
.post_header_tag_list:first-child{
  margin-left:auto;
}
.mind_map{
  position: relative;
}
.mind_map_move{
  position: absolute;
  right: 5px;
  bottom: 40px;
}
.post_content_ttl{
  font-weight: bold; 
  font-size: 30px; 
  border-bottom: solid 1px rgb(220 218 218);
}
.post_content_sub-ttl{
  font-size: 23px;
}
.post_content_txt{
  line-height: 1.6;
}
</style>