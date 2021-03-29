<template>
  <div style="margin-bottom: 80px;"> 
    <div class="user_header" >
      <v-alert style="position: fixed; top: 70px; z-index: 30; width: 95%;" type="success" v-model="updateAlert" transition="slide-y-transition">
        更新されました。
      </v-alert>
      <v-alert style="position: fixed; top: 70px; z-index: 30; width: 95%;" color="error" type="success" v-model="deleteAlert" transition="slide-y-transition">
        削除されました。
      </v-alert>
      <v-row class="rooms_top mt-5 mb-5 ml-3">
        <v-btn
          text
          color="info accent-4"
          style="font-weight: bold; border: solid 1px;"
          @click="$router.push('/rooms/create')"
        >
        <v-icon color="info" style="font-size: 18px; margin-right: 2px;">mdi-application</v-icon>
          新規作成
        </v-btn>
      </v-row>
      <div 
        class=""
        style="width: 90%; margin: 25px auto 0 auto"
      >
        <v-text-field
          v-model="search_title"
          placeholder="Room 検索"
          required
          prepend-inner-icon="mdi-magnify"
          filled
          rounded
          dense
          @keypress.enter="onSearch(1)"
        ></v-text-field>
      </div>
    </div>
    
    <div class="rooms" v-for="(room,i) in rooms" :key="`room-${i}`">
      <v-card
        class="mx-auto mt-3"
        width="90%"
      >
        <v-card-text class="pb-0">
          <div class="room_header">
            <v-icon class="mr-2" color="info" v-if="room.done == true">mdi-checkbox-marked-circle</v-icon>
            <v-icon class="mr-2" v-else>mdi-checkbox-marked-circle-outline</v-icon>
            <div class="room_id"><v-icon small class="mr-1">mdi-calendar-clock</v-icon>{{room.deadline}}</div>
          </div>
          <p style="font-weight: bold; width:100%;" class="room_title display-1 text--primary mb-2 mt-2" >
            
            <v-text-field
              filled
              rounded
              dense
              background-color="transparent"
              class="display-1"
              style="font-weight: bold; width:100%;"
              v-model="room.title"
              hide-details="auto"
              @keypress.enter="update(room)"
            ></v-text-field>

          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="info accent-4"
            style="font-weight: bold;"
            @click="`${$router.push(`/rooms/${room.id}`)}`"
          >
          <v-icon color="info" style="font-size: 18px; margin-right: 2px;">mdi-application</v-icon>
            ルームへ
          </v-btn>

          <v-btn
            text
            color="info accent-4"
            style="font-weight: bold;"
            class="ml-0"
            @click="destroy(room.id)"
          >
            <v-icon color="info" style="font-size: 18px; margin-right: 2px;">mdi-delete-empty</v-icon>
              削除
          </v-btn>
        </v-card-actions>

 
      </v-card>
    </div>
    <div class="text-center mt-11">
      <v-pagination
        v-model="page"
        :length="this.totalPage"
        :total-visible="7"
        @input = "onSearch(page)"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rooms:[],
      users: [],
      search_title: '',
      currentPage: 1,
      totalPage: 1,
      page: 1,

      updateAlert: false,
      deleteAlert: false,
    }
  },
  created () {
    this.$axios.$get('api/rooms', {
      headers:{
        'X-Access-Token': localStorage.getItem('X-Access-Token')
      }
    }).then(res => {
      for (let i = 0; i < res.data.length; i++){
        if(res.data[i].attributes.deadline){
          var date = new Date(res.data[i].attributes.deadline)
          var year = date.getFullYear();
          var month = date.getMonth() + 1 ;
          var day = date.getDate();
          var hour = date.getHours();
          var minute = date.getMinutes();
          var deadline = year + '年' + month + '月' + day + '日' + ' ' + hour + '時' + minute + '分'
        }

        this.rooms.push({
          id: res.data[i].attributes.id,
          title: res.data[i].attributes.title,
          deadline: deadline,
          done: res.data[i].attributes.done,
        })
        this.currentPage = res.pagination.current_page
        this.totalPage = res.pagination.total_pages
      }
    })
  },
  methods:{
    async update(room) {
      const params = {
        title: room.title
      }
      await this.$axios.$patch(`api/rooms/${room.id}`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(this.updateAlert = true)
    },
    async destroy(id){
      const confirmation = window.confirm("本当に削除して良いのですか？");
      if (confirmation){
        await this.$axios.$delete(`api/rooms/${id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(this.deleteAlert = true)
        this.onSearch(this.page)
      }
    },
    async onSearch(page){
      this.page = page
      if(this.search_title){
        await this.$axios.$get(`api/rooms/search/${this.search_title}?page=${this.page}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.rooms = []

          for (let i = 0; i < res.data.length; i++){
            if(res.data[i].attributes.deadline){
              var date = new Date(res.data[i].attributes.deadline)
              var year = date.getFullYear();
              var month = date.getMonth() + 1 ;
              var day = date.getDate();
              var hour = date.getHours();
              var minute = date.getMinutes();
              var deadline = year + '年' + month + '月' + day + '日' + ' ' + hour + '時' + minute + '分'
            }

            this.rooms.push({
              id: res.data[i].attributes.id,
              title: res.data[i].attributes.title,
              deadline: deadline,
              done: res.data[i].attributes.done,
            })
            this.currentPage = res.pagination.current_page
            this.totalPage = res.pagination.total_pages
          }
        })
      }else{
        await this.$axios.$get(`api/rooms?page=${this.page}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.rooms = []
            for (let i = 0; i < res.data.length; i++){

            if(res.data[i].attributes.deadline){
              var date = new Date(res.data[i].attributes.deadline)
              var year = date.getFullYear();
              var month = date.getMonth() + 1 ;
              var day = date.getDate();
              var hour = date.getHours();
              var minute = date.getMinutes();
              var deadline = year + '年' + month + '月' + day + '日' + ' ' + hour + '時' + minute + '分'
            }

            this.rooms.push({
              id: res.data[i].attributes.id,
              title: res.data[i].attributes.title,
              deadline: deadline,
              done: res.data[i].attributes.done,
            })
            this.currentPage = res.pagination.current_page
            this.totalPage = res.pagination.total_pages
          }
        })
      }
    },
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
    },
}
</script>

<style scoped>
.rooms{
  list-style: none;
}
.room_id{
  display: inline-block;
}
.room_title{
  display: inline-block;
}
.room_header{
  display: flex;
  align-items: center;
}
</style>
