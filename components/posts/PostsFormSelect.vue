<template>
  <v-container fluid>
    <v-row align="center">

        <v-select
          :items="rooms"
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
        this.rooms.push(res.data[i].attributes.title)
      }
    })
  },
    computed:{
      setRoom: {
        get () {return this.room},
        set (newVal) {return this.$emit('update:room', newVal)}
      }
    }
  }
</script>