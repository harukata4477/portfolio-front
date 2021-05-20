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
      <div class="user_header_right">
        <template v-if="currentUser.id == $route.params.id">
          <v-btn @click="destroy" color="error" small>アカウント削除</v-btn>
        </template>
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
      <v-card-text>
        <v-container>
          <v-row>
            <v-card-text class="grey--text pb-0">画像</v-card-text>
            <v-col
              cols="12"
              style="position: relative;"
            >
              <v-img contain max-height="200" :src="`${apiUrl}${image}`">
                <v-file-input
                  v-model="image"
                  hide-input
                  class="mt-0 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-0"
                  @change="imageChange"
                >
                </v-file-input>
              </v-img>
              <p class="image_judge">{{image_judge}}</p>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="ユーザー名"
                required
                v-model="name"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="自己紹介"
                required
                v-model="profile"
              ></v-textarea>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="blue darken-1"
          text
          @click="edit"
        >
          更新
        </v-btn>
      </v-card-actions>
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
      title: '設定',
      items: [],
      currentUser: {},

      image_judge: '',

      name: '',
      image: [],
      profile: '',
      user: '',

      loading: true,
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
    this.$axios.$get(`api/users/${this.$route.params.id}`, {
      headers:{
        'X-Access-Token': localStorage.getItem('X-Access-Token')
      }
    }).then(res => {
      this.currentUser = {id: localStorage.getItem('id')}

      this.name = res.data.attributes.name
      this.image = res.data.attributes.image.url
      this.profile = res.data.attributes.profile
      this.loading = false
    }).catch(this.loading = false)
    if(localStorage.getItem('id') == this.$route.params.id){
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: '投稿一覧', link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`},{title: `フォロワー`, link: `/users/followers/${this.$route.params.id}`},{title: `設定`, link: `/users/edits/${this.$route.params.id}`}]
    }else{
      this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: '投稿一覧', link: `/users/posts/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロー中`, link: `/users/follows/${this.$route.params.id}`},{title: `フォロワー`, link: `/users/followers/${this.$route.params.id}`}]
    }
    if(this.image){
    }else{
      this.image_judge = '画像登録されていません'
    }
  },

  methods:{
    async imageChange(){
       this.image_judge = '画像を取得しました。更新してください。'
    },
    async edit(){
      this.loading = true
      let formData = new FormData
        formData.append('name', this.name)
        formData.append('profile', this.profile)
        if(this.image == '[object File]'){
          formData.append('image', this.image)
        }

      await this.$axios.$patch(`api/users/${this.$route.params.id}`, formData, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
      await this.$axios.$get(`api/users/${this.$route.params.id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        this.currentUser = res.data.attributes.current_user

        this.name = res.data.attributes.name
        this.image = res.data.attributes.image.url
        this.profile = res.data.attributes.profile
      })
      this.image_judge = ''
      this.loading = false
      this.$router.push(`/users/${this.$route.params.id}`)
    },
    destroy(){
      this.loading = true
      const confirmation = window.confirm("全てのデータが消えてしまいますが宜しいですか？");
      const confirmation2 = window.confirm("最後です、本当に宜しいですか？");
      if (confirmation){
        if (confirmation2){
          this.$axios.$delete(`/auth/`, {
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
      }
    },
  },

}
</script>

<style scoped>
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
.v-image{
  text-align: center; 
  position: relative; 
  z-index: 1;
}
.image_judge{
  position: absolute; 
  right: 50%; 
  bottom: 50%; 
  z-index: 0; 
  text-align: center; 
  display: inline-block; 
  transform: translate(50%, 50%);
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

.profile{
  margin-top: 3px;
}
.name{
  width: 100px;
}
.content{
  width: 100px;
}
.content_img{
  max-width: 130px;
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

@media (min-width: 530px){
  .content_img{
    max-width: 500px;
  }
  .menu_notice{
    display: none;
  }
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
@media (min-width: 960px){
  .contents{
    height: calc(100vh - 200px);
  }
}
</style>