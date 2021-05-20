<template>
    <div class="college mt-0 mb-0 ml-0 mr-0">

<<<<<<< HEAD
      <!-- <div class="mind_map_save">
=======
      <div v-if="loading" class="loading">
        <div class="loading_inner">
          <p class="loading_inner_text">Loading...</p>
          <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
        </div>
      </div>

      <v-alert class="alert" style="top: 10px;" color="info" type="success" v-model="saveAlert" transition="slide-y-transition">
        保存されました。
      </v-alert>
      <v-alert class="alert" style="top: 10px;" color="info" type="success" v-model="doneAlert" transition="slide-y-transition">
        このルームが達成されました。
      </v-alert>
      <v-alert class="alert" style="top: 10px;" color ="" type="success" v-model="notYetAlert" transition="slide-y-transition">
        このルームが未達成されました。
      </v-alert>

      <div class="mind_map_save">
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18
        <v-icon @click="$router.push('/rooms')" large class="mr-3" color="info">mdi-chevron-left</v-icon>
        <v-icon @click="notYet" class="mr-2" color="info" v-if="room.done == true">mdi-checkbox-marked-circle</v-icon>
        <v-icon @click="done" class="mr-2" v-else>mdi-checkbox-marked-circle-outline</v-icon>
        <v-btn small color="info" @click="save">SAVE</v-btn>
<<<<<<< HEAD
      </div> -->
      <mindmap class="full_page" :params="$route.params.id" />
=======
      </div>
      <Mindmap class="full_page" @click="complete = ''" :download="false" :strokeWidth="2" :ySpacing='30' :fitView="false"  v-model="contents"></Mindmap>
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18
      <v-icon class="help" color="gray" @click="$router.push('/help/')">mdi-help-circle</v-icon>
    </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
import mindmap from '~/components/Mindmap'

export default {
  components: {
    mindmap,
    VueLoading,
  },

  data(){
    return {
      // contents: [],
      // room: [],
      // room_id: this.$route.params.id,

      // saveAlert: false,
      // doneAlert: false,
      // notYetAlert: false,
      // loading: true,
    }
  },

  created() {
<<<<<<< HEAD
    // this.$axios.$get(`api/contents/${this.$route.params.id}}`,{
    //   headers:{
    //     'X-Access-Token': localStorage.getItem('X-Access-Token')
    //   }
    // }).then(res => {
    //   // this.contents = res.data.attributes.content
    //   // if(this.contents.length == 0){
    //   //   this.contents = {"key":0, "text":"タイトル入力", "loc":"0 0"}
    //   //   const params = {
    //   //     room_id: this.$route.params.id,
    //   //     content: this.contents
    //   //   }
    //   //   this.$axios.$patch(`api/contents/${this.$route.params.id}`, params, {
    //   //     headers:{
    //   //       'X-Access-Token': localStorage.getItem('X-Access-Token')
    //   //     }
    //   //   }).then(this.saveAlert = true, this.loading = false)
    //   // }
    //   // this.room = res.data.attributes.room
    //   // this.loading = false
    // });
=======
    this.$axios.$get(`api/contents/${this.$route.params.id}}`,{
      headers:{
        'X-Access-Token': localStorage.getItem('X-Access-Token')
      }
    }).then(res => {
      this.contents = res.data.attributes.content
      if(this.contents.length == 0){
        this.contents = [{"name":"タイトル入力","left":false}]
        const params = {
          room_id: this.$route.params.id,
          content: this.contents
        }
        this.$axios.$patch(`api/contents/${this.$route.params.id}`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(this.saveAlert = true, this.loading = false)
      }
      this.room = res.data.attributes.room
      this.loading = false
    });
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18
  },

  methods: {
    // async done() {
    //   this.loading = true
    //   const params = {
    //     done: true
    //   }
    //   await this.$axios.$patch(`api/rooms/${this.$route.params.id}`, params, {
    //     headers:{
    //       'X-Access-Token': localStorage.getItem('X-Access-Token')
    //     }
    //   })
    //   this.$axios.$get(`api/rooms/${this.$route.params.id}}`,{
    //     headers:{
    //       'X-Access-Token': localStorage.getItem('X-Access-Token')
    //     }
    //   }).then(res => {
    //     this.room = res.data.attributes
    //     this.loading = false
    //     this.doneAlert = true
    //   });
    // },

    // async notYet() {
    //   this.loading = true
    //   const params = {
    //     done: false
    //   }
    //   await this.$axios.$patch(`api/rooms/${this.$route.params.id}`, params, {
    //     headers:{
    //       'X-Access-Token': localStorage.getItem('X-Access-Token')
    //     }
    //   })
    //   this.$axios.$get(`api/rooms/${this.$route.params.id}}`,{
    //     headers:{
    //       'X-Access-Token': localStorage.getItem('X-Access-Token')
    //     }
    //   }).then(res => {
    //     this.room = res.data.attributes
    //     this.loading = false
    //     this.notYetAlert = true
    //   });
    // },

  //   save(){
  //     this.loading = true
  //     const params = {
  //       room_id: this.$route.params.id,
  //       content: this.contents
  //     }
  //     this.$axios.$patch(`api/contents/${this.$route.params.id}`, params, {
  //       headers:{
  //         'X-Access-Token': localStorage.getItem('X-Access-Token')
  //       }
  //     }).then(this.saveAlert = true, this.loading = false)
  //   },
  // },

  // watch: {
  //   saveAlert (val) {
  //     val && setTimeout(() => {
  //       this.saveAlert = false
  //     }, 2000)
  //   },
  //   doneAlert (val) {
  //     val && setTimeout(() => {
  //       this.doneAlert = false
  //     }, 2000)
  //   },
  //   notYetAlert (val) {
  //     val && setTimeout(() => {
  //       this.notYetAlert = false
  //     }, 2000)
  //   },
  },
}
</script>

<style>
.full_page{
  height: 100vh !important;
  font-weight: bold !important;
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  width: 100vw !important;
}
<<<<<<< HEAD
=======
.mind_map_save{
  position: fixed;
  top: 0;
  left: 0;
  display: flex; 
  align-items: center; 
  padding: 10px;  
  z-index: 2; 
}
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18

.menu-item:nth-child(1) div{
  font-size: 0px;
}
.menu-item:nth-child(1) div:before{
  font-size: 12px;
  content: '削除';
}
.menu-item:nth-child(2) div{
  font-size: 0px;
}
.menu-item:nth-child(2) div:before{
  font-size: 12px;
  content: '折りたたむ';
}
.menu-item:nth-child(3) div{
  font-size: 0px;
}
.menu-item:nth-child(3) div:before{
  font-size: 12px;
  content: '展開';
}
.help{
  position: fixed !important;
<<<<<<< HEAD
  bottom: 10px !important;
  right: 10px !important;
=======
  bottom: 40px !important;
  right: 5px !important;
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18
  z-index: 10 !important;
}

@media (min-width: 960px){
<<<<<<< HEAD
=======
  .full_page{
    height: 100vh !important;
    width: 100vw !important;
  }
  .mind_map_save{
    position: fixed;
    top: 0; 
    left: 0;
    display: flex; 
    align-items: center; 
    padding: 10px;  
    z-index: 2;
  }
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18
}

</style>