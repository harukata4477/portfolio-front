<template>
  <div>
    <div class="user_header" >
      <v-row class="rooms_top mt-5 ml-3">
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
          dense
          @keypress.enter="onSearch"
        ></v-text-field>
      </div>
      <!-- <ul class="type">
        <li @click="all">全て</li>
        <li v-for="tag in tags" @click="tag_search(tag.name)">{{tag.name}}&nbsp;({{tag.count}})</li>
      </ul> -->
    </div>

    <p>新規投稿</p>
      <v-row dense class="mb-6 mt-3">
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
              :src="`/img/img${a}.svg`"
            >
              <v-card-title style="font-size: 15px; font-weight: bold; line-height: 1.5;" v-text="post.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <div @click="$router.push(`/users/${users[a].id}`)" class="user" style="display: flex;">
                <v-img :src="`http://localhost:3000${users[a].image.url}`" class="user_img"></v-img>
                <p class="user_name">{{users[a].name}}</p>
              </div>

              <v-spacer></v-spacer>
              <!-- {{like_counts[a]}} -->
              <!-- <v-btn icon >
                <v-icon v-if="like_judges[a]" @click="unlike(posts[a].id)" style="color: red;">mdi-heart</v-icon>
                <v-icon v-else @click="like(posts[a].id)" @>mdi-heart</v-icon>
              </v-btn> -->
              <v-icon>mdi-heart</v-icon>

            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>

  </div>
</template>

<script>
export default {
  data(){
    return{
      users: [],
      rooms: [],
      posts: [],
      
      search_title: '',

      createForm: false,
      selectedItem: false,
    }
  },
  created() {

    this.$axios.$get('api/posts', {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        for (let i = 0; i < res.data.length; i++){
          this.posts.push({
            id: res.data[i].attributes.id,
            title: res.data[i].attributes.title,
            updated_at: res.data[i].attributes.updated_at
          })
          this.users.push(res.data[i].attributes.users)
        }
    })


    // this.$axios.$get('api/posts/likes', {
    //       headers:{
    //           authorization: localStorage.getItem('access-token')
    //       }
    // }).then(res => {
    //     this.like_judges = res.like_judges
    //     this.like_counts = res.like_counts
    // })

  },
  methods: {
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

    back(){
      if(this.first_page == true){

      } else{
        this.nowPage--
        this.onSearch(this.nowPage)
      }
    },
    next(){
      if(this.last_page == true){

      } else{
        this.nowPage++
        this.onSearch(this.nowPage)
      }
    },
    page(a){
      this.nowPage = a
      this.onSearch(this.nowPage)
    },

    // async create(){
    //   const params = {
    //     title: this.title,
    //     text: this.text,
    //     room_id: this.room_id,
    //   }

    //   this.$axios.$post('api/posts/', params, {
    //     headers:{
    //       authorization: localStorage.getItem('access-token')
    //     }
    //   }).then(
    //     this.$router.push(`/${this.room_id}/`)
    //   )
    // },
    async onSearch(){
      if(this.search_title){
        this.$axios.$get(`api/posts/search/${this.search_title}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.posts = []
          this.users = []
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.id,
              title: res.data[i].attributes.title,
              updated_at: res.data[i].attributes.updated_at
            })
            this.users.push(res.data[i].attributes.users)
          }
        })
      }else{
        this.$axios.$get(`api/posts/`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.posts = []
          this.users = []
          for (let i = 0; i < res.data.length; i++){
            this.posts.push({
              id: res.data[i].attributes.id,
              title: res.data[i].attributes.title,
              updated_at: res.data[i].attributes.updated_at
            })
            this.users.push(res.data[i].attributes.users)
          }
        })
      }
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
      await this.$axios.$get('api/posts/likes', {
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
      await this.$axios.$get('api/posts/likes', {
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
/* .rooms{
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
} */
/* 
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
} */
</style>