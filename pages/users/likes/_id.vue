<template>
  <div class="mb-10">

    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

    <div class="user_header">
      <div class="user_header_left">
        <p class="user_header_left_title">いいね一覧</p>
      </div>
      <div class="user_header_right">
      </div>
    </div>

    <p class="menu_notice">←scroll→</p>
    <ul class="menu">
      <li v-for="(item, i) in items" @click="$router.push(item.link)">
        <p class="menu_link"  v-if="title == items[i].title" style="color: #2196f3; border-bottom: 2px solid #2196f3;">{{item.title}}</p>
        <p class="menu_link" v-else>{{item.title}}</p>
      </li>
    </ul>

  <div class="contents">
    <v-row dense class="mt-2">
        <v-col
          v-for="(post, a) in posts"
          :key="`post-${a}`"
          :cols="6"
          class="post_content mb-4"
        >
          <v-card>
            <v-img
              @click="$router.push(`/posts/${post.id}`)"
              class="white--text align-end"
              background-color="gray"
              min-height="160px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :src="`/img/img${post.kind}.svg`"
            >
              <div class="tag_list">
                <p v-for="(tag, b) in post.tag_list" :key="`tag-${b}`" class="tag pl-1 pr-1 mb-0 mr-1" v-text="tag"></p>
              </div>
              <v-card-title class="contents_card_title pt-0 pb-2" v-text="post.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <div @click="$router.push(`/users/${users[a].id}`)" class="user">
                <v-img :src="`${apiUrl}${users[a].image.url}`" class="user_img"></v-img>
                <p class="user_name">{{users[a].name}}</p>
              </div>

              <v-spacer></v-spacer>
              {{like_counts[a]}}
              <v-btn icon>
                <v-icon v-if="like_judges[a]" @click="unlike(posts[a])" color="orange">mdi-thumb-up</v-icon>
                <v-icon v-else @click="like(posts[a])">mdi-thumb-up-outline</v-icon>
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center mt-5 mb-6">
        <v-pagination
          v-model="page"
          :length="this.totalPage"
          :total-visible="7"
          @input = "morePage(page)"
        ></v-pagination>
      </div>
  </div>
    
  <button class="user_to_index" @click="$router.push('/users/')"><v-icon class="user_to_index_icon">mdi-home</v-icon>&nbsp;User一覧</button>

  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
export default {
  components:{
    VueLoading
  },
  data() {
    return {
      title: 'いいね一覧',
      users: [],
      posts: [],
      like_counts: [],
      like_judges: [],

      currentPage:1,
      totalPage:1,
      page: 1,
      loading: true,
    }
  },
  created() {
    if(localStorage.getItem('id') == this.$route.params.id){
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: `投稿一覧`, link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`},{title: `フォロワー`, link: `/users/followers/${this.$route.params.id}`},{title: `設定`, link: `/users/edits/${this.$route.params.id}`}]
    }else{
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: `投稿一覧`, link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`},{title: `フォロワー`, link: `/users/followers/${this.$route.params.id}`}]
    }
    this.index()
    
  },
  computed: {
    apiUrl() {
      if(process.env.NODE_ENV === 'production'){
        return process.env.API_URL
      }else{
        // return 'http://localhost:3000'
        return process.env.API_URL
      }
    }
  },
  methods:{
    async index(){
      this.loading = true
      this.users = []
      this.posts = []
      this.like_counts = []
      this.like_judges = []
      if(localStorage.getItem('X-Access-Token')){
        this.$axios.$get(`api/likes/${this.$route.params.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.posts.id,
              user_id: res.data[i].attributes.user_id,
              title: res.data[i].attributes.posts.title,
              kind: res.data[i].attributes.posts.kind,
              tag_list: res.data[i].attributes.posts.tag_list,
            })
            this.like_counts.push(res.data[i].attributes.like_counts),
            this.like_judges.push(res.data[i].attributes.like_judges),
            this.users.push(res.data[i].attributes.users)
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
          this.loading = false
        })

      }else{
        this.$axios.$get(`api/likes/${this.$route.params.id}`).then(res => {
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.posts.id,
              user_id: res.data[i].attributes.user_id,
              title: res.data[i].attributes.posts.title,
              kind: res.data[i].attributes.posts.kind,
              tag_list: res.data[i].attributes.posts.tag_list,
            })
            this.like_counts.push(res.data[i].attributes.like_counts),
            this.like_judges.push(res.data[i].attributes.like_judges),
            this.users.push(res.data[i].attributes.users)
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
          this.loading = false
        })
      }
    },

    async morePage(page){
      this.loading = true
      this.page = page
      this.posts = []
      this.users = []
      this.like_counts = []
      this.like_judges = []
      this.$axios.$get(`api/likes/${this.$route.params.id}?page=${this.page}`).then(res => {
        for (let i = 0; i < res.data.length; i++){
          this.posts.push({
            id: res.data[i].attributes.posts.id,
            user_id: res.data[i].attributes.user_id,
            title: res.data[i].attributes.posts.title,
            kind: res.data[i].attributes.posts.kind,
            tag_list: res.data[i].attributes.posts.tag_list,
          })
          this.like_counts.push(res.data[i].attributes.like_counts),
          this.like_judges.push(res.data[i].attributes.like_judges),
          this.users.push(res.data[i].attributes.users)
        }
        this.currentPage = res.pagination.current_page
        this.totalPage = res.pagination.total_pages
        this.loading = false
      })
    },

    async like(post){
      if(localStorage.getItem('id')){
        this.loading = true
        const params = {
          post_id: post.id,
          user_id: post.user_id
        }
        await this.$axios.$post(`api/likes/`, params, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
        })
        this.index()
      }
    },
    async unlike(post){
      if(localStorage.getItem('id')){
        this.loading = true
        await this.$axios.$delete(`api/likes/${post.id}`, {
            headers:{
                'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
        })
        this.index()
      }
    }
  },

}
</script>

<style scoped>
@keyframes fadeIn {
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}
.user_header{
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  height: 60px; 
  padding: 0 10px;
}
.menu{
  display: flex;
  position: relative;
  list-style: none;
  justify-content:space-between;
  padding: 0;
  margin: 0;
  width: 100%;
  overflow-x: scroll;
  border-bottom: 1px solid #eee;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.menu::-webkit-scrollbar {
  display:none;
  -ms-overflow-style: none;
}
.menu_notice{
  display: block;
  position: absolute;
  margin-top: -5px;
  right: 0;
  animation: fadeIn infinite alternate 2s;
  color: gray;
  font-size: 10px;
}
.menu li{
  min-width: 100px;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  color: gray;
}
.menu li:hover{
  background-color: #2195f318;
  color: #2196f3;
}
.menu_link{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  height: 40px;
}
.user_header_left{
  width: 40%;
  overflow: hidden;
  height: 58px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.user_header_left_title{
  font-weight: bold;
  margin: 0;
  font-size: 20px;
  cursor: pointer;
}
.user_header_right{
  align-items: center;
  height: 100%;
  display: flex;
}
.user_header_right_btn{
  display: flex;
  align-items:center;
  margin-right: 10px;
  padding: 3px 3px;
  font-weight: bold;
  background: #007effbd;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%);
  font-size: 15px;
}
.user_header_right_btn_icon{
  color: #fff; 
  font-size: 15px; 
  margin-right: 2px;
}
.user_to_index{
  font-size: 13px;
  color: rgb(0 126 255);
  height: 45px;
  display: flex;
  align-items: center;
}
.user_to_index_icon{
  font-size: 14px;
  color: rgb(0 126 255);
}


.type{
  width: 100%;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  text-align: center;
  padding: 0;
  height: 35px;
}
.type li{
  list-style: none;
  color: #fff;
  font-weight: bold;
  background-color: rgb(75 163 239);
  padding: 3px 7px;
  margin: 0 6px;
  border-radius: 20px;
  font-size: 15px;
  text-align: center;
  min-width: fit-content;
  cursor: pointer;
  box-shadow: 0px 2px 0.5px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
.type li:hover{
  box-shadow: 0px 0.6px 0.6px 0.5px rgb(0 0 0 / 20%);
}
.user{
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 70%;
}
.user_img{
  width: 30px;
  height: 30px;
  border-radius: 100%;
}
.user_name{
  margin: 0 0 0 10px;
  height: 25px;
  width: 100%;
  overflow: scroll;
}
.tag_list{
  position: absolute;
  top: 2%;
  left: 2%;
}
.tag{
  white-space: pre;
  margin: 0 5px;
  font-size: 10px; 
  font-weight: bold; 
  border-radius: 10px;
  background: rgb(91, 164, 248, 0.7); 
  display:inline-block;
}
.contents{
  height: calc(100vh - 244px);
  overflow-y: scroll;
  overflow-x: hidden;
  border-bottom: 1px solid #eee; 
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.contents::-webkit-scrollbar {
  display:none;
  -ms-overflow-style: none;
}
.contents_card_title{
  font-size: 15px; 
  font-weight: bold; 
  line-height: 1.5; 
  overflow: scroll; 
  height: 50px;
}
@media (min-width: 600px){
  .post_content{
    max-width: 32%;
    margin: 0 0.6%;
  }
}
@media (min-width: 960px){
  .contents{
    height: calc(100vh - 200px);
  }
}
</style>