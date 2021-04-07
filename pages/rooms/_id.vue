<template>
    <div class="college" style="margin: 0;">
      <div v-if="loading" class="loading">
        <div class="loading_inner">
          <p class="loading_inner_text">Loading...</p>
          <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
        </div>
      </div>
      <v-alert style="position: fixed; top: 70px; z-index: 20; width: 95%; margin-left: 12px;" color="info" type="success" v-model="saveAlert" transition="slide-y-transition">
        保存されました。
      </v-alert>
      <v-alert style="position: fixed; top: 70px; z-index: 20; width: 95%; margin-left: 12px;" color="info" type="success" v-model="doneAlert" transition="slide-y-transition">
        このルームが達成されました。
      </v-alert>
      <v-alert style="position: fixed; top: 70px; z-index: 20; width: 95%; margin-left: 12px;" color ="" type="success" v-model="notYetAlert" transition="slide-y-transition">
        このルームが未達成されました。
      </v-alert>
      <div class="mind_map_save">
        <v-icon @click="notYet" class="mr-2" color="info" v-if="room.done == true">mdi-checkbox-marked-circle</v-icon>
        <v-icon @click="done" class="mr-2" v-else>mdi-checkbox-marked-circle-outline</v-icon>
        <v-btn small color="info" @click="save">SAVE</v-btn>
      </div>
        <Mindmap class="mindmap" @click="complete = ''" :download="false" :strokeWidth="3" :ySpacing='40' :fitView="false"  v-model="contents"></Mindmap>
    </div>
</template>
<script>
import { VueLoading } from 'vue-loading-template';
import Mindmap from '@hellowuxin/mindmap'
export default {
  components: {
    Mindmap,
    VueLoading,
  },
  data(){
    return {
      contents: [{}],
      room: [],
      room_id: this.$route.params.id,

      saveAlert: false,
      doneAlert: false,
      notYetAlert: false,
      loading: true,
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
        this.loading = false
      });
  },
  methods: {
    async done() {
      this.loading = true
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
        this.loading = false
        this.doneAlert = true
      });
    },
    async notYet() {
      this.loading = true
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
        this.loading = false
        this.notYetAlert = true
      });
    },
    save(){
      this.loading = true
      const params = {
        room_id: this.$route.params.id,
        content: this.contents
      }
      this.$axios.$patch(`api/contents/${this.$route.params.id}`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(this.saveAlert = true, this.loading = false)
      
    },

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

<style>
@keyframes fadeIn {
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}
.loading{
  position: fixed;
  top: 0;
  bottom:0;
  right:0;
  left:0;
  background: rgba(255, 255, 255, 0.199);
  z-index: 100;
}
.loading_inner{
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translate(50%,50%);
}
.loading_inner_text{
  margin: 0;
  animation: fadeIn infinite alternate 2s;
}
.loading_inner_mark{
  
}
.mindmap{
  height: calc(100vh - 56px) !important;
  font-weight: bold !important;
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  width: 100vw !important;
}
.mind_map_save{
  position: fixed;
  top: 56px; 
  left: 0;
  display: flex; 
  align-items: center; 
  padding: 10px;  
  z-index: 2; 
}

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

@media (min-width: 960px){
  .mindmap{
    height: calc(100vh - 64px)!important;
    width: 100vw !important;
  }
  .mind_map_save{
    position: fixed;
    top: 64px; 
    left: 0;
    display: flex; 
    align-items: center; 
    padding: 10px;  
    z-index: 2;  
  }
}

</style>