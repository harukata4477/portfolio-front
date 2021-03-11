<template>
  <div class="mb-16">
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
          <template v-if="currentUser.id == $route.params.id">
            <v-btn @click="unfollow(following.id)" small color="info" class="unfollow">フォロー済み</v-btn>
          </template>
        </v-list-item>

      </template>
    </v-list>
    <template v-if="currentPage == totalPage"></template>
    <p @click="followMore" v-else style="cursor: pointer; text-align: center; margin: 10px 0;">もっとみる</p>
    <button class="user_to_index" @click="$router.push('/users/')"><v-icon class="user_to_index_icon">mdi-home</v-icon>&nbsp;一覧ページ</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'フォロー中',
      currentUser: {},
      items: [],
      followings: [],
 
      currentPage: 1,
      totalPage: 0,
    }
  },
  created() {
    this.$axios.$get(`api/follows/${this.$route.params.id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        this.followings = res.data.attributes.followings
        this.currentUser = res.data.attributes.current_user
        this.currentPage = res.pagination.current_page
        this.totalPage = res.pagination.total_pages
    })

    if(localStorage.getItem('id') == this.$route.params.id){
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: '投稿一覧', link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`},{title: `設定`, link: `/users/edits/${this.$route.params.id}`}]
    }else{
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: '投稿一覧', link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`}]
    }
  },

  methods:{
    async unfollow(user_id){
      await this.$axios.$delete(`api/follows/${user_id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })

      await this.$axios.$get(`api/follows/${this.$route.params.id}`).then(res => {
        this.followings = res.data.attributes.followings
      })
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
        this.currentUser = res.data.attributes.current_user
        this.currentPage = res.pagination.current_page
        this.totalPage = res.pagination.total_pages
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
  padding: 0;
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
.user_main{
  border-bottom: solid 1px #eee;
}

@media (min-width: 530px){
  .menu_notice{
    display: none;
  }
}
</style>