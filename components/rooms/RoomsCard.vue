<template>
  <v-card
    class="mx-auto mt-3"
    width="90%"
    max-width="600"
  >
    <v-card-text class="pb-0">
      <div class="room_header pl-2">
        <div class="room_id">room:{{room.id}}</div>
      </div>
      <p style="font-weight: bold;" class="room_title display-1 text--primary mb-2 mt-2 pl-2" >
        <span v-if="room.done == true" style="color: #2196f3;">{{room.title}}</span>
        <span v-else>{{room.title}}</span>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="info accent-4"
        style="font-weight: bold;"
        @click="`${$router.push(`/rooms/${room.id}`)}`"
        class="pr-3"
      >
      <v-icon color="info" style="font-size: 18px; margin-right: 2px;">mdi-application</v-icon>
        ルームへ
      </v-btn>

    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  props: {
    room:{
      type: Object,
      required: true,
      default: () => [],
    }
  },

  methods: {
    async destroy(id){
      const confirmation = window.confirm("本当に削除して良いのですか？");
      if (confirmation){
        await this.$axios.$delete(`api/rooms/${id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(
        )
        await this.$axios.$get('api/rooms', {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.rooms = res
        })
      }
    },
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