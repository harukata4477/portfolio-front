<template>
  <div>
    <div class="user_header mt-5">
      <v-row class="rooms_top ml-1">
        <v-btn
          text
          color="info accent-4"
          style="font-weight: bold; border: solid 1px;"
          @click="$router.push('/posts/create')"
        >
        <v-icon color="info" style="font-size: 18px; margin-right: 2px;">mdi-application</v-icon>
          新規作成
        </v-btn>
      </v-row>

      <div 
        class=""
        style="width: 100%; margin: 25px auto 0 auto"
      >
        <v-text-field
          v-model="search_title"
          placeholder="検索"
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
        class="mx-auto mb-3"
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

    <p>新規投稿</p>
      <v-row dense class="mt-3">
        <v-col
          v-for="(post, a) in posts"
          :key="`post-${a}`"
          :cols="6"
          class="mb-4"
        >
          <v-card
          >
            <v-img
              @click="$router.push(`/posts/${post.id}`)"
              class="white--text align-end"
              background-color="gray"
              min-height="160px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :src="`/img/img${post.kind}.svg`"
            >
            <div class="tag_list" v-for="(tag, b) in post.tag_list" :key="`tag-${b}`">
              <p class="tag pl-1 pr-1 mb-0 mr-1" v-text="tag"></p>
            </div>
              <v-card-title style="font-size: 15px; font-weight: bold; line-height: 1.5;" v-text="post.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <div @click="$router.push(`/users/${users[a].id}`)" class="user" style="display: flex;">
                <v-img :src="`http://localhost:3000${users[a].image.url}`" class="user_img"></v-img>
                <p class="user_name">{{users[a].name}}</p>
              </div>

              <v-spacer></v-spacer>
              {{like_counts[a]}}
              <v-btn icon v-if="paginationJudge">
                <v-icon v-if="like_judges[a]" @click="tagUnlike(posts[a].id)" style="color: red;">mdi-heart</v-icon>
                <v-icon v-else @click="tagLike(posts[a].id)" @>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon v-else>
                <v-icon v-if="like_judges[a]" @click="unlike(posts[a].id)" style="color: red;">mdi-heart</v-icon>
                <v-icon v-else @click="like(posts[a].id)" @>mdi-heart</v-icon>
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>
      <div class="text-center mt-5 mb-16">
        <v-pagination
          v-if="paginationJudge"
          v-model="page"
          :length="this.totalPage"
          :total-visible="7"
          @input = "tagSearch(page)"
        ></v-pagination>
        <v-pagination
          v-else
          v-model="page"
          :length="this.totalPage"
          :total-visible="7"
          @input = "onSearch(page)"
        ></v-pagination>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      users: [],
      rooms: [],
      posts: [],
      tags: [],
      like_counts: [],
      like_judges: [],      
      name: '',
      search_title: '',

      currentPage: 1,
      totalPage: 1,
      page: 1,

      paginationJudge: false,
      createForm: false,
      selectedItem: false,

    }
  },
  created() {

    this.$axios.$get('api/tags').then(res => {
        for (let i = 0; i < res.data.length; i++){
          this.tags.push(res.data[i].attributes.tags)   
        }
    })
    this.index()

  },
  methods: {
    async index(){
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
        this.$axios.$get(`api/posts?page=${this.page}`).then(res => {
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.id,
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
      }
    },

    async tagIndex(){
      this.posts = []
      this.users = []
      this.like_counts = []
      this.like_judges = []
      if(localStorage.getItem('X-Access-Token')){
        await this.$axios.$get(`api/tags/${this.name}?page=${this.page}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
        for (let i = 0; i < res.data.length; i++){
          this.posts.push({
            id: res.data[i].attributes.posts.id,
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
        })
      }else{
        await this.$axios.$get(`api/tags/${this.name}?page=${this.page}`).then(res => {
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.posts.id,
              title: res.data[i].attributes.posts.title,
              kind: res.data[i].attributes.posts.kind,
              tag_list: res.data[i].attributes.posts.tag_list,
            })
            this.like_counts.push(res.data[i].attributes.likes.length),
            this.users.push(res.data[i].attributes.users)
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
        })
      }
      this.paginationJudge = true
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
      this.posts = []
      this.users = []
      this.like_counts = []
      this.like_judges = []
      this.page = page
      if(this.search_title){
        this.$axios.$get(`api/posts/search/${this.search_title}?page=${this.page}`).then(res => {
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.id,
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
      this.paginationJudge = false
    },
    async likeRes(){ 
      this.like_counts = []
      this.like_judges = []
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
    },
    async like(id){
      if(localStorage.getItem('X-Access-Token')){
        const params = {
          post_id: id,
        }
        await this.$axios.$post(`api/likes/`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(

        )
        this.likeRes()
      }
    },
    async unlike(id){
      if(localStorage.getItem('X-Access-Token')){

        await this.$axios.$delete(`api/likes/${id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
        this.likeRes()
      }
    },
    async tagLikeRes(){ 
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
          })
        } 
    },
    async tagLike(id){
      if(localStorage.getItem('X-Access-Token')){
        const params = {
          post_id: id,
        }
        await this.$axios.$post(`api/likes/`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
        this.tagLikeRes()
      }
    },
    async tagUnlike(id){
      if(localStorage.getItem('X-Access-Token')){

        await this.$axios.$delete(`api/likes/${id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
        this.tagLikeRes()
      }
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
}
.user_img{
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.user_name{
  margin: 0 0 0 10px;
  height: 25px;
  width: 14vw;
  overflow: scroll;
}
.tag_list{
  position: absolute;
  top: 5px;
  right: 5px;
  overflow: scroll;
}
.tag{
  font-size: 10px; 
  font-weight: bold; 
  border-radius: 10px;
  background: rgb(91, 164, 248); 
  display:inline-block;
}
</style>