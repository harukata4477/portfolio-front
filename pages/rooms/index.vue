<template>
  <div style="margin-bottom: 60px;"> 

    <div class="user_header" >
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
          v-model="search_goal"
          placeholder="Room 検索"
          required
          prepend-inner-icon="mdi-magnify"
          filled
          rounded
          dense
          @keypress.enter="onSearch"
        ></v-text-field>
      </div>
    </div>
    
    <div class="rooms" v-for="(room,i) in rooms" :key="`room-${i}`">
      <v-card
        class="mx-auto mt-3"
        width="90%"
        max-width="600"
      >
        <v-card-text class="pb-0">
          <div class="room_header">
            <div class="room_id">room:{{room.id}}</div>
          </div>
          <p style="font-weight: bold;" class="room_title display-1 text--primary mb-2 mt-2" >
            <span v-if="room.done == true" style="color: #2196f3;">{{room.goal}}</span>
            <span v-else>{{room.goal}}</span>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="info accent-4"
            style="font-weight: bold;"
            @click="`${$router.push(`/targets/${room.id}`)}`"
          >
          <v-icon color="info" style="font-size: 18px; margin-right: 2px;">mdi-application</v-icon>
            ルームへ
          </v-btn>

          <v-btn
            text
            color="info accent-4"
            style="font-weight: bold;"
            @click="$router.push(`/rooms/${room.id}`)"
            class="ml-0"
          >
            <v-icon color="info" style="font-size: 18px; margin-right: 2px;">mdi-pencil</v-icon>
              編集・詳細
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

  </div>
</template>

<script>
export default {
  data () {
    return {
      rooms:[],
      goal:'',
      users: [],
      search_goal: '',

    }
  },
  created () {
    this.$axios.$get('api/rooms', {
      headers:{
        authorization: localStorage.getItem('access-token')
      }
    }).then(res => {
      this.rooms = res
    })
  },
  methods:{
    async destroy(id){
      const confirmation = window.confirm("本当に削除して良いのですか？");
      if (confirmation){
        await this.$axios.$delete(`api/rooms/${id}`, {
          headers:{
            authorization: localStorage.getItem('access-token')
          }
        }).then(
        )
        await this.$axios.$get('api/rooms', {
          headers:{
            authorization: localStorage.getItem('access-token')
          }
        }).then(res => {
          this.rooms = res
        })
      }
    },
    async onSearch(){
      if(this.search_goal){
        await this.$axios.$get(`api/rooms/search/${this.search_goal}`, {
          headers:{
            authorization: localStorage.getItem('access-token')
          }
        }).then(res => {
            this.rooms = res
        })
      }else{
        await this.$axios.$get(`api/rooms/`, {
          headers:{
            authorization: localStorage.getItem('access-token')
          }
        }).then(res => {
            this.rooms = res
        })
      }
    }
  }
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
</style>
