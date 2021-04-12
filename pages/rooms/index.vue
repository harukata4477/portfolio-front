<template>
  <div class="pb-10"> 
    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

    <v-alert class="alert" type="success" v-model="updateAlert" transition="slide-y-transition">
      更新されました。
    </v-alert>
    <v-alert class="alert" color="error" type="success" v-model="deleteAlert" transition="slide-y-transition">
      削除されました。
    </v-alert>

    <div class="room_header">
      <div class="room_header_inner">
        <v-text-field
          v-model="search_title"
          placeholder="Room 検索"
          required
          prepend-inner-icon="mdi-magnify"
          filled
          rounded
          dense
          hide-details="auto"
          @keypress.enter="onSearch(1)"
        ></v-text-field>
      </div>
    </div>

    <div class="room_select mt-2">
      <v-col class="room_select_col pb-0 pt-0 pl-0 pr-0">
        <v-select
          class="room_select_col_select"
          :items="items"
          v-model="select"
          @change="selectPage"
          solo
          flat
          single-line
          return-object
          hide-details="auto"
          background-color="transparent"
        ></v-select>
      </v-col>
      <v-spacer></v-spacer>
      <v-icon large v-if="loginJudge" @click="$router.push('/rooms/create')">mdi-pencil-box-outline</v-icon>
    </div>
    
    <div class="room_content" v-for="(room,i) in rooms" :key="`room-${i}`">
      <v-card
        class="mx-auto mb-3"
        width="95%"
      >
        <v-card-text class="pb-0">
          <div class="room_content_header">
            <v-icon class="mr-2" color="info" v-if="room.done == true">mdi-checkbox-marked-circle</v-icon>
            <v-icon class="mr-2" v-else>mdi-checkbox-marked-circle-outline</v-icon>
            <div class="room_id"><v-icon small class="mr-1">mdi-calendar-clock</v-icon>{{room.deadline}}</div>
          </div>
          <input 
            class="subTitleForm ml-1 mt-3" 
            v-model="room.title"
            @keypress.enter="update(room)"
          >
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="info accent-4"
            class="room_content_btn"
            @click="`${$router.push(`/rooms/${room.id}`)}`"
          >
          <v-icon color="info" style="font-size: 18px; margin-right: 2px;">mdi-application</v-icon>
            ルームへ
          </v-btn>

          <v-btn
            text
            color="info accent-4"
            class="room_content_btn ml-0"
            @click="destroy(room.id)"
          >
            <v-icon class="room_content_btn_icon" color="info">mdi-delete-empty</v-icon>
              削除
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <div class="text-center mt-11">
      <v-pagination
        v-if="judgePage == 'index'"
        v-model="page"
        :length="this.totalPage"
        :total-visible="7"
        @input = "onSearch(page)"
      ></v-pagination>
      <v-pagination
        v-if="judgePage == 'done'"
        v-model="page"
        :length="this.totalPage"
        :total-visible="7"
        @input = "roomDone(page)"
      ></v-pagination>
      <v-pagination
        v-if="judgePage == 'notYet'"
        v-model="page"
        :length="this.totalPage"
        :total-visible="7"
        @input = "roomNotYet(page)"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';

export default {
  components:{
    VueLoading
  },
  data () {
    return {
      select: '全て',
      items: ['全て','完了','未完了'], 
      rooms:[],
      search_title: '',
      currentPage: 1,
      totalPage: 1,
      page: 1,

      judgePage: 'index',
      updateAlert: false,
      deleteAlert: false,
      loading: true,
      load_judge: false,
    }
  },

  created () {
    if(localStorage.getItem('id')){
      this.loginJudge = true
    }else{
      this.loginJudge = false
    }
    this.rooms = []
    this.$axios.$get('api/rooms', {
      headers:{
        'X-Access-Token': localStorage.getItem('X-Access-Token')
      }
    }).then(res => {
      for (let i = 0; i < res.data.length; i++){
        var deadline = new Date(res.data[i].attributes.deadline)
        var year = deadline.getFullYear();
        var month = deadline.getMonth() + 1 ;
        var day = deadline.getDate();
        var hour = deadline.getHours();
        var minute = deadline.getMinutes();
        var date = year + '/' + month + '/' + day + ' ' + hour + ':' + minute

        this.rooms.push({
          id: res.data[i].attributes.id,
          title: res.data[i].attributes.title,
          deadline: date,
          done: res.data[i].attributes.done,
        })
        this.currentPage = res.pagination.current_page
        this.totalPage = res.pagination.total_pages
      }
      this.loading = false
    }).catch(
      this.load_judge = true
    )
  },

  methods:{
    async update(room) {
      this.loading = true
      const params = {
        title: room.title
      }
      await this.$axios.$patch(`api/rooms/${room.id}`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(this.updateAlert = true, this.loading = false)
    },
    
    async destroy(id){
      this.loading = true
      const confirmation = window.confirm("本当に削除して良いのですか？");
      if (confirmation){
        await this.$axios.$delete(`api/rooms/${id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(this.deleteAlert = true)
        this.onSearch(this.page)
      }else{
        this.loading = false
      }
    },

    async onSearch(page){
      this.loading = true
      if(localStorage.getItem('id')){
        this.page = page
        if(this.search_title){
          await this.$axios.$get(`api/rooms/search/${this.search_title}?page=${this.page}`, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          }).then(res => {
            this.rooms = []
            for (let i = 0; i < res.data.length; i++){
              var deadline = new Date(res.data[i].attributes.deadline)
              var year = deadline.getFullYear();
              var month = deadline.getMonth() + 1 ;
              var day = deadline.getDate();
              var hour = deadline.getHours();
              var minute = deadline.getMinutes();
              var date = year + '/' + month + '/' + day + ' ' + hour + ':' + minute

              this.rooms.push({
                id: res.data[i].attributes.id,
                title: res.data[i].attributes.title,
                deadline: date,
                done: res.data[i].attributes.done,
              })
              this.currentPage = res.pagination.current_page
              this.totalPage = res.pagination.total_pages
            }
            this.loading = false
          })
        }else{
          await this.$axios.$get(`api/rooms?page=${this.page}`, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          }).then(res => {
            this.rooms = []
              for (let i = 0; i < res.data.length; i++){
              var deadline = new Date(res.data[i].attributes.deadline)
              var year = deadline.getFullYear();
              var month = deadline.getMonth() + 1 ;
              var day = deadline.getDate();
              var hour = deadline.getHours();
              var minute = deadline.getMinutes();
              var date = year + '/' + month + '/' + day + ' ' + hour + ':' + minute

              this.rooms.push({
                id: res.data[i].attributes.id,
                title: res.data[i].attributes.title,
                deadline: date,
                done: res.data[i].attributes.done,
              })
              this.currentPage = res.pagination.current_page
              this.totalPage = res.pagination.total_pages
            }
            this.loading = false
          })
        }
      }else{
        this.load_judge = true
      }
    },

    async roomDone(page){
      this.rooms = []
      this.loading = true
      this.page = page
      if(localStorage.getItem('id')){
        await this.$axios.$get(`api/rooms/room_done?page=${this.page}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          for (let i = 0; i < res.data.length; i++){
            var deadline = new Date(res.data[i].attributes.deadline)
            var year = deadline.getFullYear();
            var month = deadline.getMonth() + 1 ;
            var day = deadline.getDate();
            var hour = deadline.getHours();
            var minute = deadline.getMinutes();
            var date = year + '/' + month + '/' + day + ' ' + hour + ':' + minute

            this.rooms.push({
              id: res.data[i].attributes.id,
              title: res.data[i].attributes.title,
              deadline: date,
              done: res.data[i].attributes.done,
            })
            this.currentPage = res.pagination.current_page
            this.totalPage = res.pagination.total_pages
          }
          this.loading = false
          this.judgePage = 'done'
        })
      }else{
        this.load_judge = true
      }
    },

    async roomNotYet(page){
      this.rooms = []
      this.loading = true
      this.page = page
      if(localStorage.getItem('id')){
        await this.$axios.$get(`api/rooms/room_not_yet?page=${this.page}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          for (let i = 0; i < res.data.length; i++){
            var deadline = new Date(res.data[i].attributes.deadline)
            var year = deadline.getFullYear();
            var month = deadline.getMonth() + 1 ;
            var day = deadline.getDate();
            var hour = deadline.getHours();
            var minute = deadline.getMinutes();
            var date = year + '/' + month + '/' + day + ' ' + hour + ':' + minute

            this.rooms.push({
              id: res.data[i].attributes.id,
              title: res.data[i].attributes.title,
              deadline: date,
              done: res.data[i].attributes.done,
            })
            this.currentPage = res.pagination.current_page
            this.totalPage = res.pagination.total_pages
          }
          this.loading = false
          this.judgePage = 'notYet'
        })
      }else{
        this.load_judge = true
      }
    },

    selectPage(){
      if(this.select == '完了'){
        if(localStorage.getItem('id')){
          this.roomDone(1)
        }
      }else if(this.select == '未完了'){
        if(localStorage.getItem('id')){
          this.roomNotYet(1)
          }
      }else{
        if(localStorage.getItem('id')){
          this.onSearch(1)
        }
      }
    }
  },

  watch: {
      updateAlert (val) {
        val && setTimeout(() => {
          this.updateAlert = false
        }, 2000)
      },
      deleteAlert (val) {
        val && setTimeout(() => {
          this.deleteAlert = false
        }, 2000)
      },
    load_judge (val) {
      val && setTimeout(() => {
        this.load_judge = false
        this.loading = false
      }, 500)
    },
  },
}
</script>

<style scoped>
.room_header_inner{
  width: 90%; 
  margin: 25px auto 0 auto;
}
.room_select{
  display: flex; 
  width: 95%; 
  margin: 0 auto;
}
.room_select_col{
  width: 120px;
}
.room_select_col_select{
  width: 100%;
}
.room_content{
  list-style: none;
}
.room_content_btn{
  font-weight: bold;
}
.room_content_btn_icon{
  font-size: 18px; 
  margin-right: 2px;
}
.room_content_id{
  display: inline-block;
}
.room_content_title{
  display: inline-block;
}
.room_content_header{
  display: flex;
  align-items: center;
}
.subTitleForm{
  border: none;
  outline: none;
  font-size: 28px;
  width: 100%;
  font-weight: bold;
}
</style>
