<template>
  <div
    max-width="450"
    class="mx-auto mb-10 pb-5"
  >
    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

    <div class="user_header">
      <div class="user_header_inner">
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
<<<<<<< HEAD
            <v-img :src="`${apiUrl}${user.image}`"></v-img>
=======
            <v-img :src="`http://localhost:5000${user.image}`"></v-img>
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18
          </v-list-item-avatar>
          <v-list-item-content
            @click="$router.push(`/users/${user.id}`)"
          >
            <v-list-item-title v-html="user.name"></v-list-item-title>
            <v-list-item-subtitle v-if="user.profile == ''"></v-list-item-subtitle>
            <v-list-item-subtitle v-if="user.profile" v-html="user.profile"></v-list-item-subtitle>
          </v-list-item-content>
          <template v-if="loginJudge">
            <template v-if="currentUser.id == user.id"></template>
            <template v-else>
              <v-btn v-if="user.follow_judge" @click="unfollow(user.id)" small color="info" class="unfollow">フォロー済み</v-btn>
              <v-btn v-else @click="follow(user.id)" outlined color="info" class="folow" small>フォロー</v-btn>
            </template>
          </template>
        </v-list-item>

      </template>
    </v-list>
    <template v-if="currentPage == totalPage"></template>
    <p class="user_more" @click="userMore" v-else>もっとみる</p>

  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';

export default {
  components:{
    VueLoading
  },

  data () {
    return{
      currentUser:{},
      users:[],
      search_name: '',
      search: [],

      currentPage: 1,
      totalPage: '',

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
  created () {
    if(localStorage.getItem('id')){
      this.loginJudge = true
    }else{
      this.loginJudge = false
    }
    if (localStorage.getItem('X-Access-Token')){
      this.$axios.$get(`api/users/`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        this.currentPage = res.pagination.current_page
        this.totalPage = res.pagination.total_pages
        this.currentUser = {id: localStorage.getItem('id')}
        this.users = []
  
        var contents = res.data
        for (let i = 0; i < contents.length; i++){
          this.users.push({
            id: contents[i].attributes.id,
            image: contents[i].attributes.image.url,
            name: contents[i].attributes.name,
            profile: contents[i].attributes.profile,
            follow_judge: contents[i].attributes.follow_judge
          })
        }
        this.loading = false
      })
    }else{
      this.$axios.$get(`api/users/`).then(res => {
        this.currentPage = res.pagination.current_page
        this.totalPage = res.pagination.total_pages
        this.currentUser = {id: localStorage.getItem('id')}
        this.users = []

        var contents = res.data
        for (let i = 0; i < contents.length; i++){
          this.users.push({
            id: contents[i].attributes.id,
            image: contents[i].attributes.image.url,
            name: contents[i].attributes.name,
            profile: contents[i].attributes.profile,
            follow_judge: contents[i].attributes.follow_judge
          })
        }
        this.loading = false
      })
    }
  },

  methods: {
    async onSearch(){
      this.loading = true
      if(this.search_name){
        if(localStorage.getItem('id')){
          await this.$axios.$get(`api/users/search/${this.search_name}`, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          }).then(res => {
            this.users = []
  
            var contents = res.data
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
            this.loading = false
          })
        }else{
          await this.$axios.$get(`api/users/search/${this.search_name}`).then(res => {
            this.users = []
            var contents = res.data
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
            this.loading = false
          })
        }
      }else{
        if(localStorage.getItem('id')){
          await this.$axios.$get(`api/users/`, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          }).then(res => {
            this.users = []
<<<<<<< HEAD

            var contents = res.data
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
            this.loading = false
          })
        }else{
          await this.$axios.$get(`api/users/`).then(res => {
            this.users = []
=======
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18

            var contents = res.data
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
            this.loading = false
          })
<<<<<<< HEAD
=======
        }else{
          await this.$axios.$get(`api/users/`).then(res => {
            this.users = []

            var contents = res.data
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
            this.loading = false
          })
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18
        }
      }
    },

    async follow(user_id){
      this.loading = true
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
      this.loading = true
      await this.$axios.$delete(`api/follows/${user_id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
      this.onSearch()
    },
    
    async userMore(){
      this.loading = true
      var next = this.currentPage + 1
      if(this.search_name){
        if(localStorage.getItem('id')){
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
            this.loading = false
          })
        }else{
          await this.$axios.$get(`api/users/search/${this.search_name}?page=${next}`).then(res => {
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
            this.loading = false
          })
        }
      }else{
        if(localStorage.getItem('id')){
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
            this.loading = false
          })
        }else{
          await this.$axios.$get(`api/users?page=${next}`).then(res => {
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
            this.loading = false
          })
        }
      }
    },
  }
}
</script>

<style scoped>
.user_header{
  border-bottom: solid 1px #eee;
}
.user_header_inner{
  width: 90%; 
  margin: 25px auto 0 auto
}
.user_main{
  border-bottom: solid 1px #eee;
}
.user_more{
  cursor: pointer; 
  text-align: center; 
  margin: 10px 0;
}
</style>