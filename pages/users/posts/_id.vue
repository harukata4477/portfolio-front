<template>
  <div class="mb-10 pb-5">
    <div class="user_header">
      <div class="user_header_left">
        <p class="user_header_left_title">投稿一覧</p>
      </div>
      <div class="user_header_right" style="display: flex;">

      </div>
    </div>

    <p class="menu_notice">←scroll→</p>
    <ul class="menu">
      <li v-for="(item, i) in items" @click="$router.push(item.link)">
        <p class="menu_link"  v-if="title == items[i].title" style="color: #2196f3; border-bottom: 2px solid #2196f3;">{{item.title}}</p>
        <p class="menu_link" v-else>{{item.title}}</p>
      </li>
    </ul>

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
              @click="$router.push(`/posts/main/${post.id}`)"
              class="white--text align-end"
              background-color="gray"
              min-height="160px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :src="`/img/img${post.kind}.svg`"
            >
              <div class="tag_list" v-for="(tag, b) in post.tag_list" :key="`tag-${b}`">
                <p class="tag pl-1 pr-1 mb-0" v-text="tag"></p>
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
              <v-btn icon>
                <v-icon v-if="like_judges[a]" @click="unlike(posts[a].id)" style="color: red;">mdi-heart</v-icon>
                <v-icon v-else @click="like(posts[a].id)" @>mdi-heart</v-icon>
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>

      <div class="text-center mt-5 mb-16">
        <v-pagination
          v-model="page"
          :length="this.totalPage"
          :total-visible="7"
          @input = "onSearch(page)"
        ></v-pagination>
      </div>

    <button class="user_to_index" @click="$router.push('/users/')"><v-icon class="user_to_index_icon">mdi-home</v-icon>&nbsp;一覧ページ</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '投稿一覧',
      users: [],
      posts: [],
      like_counts: [],
      like_judges: [],

      total_count:1,
      current_page:1,
      totalPage:1,
      page: 1,
    }
  },
  created() {
    if(localStorage.getItem('id') == this.$route.params.id){
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: `投稿一覧`, link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`},{title: `設定`, link: `/users/edits/${this.$route.params.id}`}]
    }else{
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: `投稿一覧`, link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`}]
    }

    this.$axios.$get(`api/posts/post_user/${this.$route.params.id}?page=${this.page}`).then(res => {
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
    
  },

  methods:{
    async like(id){
      const params = {
          post_id: id,
      }
      await this.$axios.$post(`api/likes/`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
      this.$axios.$get(`api/posts/post_user/${this.$route.params.id}?page=${this.page}`, {
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
    },
    async unlike(id){
      await this.$axios.$delete(`api/likes/${id}`, {
          headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
      })
      this.$axios.$get(`api/posts/post_user/${this.$route.params.id}?page=${this.page}`, {
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
    },
    async onSearch(page){
      this.page = page

      this.posts = []
      this.users = []
      this.like_counts = []
      this.like_judges = []
      this.$axios.$get(`api/posts/post_user/${this.$route.params.id}?page=${this.page}`).then(res => {
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
    },
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
  text-align: center;
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
  margin: 0;
  padding: 10px 0;
  width: 100%;
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
  border-bottom: 1px solid blue;
  font-size: 12px;
  color: blue;
  margin-left: 10px;
  padding: 0 10px 0 5px;
}
.user_to_index_icon{
  font-size: 13px;
  color: blue;
}

.tag_list{
  position: absolute;
  top: 5px;
  right: 10px;
}
.tag{
  background: rgb(0, 162, 255);
  display: inline-block;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
}
@media (min-width: 530px){
  .content_img{
    max-width: 350px;
    margin: auto;
  }
  .menu_notice{
    display: none;
  }
}
</style>