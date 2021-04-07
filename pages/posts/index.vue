<template>
  <div style="padding-bottom: 30px;">
    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>
    <v-alert style="position: fixed; top: 70px; left:2.5%; z-index: 30; width: 95%;" :type="submitType" v-model="submitAlert" transition="slide-y-transition">
      {{submitContent}}
    </v-alert>
    <div class="user_header mt-5">
      <!-- <v-row v-if="loginJudge" class="rooms_top ml-1">
        <v-btn
          text
          color="info accent-4"
          style="font-weight: bold; border: solid 1px;"
          @click="$router.push('/posts/create')"
        >
        <v-icon color="info" style="font-size: 18px; margin-right: 2px;">mdi-application</v-icon>
          新規作成
        </v-btn>
      </v-row> -->

      <div 
        class=""
        style="width: 100%; margin: 25px auto 0 auto"
      >
        <v-text-field
          v-model="search_title"
          placeholder="投稿 検索"
          required
          prepend-inner-icon="mdi-magnify"
          filled
          rounded
          hide-details
          class="mb-3 "
          dense
          @keypress.enter="onSearch"
        ></v-text-field>
      </div>

      <v-sheet
        class="mx-auto"
      >
        <v-slide-group
          multiple
          show-arrows
        >
          <v-slide-item
            v-for=" (tag, c) in tags"
            :key="`tag-${c}`"
          >
            <v-btn
              class="mx-2"
              color="info"
              style="font-weight: bold;"
              small
              depressed
              rounded
              @click="tagSearch(1,tag.name)"
            >
              {{ tag.name }}({{tag.taggings_count}})
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

    </div>

    <div style="display: flex;" class="mt-4 mr-2">
      <v-col style="width: 150px" class="pb-0 pt-0 pl-0 pr-0">
        <v-select
          style="width: 150px"
          :items="items"
          v-model="select"
          @change="selectPage"
          solo
          flat
          single-line
          return-object
          hide-details="auto"
          background-color="transparent"
        ></v-select>
      </v-col>
      <v-spacer></v-spacer>
      <v-icon large v-if="loginJudge" @click="$router.push('/posts/create')">mdi-pencil-box-outline</v-icon>
    </div>

      <v-row dense class="mt-0">
        <v-col
          v-for="(post, a) in posts"
          :key="`post-${a}`"
          :cols="6"
          class="post_content mb-4"
        >
          <v-card
          >
            <v-img
              @click="$router.push(`/posts/main/${post.id}`)"
              class="white--text align-end"
              background-color="gray"
              min-height="155px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :src="`/img/img${post.kind}.svg`"
            >
              <div class="tag_list">
                <p v-for="(tag, b) in post.tag_list" :key="`tag-${b}`" class="tag pl-1 pr-1 mb-0 mr-1" v-text="tag"></p>
              </div>
              <v-card-title class="pt-0 pb-2" style="font-size: 15px; font-weight: bold; line-height: 1.5; overflow: scroll; height: 50px;" v-text="post.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <div @click="$router.push(`/users/${users[a].id}`)" class="user" style="display: flex;">
                <v-img :src="`http://localhost:3000${users[a].image.url}`" class="user_img"></v-img>
                <p class="user_name">{{users[a].name}}</p>
              </div>

              <v-spacer></v-spacer>
              {{like_counts[a]}}
              <v-btn icon v-if="paginationJudge ==  'tags'">
                <v-icon v-if="like_judges[a]" @click="tagUnlike(posts[a].id)" style="color: red;">mdi-heart</v-icon>
                <v-icon v-else @click="tagLike(posts[a])" @>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon v-else-if="paginationJudge == 'index'">
                <v-icon v-if="like_judges[a]" @click="unlike(posts[a])" style="color: red;">mdi-heart</v-icon>
                <v-icon v-else @click="like(posts[a])" @>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon v-else-if="paginationJudge == 'popular'">
                <v-icon v-if="like_judges[a]" @click="popularUnlike(posts[a])" style="color: red;">mdi-heart</v-icon>
                <v-icon v-else @click="popularLike(posts[a])" @>mdi-heart</v-icon>
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>
      <div class="text-center mt-5">
        <v-pagination
          v-if="paginationJudge ==  'tags'"
          v-model="page"
          :length="this.totalPage"
          :total-visible="7"
          @input = "tagSearch(page)"
        ></v-pagination>
        <v-pagination
          v-else-if="paginationJudge == 'index'"
          v-model="page"
          :length="this.totalPage"
          :total-visible="7"
          @input = "onSearch(page)"
        ></v-pagination>
        <v-pagination
          v-else-if="paginationJudge == 'popular'"
          v-model="page"
          :length="this.totalPage"
          :total-visible="7"
          @input = "popularIndex(page)"
        ></v-pagination>
      </div>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
export default {
  components:{
    VueLoading
  },
  data(){
    return{
      select: '新しい順',
      items: ['新しい順','人気順','いいねした投稿'], 
      users: [],
      rooms: [],
      posts: [],
      tags: [],
      like_counts: [],
      like_judges: [],      
      name: '',
      search_title: '',
      loginJudge: false,

      currentPage: 1,
      totalPage: 1,
      page: 1,

      paginationJudge: 'index',
      createForm: false,
      selectedItem: false,
      loading: true,
      submitAlert: false,
      submitContent: 'ログインが必要になります。',
      submitType: 'error'
    }
  },
  created() {
    if(localStorage.getItem('id')){
      this.loginJudge = true
    }else{
      this.loginJudge = false
    }
    this.loading = true
    this.$axios.$get('api/tags').then(res => {
      for (let i = 0; i < res.data.length; i++){
        this.tags.push(res.data[i].attributes.tags)   
      }
    })
    this.index()
  },
  methods: {
    async index(){
      this.loading = true
      this.select = '新しい順'
      this.posts = []
      this.users = []
      this.like_counts = []
      this.like_judges = []
      if(localStorage.getItem('X-Access-Token')){
        this.$axios.$get(`api/posts?page=${this.page}`, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          }).then(res => {
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.id,
              user_id: res.data[i].attributes.user_id,
              title: res.data[i].attributes.title,
              kind: res.data[i].attributes.kind,
              tag_list: res.data[i].attributes.tag_list,
            })
            this.like_counts.push(res.data[i].attributes.likes.length),
            this.like_judges.push(res.data[i].attributes.like_judges),
            this.users.push(res.data[i].attributes.users)
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
        })
          this.loading = false
      }else{
        this.$axios.$get(`api/posts?page=${this.page}`).then(res => {
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.id,
              user_id: res.data[i].attributes.user_id,
              title: res.data[i].attributes.title,
              kind: res.data[i].attributes.kind,
              tag_list: res.data[i].attributes.tag_list,
            })
            this.like_counts.push(res.data[i].attributes.likes.length),
            this.users.push(res.data[i].attributes.users)
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
        })
          this.loading = false
      }
      this.paginationJudge = 'index'
    },
    
    async popularIndex(page){
      this.select = '人気順'
      this.loading = true
      this.posts = []
      this.users = []
      this.like_counts = []
      this.like_judges = []
      this.page = page
      if(localStorage.getItem('X-Access-Token')){
        this.$axios.$get(`api/posts/post_popular?page=${this.page}`, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          }).then(res => {
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.id,
              user_id: res.data[i].attributes.user_id,
              title: res.data[i].attributes.title,
              kind: res.data[i].attributes.kind,
              tag_list: res.data[i].attributes.tag_list,
            })
            this.like_counts.push(res.data[i].attributes.likes.length),
            this.like_judges.push(res.data[i].attributes.like_judges),
            this.users.push(res.data[i].attributes.users)
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
          this.loading = false
        })
      }else{
        this.$axios.$get(`api/posts/post_popular?page=${this.page}`).then(res => {
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.id,
              user_id: res.data[i].attributes.user_id,
              title: res.data[i].attributes.title,
              kind: res.data[i].attributes.kind,
              tag_list: res.data[i].attributes.tag_list,
            })
            this.like_counts.push(res.data[i].attributes.likes.length),
            this.users.push(res.data[i].attributes.users)
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
          this.loading = false
        })
      }
      this.paginationJudge = 'popular'
    },

    async tagIndex(){
      this.select = '新しい順'
      this.posts = []
      this.users = []
      this.like_counts = []
      this.like_judges = []
      this.loading = true
      if(localStorage.getItem('X-Access-Token')){
        await this.$axios.$get(`api/tags/${this.name}?page=${this.page}`, {
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
          this.like_counts.push(res.data[i].attributes.likes.length),
          this.like_judges.push(res.data[i].attributes.like_judges),
          this.users.push(res.data[i].attributes.users)
        }
        this.currentPage = res.pagination.current_page
        this.totalPage = res.pagination.total_pages
        this.loading = false
        })
      }else{
        await this.$axios.$get(`api/tags/${this.name}?page=${this.page}`).then(res => {
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.posts.id,
              user_id: res.data[i].attributes.user_id,
              title: res.data[i].attributes.posts.title,
              kind: res.data[i].attributes.posts.kind,
              tag_list: res.data[i].attributes.posts.tag_list,
            })
            this.like_counts.push(res.data[i].attributes.likes.length),
            this.users.push(res.data[i].attributes.users)
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
          this.loading = false
        })
      }
      this.paginationJudge = 'tags'
    },

    async tagSearch(page, tagName){
      this.page = page
      if(tagName){
        this.name = tagName
      }
      this.tagIndex()
    }, 
    
    all(){
      this.search_title = ''
      this.onSearch()
    },
    tag_search(name){
      this.search_title = name
      this.onSearch()
    },

    add_link(id){
      this.room_id = id
    },

    async test(num){
      console.log(this.like_counts[num]++)
    },
    async onSearch(page){
      this.select = '新しい順'
      this.posts = []
      this.users = []
      this.like_counts = []
      this.like_judges = []
      this.page = page
      this.loading = true
      if(this.search_title){
        this.$axios.$get(`api/posts/search/${this.search_title}?page=${this.page}`).then(res => {
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.id,
              user_id: res.data[i].attributes.user_id,
              title: res.data[i].attributes.title,
              kind: res.data[i].attributes.kind,
              tag_list: res.data[i].attributes.tag_list,
            })
            this.like_counts.push(res.data[i].attributes.likes.length),
            this.like_judges.push(res.data[i].attributes.like_judges),
            this.users.push(res.data[i].attributes.users)
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
        })
      }else{
        this.index()
      }
      this.loading = false
      this.paginationJudge = 'index'
    },
    async likeRes(){ 
      this.like_counts = []
      this.like_judges = []
      this.loading = true
      if(this.search_title){
          this.$axios.$get(`api/posts/search/${this.search_title}?page=${this.page}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
            for (let i = 0; i < res.data.length; i++){
              this.like_counts.push(res.data[i].attributes.likes.length),
              this.like_judges.push(res.data[i].attributes.like_judges)
            }
          })
            this.loading = false
        }else{
          this.$axios.$get(`api/posts?page=${this.page}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
            for (let i = 0; i < res.data.length; i++){
              this.like_counts.push(res.data[i].attributes.likes.length),
              this.like_judges.push(res.data[i].attributes.like_judges)
            }
          })
        } 
      this.loading = false
    },
    async like(post){
      if(localStorage.getItem('X-Access-Token')){
        const params = {
          post_id: post.id,
          user_id: post.user_id,
        }
        await this.$axios.$post(`api/likes/`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
        this.likeRes()
        this.loading = false
      }else if (localStorage.getItem('id') == null){
        this.submitAlert = true
      }
    },
    async unlike(post){
      if(localStorage.getItem('X-Access-Token')){

        await this.$axios.$delete(`api/likes/${post.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
        this.likeRes()
        this.loading = false
      }else if (localStorage.getItem('id') == null){
        this.submitAlert = true
      }
    },


    async tagLikeRes(){ 
      this.loading = true
      if(this.search_title){
        await this.$axios.$get(`api/tags/${this.name}?page=${this.page}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
            this.like_counts = []
            this.like_judges = []
            for (let i = 0; i < res.data.length; i++){
              this.like_counts.push(res.data[i].attributes.likes.length),
              this.like_judges.push(res.data[i].attributes.like_judges)
            }
            this.loading = false
          })
        }else{
          await this.$axios.$get(`api/tags/${this.name}?page=${this.page}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
            this.like_counts = []
            this.like_judges = []
            for (let i = 0; i < res.data.length; i++){
              this.like_counts.push(res.data[i].attributes.likes.length),
              this.like_judges.push(res.data[i].attributes.like_judges)
            }
            this.loading = false
          })
        } 
    },

    async tagLike(post){
      if(localStorage.getItem('id') == null){
        this.submitAlert = true
      }else{
        this.loading = true
        if(localStorage.getItem('X-Access-Token')){
          const params = {
            post_id: post.id,
            user_id: post.user_id
          }
          await this.$axios.$post(`api/likes/`, params, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          })
          this.tagLikeRes()
        }
      }
    },

    async tagUnlike(post){
      if(localStorage.getItem('id') == null){
        this.submitAlert = true
      }else{
        this.loading = true
        if(localStorage.getItem('X-Access-Token')){
  
          await this.$axios.$delete(`api/likes/${post.id}`, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          })
          this.tagLikeRes()
        }
      }
    },


    async popularLike(post){
      if(localStorage.getItem('id') == null){
        this.submitAlert = true
      }else{
        this.loading = true
        if(localStorage.getItem('X-Access-Token')){
          const params = {
            post_id: post.id,
            user_id: post.user_id
          }
          await this.$axios.$post(`api/likes/`, params, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          })
          this.popularIndex(this.page)
          this.loading = false
        }
      }
    },
    async popularUnlike(post){
      if(localStorage.getItem('id') == null){
        this.submitAlert = true
      }else{
        this.loading = true
        if(localStorage.getItem('X-Access-Token')){
  
          await this.$axios.$delete(`api/likes/${post.id}`, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          })
          this.popularIndex(this.page)
          this.loading = false
        }
      }
    },
 
    selectPage(){
      if (this.select == 'いいねした投稿'){
        if(localStorage.getItem('id') == null){
          this.submitAlert = true,
          this.submitContent = 'ログインが必要になります。',
          this.submitType = 'error'
        }else{
          this.$router.push(`/users/likes/${localStorage.getItem('id')}`)
        }
      }else if(this.select == '人気順'){
        this.popularIndex(1)
      }else if(this.select == '新しい順'){
        this.onSearch(1)
      }
    }
  },
  watch: {
    submitAlert (val) {
      val && setTimeout(() => {
        this.submitAlert = false
      }, 2000)
    },
  },
}
</script>

<style scoped>
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
  overflow: scroll;
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

@keyframes fadeIn {
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}
.loading{
  position: fixed;
  top: 0;
  bottom:0;
  right:0;
  left:0;
  background: rgba(255, 255, 255, 0.199);
  z-index: 100;
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
@media (min-width: 600px){
  .post_content{
    max-width: 32%;
    margin: 0 0.6%;
  }
}
@media (min-width: 900px){
  .post_content{
    max-width: 24%;
    margin: 0 0.4%;
  }
}
</style>