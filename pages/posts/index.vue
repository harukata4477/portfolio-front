<template>
  <div class="mt-5" style="padding-bottom: 30px;">

    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

    <v-alert class="alert" :type="submitType" v-model="submitAlert" transition="slide-y-transition">
      {{submitContent}}
    </v-alert>

    <div class="post_header">
      <div class="post_header_search">
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

      <v-sheet class="mx-auto">
        <v-slide-group
          multiple
          show-arrows
        >
          <v-slide-item
            v-for=" (tag, c) in tags"
            :key="`tag-${c}`"
          >
            <v-btn
              class="post_tag_btn mx-2"
              color="info"
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

    <v-row class="mt-4 mb-0 mr-2 ml-0">
      <v-col class="post_select_col pb-0 pt-0 pl-0 pr-0">
        <v-select
          class="post_select_content"
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
    </v-row>

    <v-row dense class="mt-0">
      <v-col
        v-for="(post, a) in posts"
        :key="`post-${a}`"
        :cols="6"
        class="post_content_col mb-4"
      >
        <v-card>
          <v-img
            @click="jump(post.id)"
            class="white--text align-end"
            background-color="gray"
            min-height="155px"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            :src="`/img/img${post.kind}.svg`"
          >
            <div class="post_content_card_tag">
              <p v-for="(tag, b) in post.tag_list" :key="`tag-${b}`" class="post_content_card_tag_content pl-1 pr-1 mb-0 mr-1" v-text="tag"></p>
            </div>
            <v-card-title class="post_content_card_title pt-0 pb-2" v-text="post.title"></v-card-title>
          </v-img>
          <v-card-actions>
            <div @click="$router.push(`/users/${users[a].id}`)" class="post_content_user">
              <v-img :src="`http://localhost:5000${users[a].image.url}`" class="post_content_user_img"></v-img>
              <p class="post_content_user_name">{{users[a].name}}</p>
            </div>
            <v-spacer></v-spacer>
            {{like_counts[a]}}
            <v-btn icon v-if="paginationJudge ==  'tags'">
              <v-icon v-if="like_judges[a]" @click="tagUnlike(posts[a])" color="orange">mdi-thumb-up</v-icon>
              <v-icon v-else @click="tagLike(posts[a])">mdi-thumb-up-outline</v-icon>
            </v-btn>
            <v-btn icon v-else-if="paginationJudge == 'index'">
              <v-icon v-if="like_judges[a]" @click="unlike(posts[a])" color="orange">mdi-thumb-up</v-icon>
              <v-icon v-else @click="like(posts[a])">mdi-thumb-up-outline</v-icon>
            </v-btn>
            <v-btn icon v-else-if="paginationJudge == 'popular'">
              <v-icon v-if="like_judges[a]" @click="popularUnlike(posts[a])" color="orange">mdi-thumb-up</v-icon>
              <v-icon v-else @click="popularLike(posts[a])">mdi-thumb-up-outline</v-icon>
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
    jump(id){
      this.$router.push(`/posts/${id}`)
    },
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
.post_header_search{
  width: 100%;
  margin: 0 auto;
}
.post_tag_btn{
  font-weight: bold;
}
.post_select_col{
  width: 150px !important;
}
.post_select_content{
  width: 150px !important;
}
.post_content_card_tag{
  overflow: scroll;
  position: absolute;
  top: 2%;
  left: 2%;
}
.post_content_card_tag_content{
  white-space: pre;
  margin: 0 5px;
  font-size: 10px; 
  font-weight: bold; 
  border-radius: 10px;
  background: rgb(91, 164, 248, 0.7); 
  display:inline-block;
}
.post_content_card_title{
  font-size: 15px; 
  font-weight: bold; 
  line-height: 1.5; 
  overflow: scroll; 
  height: 50px;
}
.post_content_user{
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 70%;
}
.post_content_user_name{
  margin: 0 0 0 10px;
  height: 25px;
  width: 100%;
  overflow: scroll;
}
.post_content_user_img{
  width: 30px;
  height: 30px;
  border-radius: 100%;
}

@media (min-width: 600px){
  .post_content_col{
    max-width: 32%;
    margin: 0 0.6%;
  }
}
@media (min-width: 900px){
  .post_content_col{
    max-width: 24%;
    margin: 0 0.5%;
  }
}
</style>