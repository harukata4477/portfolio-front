<template>
  <div class="mt-12 mb-10 pb-5">
    <div class="user_header">
      <div class="user_header_left">
        <p class="user_header_left_title">投稿一覧</p>
      </div>
      <div class="user_header_right" style="display: flex;">

        <!-- <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="black"
                dark
                v-bind="attrs"
                v-on="on"
                icon
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                link
                @click="$router.push(item.link)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div> -->

      </div>
    </div>

    <ul class="menu">
      <li v-for="(item, i) in items" @click="$router.push(item.link)">{{item.title}}</li>
    </ul>


      <v-row dense class="mb-6 mt-3">
        <v-col
          v-for="(room, a) in rooms"
          :key="`room-${a}`"
          :cols="6"
          class="mb-4"
        >
          <v-card
            
          >
            <v-img
              class="white--text align-end"
              gradient="to bottom, #f8f9fa, #f8f9fa"
              height="200px"
              style="position: relative;"
              @click="$router.push(`/${posts[a].id}/`)"
            >

              <button style="color: #fff; z-index: 5; font-weight: bold; background: rgb(75 163 239); position: absolute; top: 10px; left: 5px; border-radius: 20px; padding: 2px 4px; font-size:10px;" v-for="(tag, i) in posts[a].tag_list" icon color="info">
                {{tag}}
              </button>

              <div class="rooms">
                <p class="rooms_title">{{room.goal}}</p>
                <div class="rooms_inner">
                  <div :class="`rooms_inner_content`" v-for="(target, b) in targets[a]" :key="`target-${b}`" >
                    <p class="rooms_inner_content_title">{{target.target}}</p>
                  </div>
                </div>
              </div>

              <v-card-title 
                style=
                "
                position: relative;
                font-weight: bold;
                color: #212529 !important;
                background: #f8f9fa;
                padding: 0;
                line-height: 1.3;
                font-size: 16px;
                display: inline-block;
                margin: 10px;
                "
                class="black--text"
                v-text="posts[a].title"
              >
              </v-card-title>
            </v-img>

            <v-card-actions>
              <div @click="$router.push(`/users/${users[a].id}`)" class="user" style="display: flex;">
                <v-img :src="`http://localhost:3000${users[a].image.url}`" class="user_img"></v-img>
                <p class="user_name">{{users[a].name}}</p>
              </div>

              <v-spacer></v-spacer>
              {{like_counts[a]}}
              <v-btn icon >
                <v-icon v-if="like_judges[a]" @click="unlike(posts[a].id)" style="color: red;">mdi-heart</v-icon>
                <v-icon v-else @click="like(posts[a].id)">mdi-heart</v-icon>
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>

    <v-row justify="center" align="center" class="mt-5 mb-16">
      <v-btn x-small elevation="2" fab @click="back">戻る</v-btn>
      <div style="position: relative;" v-for="(a, i) in answer" :key="`a-${i}`">
        <v-btn x-small elevation="2" fab @click="page(a)">{{a}}</v-btn>
        <div v-if="nowPage == a" style="background: rgba(12, 12, 12, 0.2); position: absolute; top: 0;  width: 100%; height: 100%; border-radius: 100%;">
        </div>
      </div>
      <v-btn x-small elevation="2" fab @click="next">次へ</v-btn>
    </v-row>
    
    <button class="user_to_index" @click="$router.push('/users/')"><v-icon class="user_to_index_icon">mdi-home</v-icon>&nbsp;一覧ページ</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: {},
      items: [],
      users: [],
      rooms: [],
      targets: [],
      posts: [],
      like_counts: [],
      like_judges: [],

      total_count:0,
      current_page:0,
      first_page:"",
      last_page:"",

      nowPage: 1,
      b: 0,
      c: 0,
      d: 0,
      answer: [],
      count: 0,
    }
  },
  created() {
    this.$axios.$get('api/users/me', {
      headers:{
        authorization: localStorage.getItem('access-token')
      }
    }).then(res => {
      this.currentUser = res

      if(res.id == this.$route.params.id){
        this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロワー一覧`, link: `/users/follows/${this.$route.params.id}`},{title: `設定`, link: `/users/edits/${this.$route.params.id}`}]
      }else{
        this.items = [{title: `ユーザー情報`, link: `/users/${this.$route.params.id}`},{title: `いいね一覧`, link: `/users/likes/${this.$route.params.id}`},{title: `フォロワー一覧`, link: `/users/follows/${this.$route.params.id}`}]
      }
    })

    this.$axios.$get(`api/users/posts/${this.$route.params.id}`).then(res => {
        this.targets = res.post_targets
        this.posts = res.posts
        this.rooms = res.rooms
        this.users = res.users
        this.like_counts = res.like_counts

        this.total_count = res.page.total_count
        this.current_page = res.page.current_page
        this.first_page = res.page.first_page
        this.last_page = res.page.last_page

        this.b = this.total_count / 10 //割り算
        this.c = parseInt(this.b, 10) //小数点カット
        if (this.total_count % 10){ this.d = 1} //あまりがあるか確認
        this.count = this.c + this.d //割り算の答え と あまりがあれば1プラス
        for(let i = 0; i < this.count; i++){ this.answer.push(1 + i) } //配列化(ページネーション計算)
    })

    this.$axios.$get(`api/posts/likes/${this.$route.params.id}`, {
        headers:{
            authorization: localStorage.getItem('access-token')
        }
    }).then(res => {
        this.like_judges = res.like_judges
        this.like_counts = res.like_counts
    })
    
  },

  methods:{
    back(){
      if(this.first_page == true){

      } else{
        this.nowPage--
        this.$axios.$get(`/api/users/posts/${this.$route.params.id}?page=${this.nowPage}`).then(res => {
          this.targets = res.post_targets
          this.posts = res.posts
          this.rooms = res.rooms
          this.users = res.users
          this.like_counts = res.like_counts

          this.current_page = res.page.current_page
          this.total_count = res.page.total_count
          this.first_page = res.page.first_page
          this.last_page = res.page.last_page
        })
      }
    },
    next(){
      if(this.last_page == true){

      } else{
        this.nowPage++
        this.$axios.$get(`/api/users/posts/${this.$route.params.id}?page=${this.nowPage}`).then(res => {
          this.targets = res.post_targets
          this.posts = res.posts
          this.rooms = res.rooms
          this.users = res.users
          this.like_counts = res.like_counts

          this.current_page = res.page.current_page
          this.total_count = res.page.total_count
          this.first_page = res.page.first_page
          this.last_page = res.page.last_page
        })
      }
    },
    page(a){
      this.nowPage = a
      this.$axios.$get(`/api/users/posts/${this.$route.params.id}?page=${this.nowPage}`).then(res => {
        this.targets = res.post_targets
        this.posts = res.posts
        this.rooms = res.rooms
        this.users = res.users
        this.like_counts = res.like_counts

        this.current_page = res.page.current_page
        this.total_count = res.page.total_count
        this.first_page = res.page.first_page
        this.last_page = res.page.last_page
      })
    },
    async like(id){
      const params = {
        post_id: id
      }
      await this.$axios.$post(`api/likes/`, params, {
          headers:{
            authorization: localStorage.getItem('access-token')
          }
      })
      await this.$axios.$get(`api/posts/likes/${this.$route.params.id}`, {
          headers:{
              authorization: localStorage.getItem('access-token')
          }
      }).then(res => {
          this.like_judges = res.like_judges
          this.like_counts = res.like_counts
      })
    },
    async unlike(id){
      await this.$axios.$delete(`api/likes/${id}`, {
          headers:{
              authorization: localStorage.getItem('access-token')
          }
      })
      await this.$axios.$get(`api/posts/likes/${this.$route.params.id}`, {
          headers:{
              authorization: localStorage.getItem('access-token')
          }
      }).then(res => {
          this.like_judges = res.like_judges
          this.like_counts = res.like_counts
      })
    }
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
  list-style: none;
  justify-content:space-between;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #eee;
}
.menu li{
  width: 25%;
  text-align: center;
  font-size: 13px;
  padding: 10px 0;
  color: #2196f3;
  font-weight: bold;
  cursor: pointer;
}
.menu li:hover{
  border-bottom: 2px solid #2196f3;
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
.rooms{
  cursor: pointer;
  width: 200%;
  margin: 0 auto;
  height: 400px;
  overflow: hidden;
  position: absolute;
  top: -50%;
  left: -50%;
  transform: scale(0.5) ;
  padding: 10px 0;
}
.rooms_title{
  border: solid 1px #333;
  display: table;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  font-weight: bold;
  background-color: #eee;
  color: #333;
}
.rooms_title::after{
  border-right: solid 2px rgb(189, 188, 188);
  height: 20px;
  position: absolute;
  bottom: -20px;
  right: 50%;
  content: "";
}
.rooms_inner{
  margin: 0 auto;
  margin-top: 18px;
  text-align: center;
  position: relative;
  display: table;
  height: 50vh;
  color: #333;
}
.rooms_inner_content{
  margin: 18px 0 50px 0;
  position: relative;
  display: inline-block;
  padding: 0 5px;
  vertical-align: top;
}
.rooms_inner_content_title{
  position: relative;
  margin: 0;
  border: solid 1px #333;
  padding: 6px;
  font-size: 13px;
  font-weight: bold;
  border-radius: 10px;
  text-align: center;
  min-width: 150px;
  word-break: break-all;
  cursor: pointer;
  background-color: #eee;
  transition: 0.2s;
}

.done_bg{
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  background-color: rgba(0, 126, 255, 0.44);
  width:100%;
  height: 100%;
}
.rooms_inner_content::before{
  border-top: solid 2px rgb(189, 188, 188);
  height: 20px;
  width: 100%;
  position: absolute;
  top: -20px;
  right: 0;
  content: "";
}
.rooms_inner_content:first-child::before{
  border-top: solid 2px rgb(189, 188, 188);
  width: 100%;
  position: absolute;
  top: -20px;
  left: 50%;
  content: "";
}
.rooms_inner_content:last-child::before{
  border-top: solid 2px rgb(189, 188, 188);
  width: 100%;
  position: absolute;
  top: -20px;
  right: 50%;
  content: "";
}
.rooms_inner_content:first-child .rooms_inner_content_title::before{
  border-top: none;
  height: 0;
  width: 0;
  position: unset;
  top: 0;
  content: "";
}
.rooms_inner_content:last-child .rooms_inner_content_title::before{
  border-top: none;
  height: 0;
  width: 0;
  position: unset;
  top: 0;
  content: "";
}
.rooms_inner_content_title::after{
  border-right: solid 2px rgb(189, 188, 188);
  height: 20px;
  position: absolute;
  top: -20px;
  right: 50%;
  content: "";
}
.rooms_inner_content_text{
  display: flex;
  align-items: center;
  margin: 0;
  padding: 5px 10px 5px 20px;
  border-left: solid 2px rgb(189, 188, 188);
  border-bottom: solid 2px rgb(189, 188, 188);
  font-size: 10px;
  max-width: 140px;
  word-break: break-all;
  text-align: left;
}
@media (min-width: 530px){
  
}
</style>