<template>
  <div style="height: calc(100vh - 120px) overflow: scroll;">
    <div class="plan_header mt-1" style="display: flex; align-items: center; justify-content: space-between; height: 40px; border-bottom: solid 2px #eee;">
      <div class="plan_header_left" style="width: 40%; overflow: scroll; height: 58px; display: flex; flex-wrap: wrap; align-items: center;">
        <!-- <p style="width: 100%; overflow: scroll; margin: 0; font-size:15px; font-weight: bold;">メインコンテント</p>
        <p style="width: 100%; overflow: scroll; margin: 0; font-size:10px; font-weight: bold;">全体達成率:&nbsp;{{ resultDone }}%</p> -->


      </div>
      <div class="plan_header_right" style="display: flex;">

      <v-row justify="center" style="margin: 0;">
        <v-dialog
          v-model="roomEditForm"
          persistent
          max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="transparent"
              depressed
              fab
              small
              class="mb-4"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-home
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              編集
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                text
                @click="roomDelete"
                medium
              >
                削除
              </v-btn>
            </v-card-title>
            
            <v-card-text class="pb-0">
              <v-container>
                <v-row>

              <v-form
                v-model="isValid"
                ref="form"
              >
                <div style="display: flex; flex-wrap: wrap;">
                  <v-card-text class="pb-1 pt-0 pl-0 pr-0">
                    <p class="grey--text mb-0">目標</p>
                  </v-card-text>
                  <rooms-form-title :title.sync="title" />
                  <v-card-text class="pb-1 pt-0 pl-0 pr-0">
                    <p class="grey--text mb-0">目標達成日時</p>
                  </v-card-text>
                  <rooms-form-deadline-date :date.sync="date" />
                  <rooms-form-deadline-time :time.sync="time" />
                </div>
              </v-form>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="roomEditForm = false"
              >
                閉じる
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="roomEdit"
              >
                更新
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>


        <v-btn
          color="transparent"
          depressed
          fab
          small
          class="ml-1 mb-4"
        >
          <v-icon>
            mdi-book-open-variant
          </v-icon>
        </v-btn>

        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="transparent"
                v-bind="attrs"
                v-on="on"
                depressed
                fab
                small
                class="mb-4"
              >
                <v-icon color="black">mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                link
              >
                <v-list-item-title><v-icon class="mr-1" small>{{ item.icon }}</v-icon>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        


    </div>
  </div>


{{title}}
{{date}}
{{time}}
  <div class="plan_current" style="display: flex; align-items: center; justify-content: space-between; height: 60px; border-bottom: solid 2px #eee; padding: 0 10px;">
    <div class="plan_current_left" style="height: 45px; width: 50%; overflow: scroll; display: flex; flex-wrap: wrap; align-itms:center;">
      <p style="margin: 0; font-size:12px; font-weight: bold; width: 100%;">選択中:&nbsp;{{target}}</p>
    </div>
    <div class="plan_current_right" style="display: flex;">
      
      <v-row v-if="id > 0" justify="center" style="margin: 0;">
        <v-dialog
          v-model="editForm"
          persistent
          max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">

              <button
                color="primary"
                style="display: flex; align-items:center; margin-right: 10px; padding:  3px 3px; font-weight: bold; background: #007effbd; color: #fff; border-radius: 5px; box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%); font-size: 15px;"
                dark
                v-bind="attrs"
                v-on="on"
              >
              <v-icon style="color: #fff; font-size: 18px; margin-right: 2px;">mdi-pencil</v-icon>
                編集
              </button>

          </template>
          <v-card>
            <v-card-title class="headline">
              詳細・編集
            </v-card-title>
            
            <v-card-text>
              <v-container>
                <v-row>

                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      label="目標"
                      required
                      v-model="target"
                    ></v-text-field>
                  </v-col>

                  <v-row style="align-items: center;">
                    <v-checkbox
                      v-model="done"
                      style="display: flex; align-items: center; margin-left: 20px;"
                    ></v-checkbox>
                    <p style="margin-bottom: 5px;">:目標達成</p>
                  </v-row>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="editForm = false"
              >
                閉じる
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="edit"
              >
                更新
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <button
        color="primary"
        style="margin-right: 5px; display: flex; align-items:center; padding: 3px 3px; font-weight: bold; background: #007effbd; color: #fff; border-radius: 5px; box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%); font-size: 15px; cursor: pointer;"
        dark
        v-if="id > 0"
        @click="$router.push(`/contents/${id}`)"
      >
      <v-icon style="color: #fff; font-size: 18px; margin-right: 2px;">mdi-application</v-icon>
        詳細
      </button>

    </div>
  </div>

    <div class="rooms">
      <p @click="$router.push(`/rooms`)" class="rooms_title">{{room.goal}}<span v-if="resultDone == 100" class='done_bg' style="background: linear-gradient(to right,#ff000042, #ffa50045, #ffff0036, #00800038, #00ffff3b, #0000ff3d, #8000803b);"></span></p>
      <div class="rooms_inner">
        <div :class="`rooms_inner_content`" v-for="(target, i) in getTarget" :key="`target-${i}`" >
          <p class="rooms_inner_content_title" @click="current(i)">{{target.target}}<span v-if="target.done == true" class='done_bg'></span></p>
          <div v-for="(content, index) in contents" :key="`content-${index}`" class="rooms_inner_content_texts">
            <p v-if="content.target_id == target.id" class="rooms_inner_content_text">
              <span v-if="content.done" style="color: rgba(0, 126, 255, 0.74);">{{content.text}}</span>
              <span v-else>{{content.text}}</span>
            </p> 
          </div>
        </div>
      </div>
    </div>

    <div class="connctions">
      <p class="connctions_txt">リンク元:</p>
      <div class="connction" v-for="connction in connctions">
        <button class="connction_btn" @click="$router.push(`/contents/${connction.id}`)">{{connction.text}}</button>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data(){
    return{
      items: [{title:'追加', icon:'mdi-note-plus-outline'}, {title:'編集', icon:'mdi-pencil'}, {title:'詳細', icon:'mdi-sitemap'}, {title:'削除', icon:'mdi-delete'}],
      targets:[],
      room: '',
      connctions:[],

      contents: [],

      title: '',
      date: '',
      time: '',

      newTarget:'',

      target: '',
      done: false,
      id: 0,

      newText: '',
      target_id: 0,

      DoneAll: 0,
      trueDoneAll: 0,
      resultDone: 0,

      createForm: false,
      editForm: false,
      roomEditForm: false,
      contentForm: false,
      isValid: false,
    }
  },
  created() {
      this.$axios.$get(`api/rooms/${this.$route.params.id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        this.title = res.data.attributes.rooms.title

        var deadline = new Date(res.data.attributes.rooms.deadline)
        var year = deadline.getFullYear();
        var month = deadline.getMonth() + 1 ;
        var day = deadline.getDate();
        this.date = year + '-' + month + '-' + day

        this.time = deadline.getHours() + ':' + deadline.getMinutes()



        // this.$store.commit('setTargetList', res.targets)
        // this.room = res.room
        // this.targets = res.targets
        // this.connctions = res.contents

        // var targetDone = []
        // var trueCount = []
        // var items = res.targets
        // for (let i = 0; i < items.length; i++){
        //   targetDone.push(items[i].done)
        //   this.DoneAll = targetDone.length
        //   var dones = (items[i].done)
        //   if(dones == true){
        //     trueCount.push(dones)
        //     this.trueDoneAll = trueCount.length
        //   }

          // this.$axios.$get(`api/contents/${items[i].id}`, {
          //   headers:{
          //     'X-Access-Token': localStorage.getItem('X-Access-Token')
          //   }
          // }).then(res => {
          //   var contents = []
          //   contents.push(res.contents)
          //   for (let i = 0; i < contents.length; i++){
          //     var contentsAll = contents[i]
          //     for (let i = 0; i < contentsAll.length; i++){
          //       this.contents.push(contentsAll[i])
          //     }
          //   }
          // })
        })

        // this.resultDone = (this.trueDoneAll / this.DoneAll) * 100
        // this.resultDone = Math.round(this.resultDone)

        // if(isNaN(this.resultDone) == true){
        //   this.resultDone = 0
        // }
      },

  methods: {
    current(id){
      const current = this.targets[id]
      this.target = current.target
      this.done = current.done
      this.id = current.id
    },

    async roomEdit(){
      const params = {
        title: this.title,
        deadline: this.date + ' ' + this.time 
      }
      await this.$axios.$patch(`api/rooms/${this.$route.params.id}`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(
        this.$router.push('/rooms/')
      )
    },

    async roomDelete (){
      const confirmation = window.confirm("データが消えてしまいますが宜しいですか？");
      if (confirmation){
        await this.$axios.$delete(`api/rooms/${this.$route.params.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(
          this.$router.push('/rooms/')
        )
      }
    },

    async create(){
      const params = {
        target: this.newTarget,
        room_id: this.$route.params.id,
      }
      await this.$axios.$post('api/targets', params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
      await this.$axios.$get(`api/targets/${this.$route.params.id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        this.targets = res.targets

        var targetDone = []
        var trueCount = []
        var items = res.targets
        for (let i = 0; i < items.length; i++){
          targetDone.push(items[i].done)
          this.DoneAll = targetDone.length
          var dones = items[i].done
          if(dones == true){
            trueCount.push(dones)
            this.trueDoneAll = trueCount.length
          }
        }
        this.resultDone = (this.trueDoneAll / this.DoneAll) * 100
        this.resultDone = Math.round(this.resultDone)
      })
      this.$store.commit('setTargetList', this.targets)
      this.createForm = false
      this.newTarget = ''

      if(this.resultDone == 100){
        var room_params = {
          done: true,
        }
        this.$axios.$patch(`api/rooms/${this.$route.params.id}`, room_params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
      }else{
        var room_params = {
          done: false,
        }
        this.$axios.$patch(`api/rooms/${this.$route.params.id}`, room_params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
      }
    },

    async edit(){
      var params = {
        target: this.target,
        room_id: this.$route.params.id,
        done: this.done,
        id: this.id,
      }
        this.$axios.$patch(`api/targets/${this.id}`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(
          this.editForm = false,
        )
      for(let i = 0; i < 3; i++){
        await this.$axios.$get(`api/targets/${this.$route.params.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.targets = res.targets

          var targetDone = []
          var trueCount = []
          this.trueDoneAll = 0
          var items = res.targets
          for (let i = 0; i < items.length; i++){
            targetDone.push(items[i].done)
            this.DoneAll = targetDone.length
            var dones = items[i].done
            if(dones == true){
              trueCount.push(dones)
              this.trueDoneAll = trueCount.length
            }
          }
          this.resultDone = (this.trueDoneAll / this.DoneAll) * 100
          this.resultDone = Math.round(this.resultDone)
        })
        this.$store.commit('setTargetList', this.targets)
      }

      if(this.resultDone == 100){
        var params = {
          done: true,
        }
        this.$axios.$patch(`api/rooms/${this.$route.params.id}`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
      }else{
        var params = {
          done: false,
        }
        this.$axios.$patch(`api/rooms/${this.$route.params.id}`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
      }

    },

    async destroy(){
      const confirmation = window.confirm("本当に削除して良いのですか？");
      if (confirmation){
        this.$axios.$delete(`api/targets/${this.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(
        )
        for(let i = 0; i < 3; i++){
        await this.$axios.$get(`api/targets/${this.$route.params.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.targets = res.targets

          var targetDone = []
          var trueCount = []
          this.trueDoneAll = 0
          var items = res.targets
          for (let i = 0; i < items.length; i++){
            targetDone.push(items[i].done)
            this.DoneAll = targetDone.length
            var dones = (items[i].done)
            if(dones == true){
              trueCount.push(dones)
              this.trueDoneAll = trueCount.length
            }
          }
          this.resultDone = (this.trueDoneAll / this.DoneAll) * 100
          this.resultDone = Math.round(this.resultDone)
        })
        this.$store.commit('setTargetList', this.targets)
        }
        if(this.resultDone == 100){
          var params = {
            done: true,
          }
          this.$axios.$patch(`api/rooms/${this.$route.params.id}`, params, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          })
        }else{
          var params = {
            done: false,
          }
          this.$axios.$patch(`api/rooms/${this.$route.params.id}`, params, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          })
        }
      }
    },

  },
  computed: {
    getTarget() {
      return this.$store.state.target_list;
    },
  },
}
</script>


<style scoped>
header{
  display: none important;
}
.rooms{
  margin: 10px auto;
  position: relative;
  height: calc(100vh - 315px);
  overflow: scroll;
}
.rooms_title{
  border: solid 1px #333;
  display: table;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  font-weight: bold;
  background-color: #eee;
}
.rooms_title::after{
  border-right: solid 2px rgb(189, 188, 188);
  height: 20px;
  position: absolute;
  bottom: -20px;
  right: 50%;
  content: "";
}
.rooms_inner{
  margin: 0 auto;
  margin-top: 18px;
  text-align: center;
  position: relative;
  display: table;
  height: 50vh;
}
.rooms_inner_content{
  margin: 18px 0 50px 0;
  position: relative;
  display: inline-block;
  padding: 0 8px;
  vertical-align: top;
}
.rooms_inner_content_title{
  position: relative;
  margin: 0;
  border: solid 1px #333;
  padding: 6px;
  font-size: 13px;
  font-weight: bold;
  border-radius: 10px;
  text-align: center;
  width: 150px;
  word-break: break-all;
  cursor: pointer;
  background-color: #eee;
  transition: 0.2s;
}
.rooms_inner_content_title:hover{
  background-color: rgba(0, 126, 255, 0.1);
}
.done_bg{
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  background-color: rgba(0, 126, 255, 0.44);
  width:100%;
  height: 100%;
}
.rooms_inner_content::before{
  border-top: solid 2px rgb(189, 188, 188);
  height: 20px;
  width: 100%;
  position: absolute;
  top: -20px;
  right: 0;
  content: "";
}
.rooms_inner_content:first-child::before{
  border-top: solid 2px rgb(189, 188, 188);
  width: 100%;
  position: absolute;
  top: -20px;
  left: 50%;
  content: "";
}
.rooms_inner_content:last-child::before{
  border-top: solid 2px rgb(189, 188, 188);
  width: 100%;
  position: absolute;
  top: -20px;
  right: 50%;
  content: "";
}
.rooms_inner_content:first-child .rooms_inner_content_title::before{
  border-top: none;
  height: 0;
  width: 0;
  position: unset;
  top: 0;
  content: "";
}
.rooms_inner_content:last-child .rooms_inner_content_title::before{
  border-top: none;
  height: 0;
  width: 0;
  position: unset;
  top: 0;
  content: "";
}
.rooms_inner_content_title::after{
  border-right: solid 2px rgb(189, 188, 188);
  height: 20px;
  position: absolute;
  top: -20px;
  right: 50%;
  content: "";
}
.rooms_inner_content_text{
  display: flex;
  align-items: center;
  margin: 0;
  padding: 5px 10px 5px 20px;
  border-left: solid 2px rgb(189, 188, 188);
  border-bottom: solid 2px rgb(189, 188, 188);
  font-size: 10px;
  max-width: 140px;
  word-break: break-all;
  text-align: left;
}
.connctions{
  position: absolute;
  bottom: -60px;
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  background: #eee;
  width: 100%;
  padding: 0 5px;
  overflow: scroll;
}
.connctions_txt{
  font-size: 10px;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
}
.connction_btn{
  font-size: 12px;
  background: rgb(45, 142, 253);
  margin-right: 5px;
  color: #fff;
  font-weight: bold;
  padding: 3px 5px;
  border-radius: 10px;
  margin-bottom: 5px;
}
</style>