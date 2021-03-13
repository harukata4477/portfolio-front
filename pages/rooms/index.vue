<template>
  <div class="mt-14 mb-10 pb-5"> 

    <div class="user_header" >
      <v-row class="rooms_top pt-5 pb-3 ml-3 mr-3">
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
          @keypress.enter="onSearch"
        ></v-text-field>
      </div>
    </div>
    
    <rooms-card v-for="room in rooms" :key="room.id" :room="room" />

    <v-footer width="100%" style="background-color: rgba(0, 126, 255); position: fixed;  bottom: 0; left: 0; padding: 12px 0; z-index: 2;">
      <bottom-menu />
    </v-footer>
  </div>
</template>

<script>
export default {

  data () {
    return {
      rooms:[],
      users: [],
      search_title: '',

    }
  },

  created () {
    this.$axios.$get('api/rooms', {
      headers:{
        'X-Access-Token': localStorage.getItem('X-Access-Token')
      }
    }).then(res => {
      this.rooms = res.data.attributes.rooms
    })
  },

  methods:{

    async onSearch(){
      if(this.search_title){
        await this.$axios.$get(`api/rooms/search/${this.search_title}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.rooms = res.data.attributes.rooms
        })
      }else{
        await this.$axios.$get(`api/rooms/`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
            this.rooms = res.data.attributes.rooms
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
