<template>
  <div
    max-width="450"
    class="mx-auto mb-13"
  >
  <div class="user_header" style="border-bottom: solid 1px #eee;">
    <div 
      class=""
      style="width: 90%; margin: 25px auto 0 auto"
    >
      <v-text-field
        v-model="search_name"
        placeholder="USER 検索"
        required
        prepend-inner-icon="mdi-magnify"
        filled
        rounded
        dense
        @keypress.enter="onSearch"
      ></v-text-field>
    </div>
  </div>
    <v-list three-line>
      <template v-for="(user, index) in users" >
        

        <v-list-item
          class="user_main"
          :key="`user-${index}`"
        >
          <v-list-item-avatar
            @click="$router.push(`/users/${user.id}`)"
          >
            <v-img :src="`http://localhost:3000${user.image}`"></v-img>
          </v-list-item-avatar>
          <v-list-item-content
            @click="$router.push(`/users/${user.id}`)"
          >
            <v-list-item-title v-html="user.name"></v-list-item-title>
            <v-list-item-subtitle v-if="user.profile == ''"></v-list-item-subtitle>
            <v-list-item-subtitle v-if="user.profile" v-html="user.profile"></v-list-item-subtitle>
          </v-list-item-content>
          <template v-if="currentUser.id == user.id"></template>
          <template v-else>
            <v-btn v-if="user.follow_judge" @click="unfollow(user.id)" small color="info" class="unfollow">フォロー済み</v-btn>
            <v-btn v-else @click="follow(user.id)" outlined color="info" class="folow" small>フォロー</v-btn>
          </template>
        </v-list-item>

      </template>
    </v-list>
    <template v-if="currentPage == totalPage"></template>
    <p @click="userMore" v-else style="cursor: pointer; text-align: center; margin: 10px 0;">もっとみる</p>
  </div>
</template>

<script>
export default {
  data () {
    return{
      currentUser:{},

      users:[],
      search_name: '',
      search: [],

      userPage: 1,
      moreJudge: '',

      currentPage: 1,
      totalPage: '',
    }
  },
  created () {
    this.$axios.$get(`api/users/`, {
      headers:{
        'X-Access-Token': localStorage.getItem('X-Access-Token')
      }
    }).then(res => {
      this.currentPage = res.pagination.current_page
      this.totalPage = res.pagination.total_pages
      this.currentUser = res.data[0].attributes.current_user
      this.users = []

      var contents = []
      contents = res.data
      for (let i = 0; i < contents.length; i++){
        this.users.push({
          id: contents[i].attributes.id,
          image: contents[i].attributes.image.url,
          name: contents[i].attributes.name,
          profile: contents[i].attributes.profile,
          follow_judge: contents[i].attributes.follow_judge
        })
      }
    })
  },
  methods: {

    async onSearch(){
      if(this.search_name){
        await this.$axios.$get(`api/users/search/${this.search_name}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.users = []

          var contents = []
          contents = res.data
          for (let i = 0; i < contents.length; i++){
          this.users.push({
            id: contents[i].attributes.id,
            image: contents[i].attributes.image.url,
            name: contents[i].attributes.name,
            profile: contents[i].attributes.profile,
            follow_judge: contents[i].attributes.follow_judge
          })
        }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
      })
      }else{
        await this.$axios.$get(`api/users/`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.users = []

          var contents = []
          contents = res.data
          for (let i = 0; i < contents.length; i++){
            this.users.push({
              id: contents[i].attributes.id,
              image: contents[i].attributes.image.url,
              name: contents[i].attributes.name,
              profile: contents[i].attributes.profile,
              follow_judge: contents[i].attributes.follow_judge
            })
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
        })
      }
    },
    async follow(user_id){
      const params = {
        user_id: user_id
      }
      await this.$axios.$post(`api/follows/`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
      
      this.onSearch()
    },
    async unfollow(user_id){
      await this.$axios.$delete(`api/follows/${user_id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })

      this.onSearch()
    },
    async userMore(){
      var next = this.currentPage + 1
      if(this.search_name){
        await this.$axios.$get(`api/users/search/${this.search_name}?page=${next}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          var contents = []
          contents = res.data
          for (let i = 0; i < contents.length; i++){
          this.users.push({
            id: contents[i].attributes.id,
            image: contents[i].attributes.image.url,
            name: contents[i].attributes.name,
            profile: contents[i].attributes.profile,
            follow_judge: contents[i].attributes.follow_judge
          })
        }
        this.currentPage = res.pagination.current_page
        this.totalPage = res.pagination.total_pages
      })
      }else{
        await this.$axios.$get(`api/users?page=${next}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {

          var contents = []
          contents = res.data
          for (let i = 0; i < contents.length; i++){
            this.users.push({
              id: contents[i].attributes.id,
              image: contents[i].attributes.image.url,
              name: contents[i].attributes.name,
              profile: contents[i].attributes.profile,
              follow_judge: contents[i].attributes.follow_judge
            })
          }
          this.currentPage = res.pagination.current_page
          this.totalPage = res.pagination.total_pages
        })
      }
    },
  }
}
</script>

<style scoped>
.user_main{
  border-bottom: solid 1px #eee;
}

</style>