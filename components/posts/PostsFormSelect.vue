<template>
  <v-container fluid>
    <v-row align="center">

        <v-select
          :items="rooms_title"
          label="ROOM 選択"
          outlined
          :rules="rules"
          v-model="setRoom"
        ></v-select>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      rooms: [],
      rooms_title: [],

      room: '',

      rules: [
        v => !!v || '',
      ]
    }),
  created() {
    this.$axios.$get('/api/rooms/all', {
      headers:{
        'X-Access-Token': localStorage.getItem('X-Access-Token')
      }
    }).then(res => {
      for (let i = 0; i < res.data.length; i++){
        this.rooms_title.push(res.data[i].attributes.title)
        this.rooms.push(res.data[i].attributes)
      }
    })
  },
    computed:{
      setRoom: {
        get () {
          for (let i = 0; i < this.rooms.length; i++){
            if(this.room == this.rooms[i].title){
              return this.rooms[i].id
            }
          }
        },
        set (newVal) {
          for (let i = 0; i < this.rooms.length; i++){
            if(newVal == this.rooms[i].title){
              return this.$emit('update:room', this.rooms[i].id)
            }
          }
        }
      }
    }
  }
</script>