<template>
    <div class="college" style="margin: 0 -12px;">
      <v-alert style="position: fixed; top: 70px; z-index: 20; width: 95%; margin-left: 12px;" color="info" type="success" v-model="saveAlert" transition="slide-y-transition">
        保存されました。
      </v-alert>
      <v-alert style="position: fixed; top: 70px; z-index: 20; width: 95%; margin-left: 12px;" color="info" type="success" v-model="doneAlert" transition="slide-y-transition">
        このルームが達成されました。
      </v-alert>
      <v-alert style="position: fixed; top: 70px; z-index: 20; width: 95%; margin-left: 12px;" color ="" type="success" v-model="notYetAlert" transition="slide-y-transition">
        このルームが未達成されました。
      </v-alert>
      <div style="position: absolute; top: 0; display: flex; align-items: center; padding: 10px; z-index: 10;">
        <v-icon @click="notYet" class="mr-2" color="info" v-if="room.done == true">mdi-checkbox-marked-circle</v-icon>
        <v-icon @click="done" class="mr-2" v-else>mdi-checkbox-marked-circle-outline</v-icon>
        <v-btn small color="info" @click="save">SAVE</v-btn>
      </div>
        <Mindmap style="height: calc(100vh - 100px)" @click="complete = ''" :download="false" :strokeWidth="1" :fitView="false"  v-model="contents"></Mindmap>
    </div>
</template>
<script>
    import Mindmap from '@hellowuxin/mindmap'
    export default {
        components: {
            Mindmap,
        },
        data(){
            return {
                contents: [{}],
                room: [],
                room_id: this.$route.params.id,

                saveAlert: false,
                doneAlert: false,
                notYetAlert: false,
            }
        },
        created() {
          this.$axios.$get(`api/contents/${this.$route.params.id}}`,{
              headers:{
                'X-Access-Token': localStorage.getItem('X-Access-Token')
              }
            }).then(res => {
              this.contents = res.data.attributes.content
              this.room = res.data.attributes.room
            });
        },
        methods: {
          async done() {
            const params = {
              done: true
            }
            await this.$axios.$patch(`api/rooms/${this.$route.params.id}`, params, {
              headers:{
                'X-Access-Token': localStorage.getItem('X-Access-Token')
              }
            })
            this.$axios.$get(`api/rooms/${this.$route.params.id}}`,{
              headers:{
                'X-Access-Token': localStorage.getItem('X-Access-Token')
              }
            }).then(res => {
              this.room = res.data.attributes
              this.doneAlert = true
            });
          },
          async notYet() {
            const params = {
              done: false
            }
            await this.$axios.$patch(`api/rooms/${this.$route.params.id}`, params, {
              headers:{
                'X-Access-Token': localStorage.getItem('X-Access-Token')
              }
            })
            this.$axios.$get(`api/rooms/${this.$route.params.id}}`,{
              headers:{
                'X-Access-Token': localStorage.getItem('X-Access-Token')
              }
            }).then(res => {
              this.room = res.data.attributes
              this.notYetAlert = true
            });
          },
          save(){
            const params = {
              room_id: this.$route.params.id,
              content: this.contents
            }
            this.$axios.$patch(`api/contents/${this.$route.params.id}`, params, {
              headers:{
                'X-Access-Token': localStorage.getItem('X-Access-Token')
              }
            }).then(this.saveAlert = true)
            
          },

        },

        destroyed(){
          const params = {
            room_id: this.room_id,
            content: this.contents
          }
          this.$axios.$patch(`api/contents/${this.room_id}`, params, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          })
        },
        watch: {
          saveAlert (val) {
            val && setTimeout(() => {
              this.saveAlert = false
            }, 2000)
          },
          doneAlert (val) {
            val && setTimeout(() => {
              this.doneAlert = false
            }, 2000)
          },
          notYetAlert (val) {
            val && setTimeout(() => {
              this.notYetAlert = false
            }, 2000)
          },
        },
    }
</script>