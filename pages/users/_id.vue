<template>
  <div>

    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

    <div class="user_header">
      <div class="user_header_left">
        <p class="user_header_left_title" v-text="title"></p>
        <div class="user_header_left_follow mt-3">
          <p @click="$router.push(`/users/follows/${$route.params.id}`)" class="mb-0"><strong style="color: #333;">{{following}}</strong> フォロ中</p>
          <p @click="$router.push(`/users/followers/${$route.params.id}`)" class="mb-0 ml-2"><strong style="color: #333;">{{follower}}</strong> フォロワー</p>
        </div>
      </div>

      <div v-if="loginJudge" class="user_header_right">
        <template v-if="currentUser.id == $route.params.id">
          <v-btn @click="logout" color="error" small>ログアウト</v-btn>
        </template>
        <div v-else>
          <v-btn v-if="follow_judge" @click="unfollow" small color="info" class="unfollow">フォロー済み</v-btn>
          <v-btn v-else @click="follow" outlined x-small color="info" class="follow" small>フォロー</v-btn>
        </div>
      </div>
    </div>

    <p class="menu_notice">←scroll→</p>
    <ul class="menu">
      <li v-for="(item, i) in items" @click="$router.push(item.link)">
        <p class="menu_link" v-if="title == items[i].title" style="color: #2196f3; border-bottom: 2px solid #2196f3;">{{item.title}}</p>
        <p class="menu_link" v-else>{{item.title}}</p>
      </li>
    </ul>

    <v-simple-table class="profile">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left name">
              Name
            </th>
            <th class="text-left name">
              Content
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.name"
          >
          <template v-if="user.name == '画像'">

            <td class="content">{{ user.name }}</td>
<<<<<<< HEAD
            <td class="content"><v-img :src="`${apiUrl}${user.content}`" class="content_img"></v-img></td>
=======
            <td class="content"><v-img :src="`http://localhost:5000${user.content}`" class="content_img"></v-img></td>
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18
            
          </template>

          <template v-else>

            <td class="content">{{ user.name }}</td>
            <td class="content">{{ user.content }}</td>
            
          </template>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
      title: 'ユーザー情報',
      names: ['画像', 'ユーザーネーム', 'メールアドレス', 'プロフィール'],
      users: [],
      items: [],
      currentUser: {},

      follower: 0,
      following: 0,

      follow_judge: '',

      loading: true,
      loginJudge: false,
    }
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
  created() {
    if(localStorage.getItem('id')){
      this.loginJudge = true
    }else{
      this.loginJudge = false
    }
    this.index()
    if(localStorage.getItem('id') == this.$route.params.id){
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: '投稿一覧', link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`},{title: `フォロワー`, link: `/users/followers/${this.$route.params.id}`},{title: `設定`, link: `/users/edits/${this.$route.params.id}`}]
    }else{
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: '投稿一覧', link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`},{title: `フォロワー`, link: `/users/followers/${this.$route.params.id}`}]
    }
  },

  methods:{
    async index(){
      this.users = []
      if(localStorage.getItem('X-Access-Token')){
        this.$axios.$get(`api/users/${this.$route.params.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
            this.currentUser = {id: localStorage.getItem('id')}
            this.follow_judge = res.data.attributes.follow_judge
            this.follower = res.data.attributes.follower
            this.following = res.data.attributes.following
    
            var contents = []
            contents.push(res.data.attributes.image.url)
            contents.push(res.data.attributes.name)
            contents.push(res.data.attributes.email)
            contents.push(res.data.attributes.profile)
            for(let i = 0; i < this.names.length; i++){
              this.users.push({
                name: this.names[i],
                content: contents[i]
            })
          }
          this.loading = false
        }).catch(this.loading = false)
      }else{
        this.$axios.$get(`api/users/${this.$route.params.id}`).then(res => {
            this.follow_judge = res.data.attributes.follow_judge
    
            this.follower = res.data.attributes.follower
            this.following = res.data.attributes.following
            var contents = []
            contents.push(res.data.attributes.image.url)
            contents.push(res.data.attributes.name)
            contents.push(res.data.attributes.email)
            contents.push(res.data.attributes.profile)
            for(let i = 0; i < this.names.length; i++){
              this.users.push({
                name: this.names[i],
                content: contents[i]
            })
          }
          this.loading = false
        }).catch(this.loading = false)
      }
    },

    async follow(){
      this.loading = true
      const params = {
        user_id: this.$route.params.id
      }
      await this.$axios.$post(`api/follows/`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
      this.index()
    },

    async unfollow(){
      this.loading = true
      await this.$axios.$delete(`api/follows/${this.$route.params.id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
      this.index()
    },

    logout(){
      this.loading = true
      const confirmation = window.confirm("本当に宜しいですか？");
      if (confirmation){
        this.$axios.$delete(`auth/sign_out`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(
          localStorage.setItem("X-Access-Token", ""),
          localStorage.setItem("id", ""),
          this.loading = false,
          window.location.href = "/"
        )
      }
    },
  }
}
</script>

<style scoped>
.user_header{
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  height: 60px; 
  padding: 0 10px;
  margin: 10px 0;
}
.user_header_left_follow{
  cursor: pointer; 
  font-size: 12px;
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
  width: 70%;
  overflow: hidden;
}
.user_header_left_title{
  font-weight: bold;
  margin: 0;
  font-size: 18px;
  cursor: pointer;
}
.user_header_left_follow{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: gray;
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

.profile{
  height: calc(100vh - 265px);
  overflow-y: scroll;
  overflow-x: hidden;
  border-bottom: 1px solid #eee; 
}
.name{
  width: 100px;
  text-align: center !important;
  font-size: 13px !important;
}
.content{
  width: 100px;
  text-align: center ;
}
.content_img{
  max-width: 130px;
  margin: auto;
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

.menu_notice{
  animation: fadeIn infinite alternate 2s;
  color: gray;
  font-size: 10px;
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
@media (min-width: 960px){
  .profile{
    height: calc(100vh - 220px);
  }
}
</style>