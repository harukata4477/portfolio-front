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
        <p class="user_header_left_title" v-text="title"></p>
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

    <div class="contents">
      <v-list three-line>
        <template v-for="(following, index) in followings" >
          

          <v-list-item
            class="user_main"
            :key="`following-${index}`"
          >
            <v-list-item-avatar
              @click="$router.push(`/users/${following.id}`)"
            >
              <v-img :src="`http://localhost:3000${following.image.url}`"></v-img>
            </v-list-item-avatar>
            <v-list-item-content
              @click="$router.push(`/users/${following.id}`)"
            >
              <v-list-item-title v-html="following.name"></v-list-item-title>
              <v-list-item-subtitle v-if="following.profile == ''"></v-list-item-subtitle>
              <v-list-item-subtitle v-if="following.profile" v-html="following.profile"></v-list-item-subtitle>
            </v-list-item-content>
            <template v-if="currentUser_id == $route.params.id">
              <v-btn @click="unfollow(following.id)" small color="info" class="unfollow">フォロー済み</v-btn>
            </template>
          </v-list-item>

        </template>
      </v-list>
      <template v-if="currentPage == totalPage"></template>
      <p @click="followMore" v-else style="cursor: pointer; text-align: center; margin: 10px 0;">もっとみる</p>
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
      title: 'フォロー中',
      currentUser_id: 0,
      items: [],
      followings: [],
 
      currentPage: 1,
      totalPage: 1,

      loading: true,
    }
  },
  created() {
    if(localStorage.getItem('X-Access-Token')){
      this.$axios.$get(`api/follows/${this.$route.params.id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
          this.followings = res.data.attributes.followings
          this.currentUser_id = localStorage.getItem('id')
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
          this.loading = false
      })
    }else{
      this.$axios.$get(`api/follows/${this.$route.params.id}`).then(res => {
          this.followings = res.data.attributes.followings
          this.currentUser_id = localStorage.getItem('id')
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
          this.loading = false
      })
    }

    if(localStorage.getItem('id') == this.$route.params.id){
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: '投稿一覧', link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`},{title: `フォロワー`, link: `/users/followers/${this.$route.params.id}`},{title: `設定`, link: `/users/edits/${this.$route.params.id}`}]
    }else{
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: '投稿一覧', link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`},{title: `フォロワー`, link: `/users/followers/${this.$route.params.id}`}]
    }
  },

  methods:{
    async unfollow(user_id){
      this.loading = true
      await this.$axios.$delete(`api/follows/${user_id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })

      await this.$axios.$get(`api/follows/${this.$route.params.id}`).then(res => {
        this.followings = res.data.attributes.followings
      }).then(
        this.loading = false
      )
    },
    async followMore(){
      var next = this.currentPage + 1
      this.$axios.$get(`api/follows/${this.$route.params.id}?page=${next}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        for (let i = 0; i < res.data.attributes.followings.length; i++){

          this.followings.push(res.data.attributes.followings[i])
        }
        this.currentUser_id = localStorage.getItem('id')
        this.currentPage = res.pagination.current_page
        this.totalPage = res.pagination.total_pages
        this.loading = false
      })
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
  width: 50%;
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
.user_main{
  border-bottom: solid 1px #eee;
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
.loading_inner_mark{
  
}

@media (min-width: 530px){
  .menu_notice{
    display: none;
  }
}
.contents{
  height: calc(100vh - 254px);
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
@media (min-width: 960px){
  .contents{
    height: calc(100vh - 215px);
  }
}
</style>