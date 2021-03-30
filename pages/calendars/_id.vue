<template>
  <v-row>
    <v-col>
      <v-sheet >
        <div class="plan_header" style="display: flex; justify-content: space-between; align-items: center; margin: 5px 0;">
          <p class="pie-graph_title" style="display: inline-block; font-weight: bold; border-bottom: solid 1px #333; margin: 10px">1日の予定</p>

          <div style="display: inline-block; margin: 10px 0 10px auto;">
            <v-dialog
              v-model="submitForm"
              persistent
              max-width="600"
            >
              <template v-slot:activator="{ on, attrs }">
                <button
                  dark
                  v-bind="attrs"
                  v-on="on"
                  class="button"
                  style="font-size: 12px;"
                >
                  <v-icon style="font-size: 15px;">mdi-calendar-plus</v-icon>
                  新規登録
                </button>
              </template>
              <v-card>
                <v-card-title class="headline">
                  新規登録
                </v-card-title>
                
                <v-card-text>
                  <v-container>
                    <v-row>

                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          label="予定"
                          required
                          v-model="new_name"
                        ></v-text-field>
                      </v-col>

                      <p style="width: 100%; margin-bottom: -20px;">日付</p>
                      <v-col cols="12">
                        <v-menu
                          v-model="new_menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="new_day"
                              label="日付"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="new_day"
                            @input="new_menu = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>


                      <p style="width: 100%; margin-bottom: -20px;">時間</p>          
                      <v-col
                        cols="6"
                        sm="5"
                      >
                        <v-menu
                          ref="new_menu2"
                          v-model="new_menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="new_start_time"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="new_start_time"
                              label="開始時間"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="new_menu2"
                            v-model="new_start_time"
                            full-width
                            @click:minute="$refs.new_menu2.save(new_start_time)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>

                      <v-col
                        cols="6"
                        sm="5"
                      >
                        <v-menu
                          ref="new_menu3"
                          v-model="new_menu3"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="new_end_time"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="new_end_time"
                              label="終了時間"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="new_menu3"
                            v-model="new_end_time"
                            full-width
                            @click:minute="$refs.new_menu3.save(new_end_time)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>

                      <v-row class="mb-5" style="align-items: center; width: 100%; color: rgba(0, 0, 0, 0.6);">
                        <v-checkbox
                          v-model="new_done"
                          style="display: flex; align-items: center; margin-left: 20px;"
                        ></v-checkbox>
                        <p style="margin-bottom: 0; display: flex; align-items: center;">完了</p>
                      </v-row>

                      <v-select
                        v-model="new_color"
                        item-text="value"
                        item-value="value"
                        :items="colors"
                        label="背景色"
                      />

                      <span :style="`background-color: ${new_color}; width: 10px; height: 10px; border-radius: 100%;`"></span>


                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="submitForm = false"
                  >
                    閉じる
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="create"
                  >
                    更新
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>

        <v-calendar
          ref="calendar"
          :now="today"
          :value="today"
          :events="events"
          color="primary"
          type="day"
          style="border-bottom: solid 1px #e0e0e0; height: calc(100vh - 180px);"
          @click:event="showEvent"
        ></v-calendar>
        <v-col cols="12">
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card
              color="grey lighten-4"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >

                <v-icon class="mr-3">mdi-pencil</v-icon>
 
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                
                <v-icon v-show="done == true">mdi-check-circle</v-icon>
              
                <v-icon v-show="done == false">mdi-check-circle-outline</v-icon>

              </v-toolbar>
              <v-card-text>
                <p class="mb-0">編集</p>
                <v-card-text>
                  <v-container>
                    <v-row>

                      <v-col
                        cols="12"
                      >
                        <v-text-field
                          label="予定"
                          required
                          v-model="name"
                        ></v-text-field>
                      </v-col>

                      <p style="width: 100%; margin-bottom: -20px;">日付</p>
                      <v-col cols="12">
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="day"
                              label="日付"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="day"
                            @input="menu = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>


                      <p style="width: 100%; margin-bottom: -20px;">時間</p>          
                      <v-col
                        cols="6"
                        sm="5"
                      >
                        <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="start_time"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="start_time"
                              label="開始時間"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menu2"
                            v-model="start_time"
                            full-width
                            @click:minute="$refs.menu2.save(start_time)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>

                      <v-col
                        cols="6"
                        sm="5"
                      >
                        <v-menu
                          ref="menu3"
                          v-model="menu3"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="end_time"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="end_time"
                              label="終了時間"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menu3"
                            v-model="end_time"
                            full-width
                            @click:minute="$refs.menu3.save(end_time)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>

                      <v-row class="mb-5" style="align-items: center; width: 100%; color: rgba(0, 0, 0, 0.6);">
                        <v-checkbox
                          v-model="done"
                          style="display: flex; align-items: center; margin-left: 20px;"
                        ></v-checkbox>
                        <p style="margin-bottom: 0; display: flex; align-items: center;">完了</p>
                      </v-row>

                      <v-select
                        v-model="color"
                        item-text="value"
                        item-value="value"
                        :items="colors"
                        label="背景色"
                      />

                      <span :style="`background-color: ${color}; width: 10px; height: 10px; border-radius: 100%;`"></span>


                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="blue darken-1"
                    @click="selectedOpen = false"
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

              </v-card-text>
            </v-card>
          </v-menu>
        </v-col>
      </v-sheet>
    </v-col>

  </v-row>
</template>

<script>
export default {
  data () {
    return {
      today: this.$route.params.id,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events:[],

      id: '', 
      name: '', 
      day: '',
      start_time: '',
      end_time: '',
      done: false,
      color:'',

      new_name: '', 
      new_day: '',
      new_start_time: '',
      new_end_time: '',
      new_done: false,
      new_color:'',

      colors:[ {value: 'orange'}, {value: 'green'}, {value: 'blue'}, {value: 'grey'} ],

      menu: false,
      menu2: false,
      menu3: false,
      new_menu: false,
      new_menu2: false,
      new_menu3: false,
      onComplete: '',
      submitForm: false,
    }
  },
  created () {
    this.new_day = this.$route.params.id
    this.index()
  },
  mounted () {
    this.$refs.calendar.scrollToTime('08:00')
  },
  methods: {
    async index(){
      await this.$axios.$get(`api/calendars/${this.$route.params.id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        this.events = []
        for(let i = 0; i < res.data.length; i++){ 

          var start = res.data[i].attributes.start.replace( /T/g , " ").replace( /.000Z/g , "")
          var end = res.data[i].attributes.end.replace( /T/g , " ").replace( /.000Z/g , "")

          if(res.data[i].attributes.done == true){
            var color = 'black'

            this.events.push({
              id: res.data[i].attributes.id,
              name: res.data[i].attributes.name,
              color: color,
              first_color: res.data[i].attributes.color,
              start: start,
              end: end,
              done:res.data[i].attributes.done,
            })
          } else {
            this.events.push({
              id: res.data[i].attributes.id,
              name: res.data[i].attributes.name,
              color:res.data[i].attributes.color,
              start: start,
              end: end,
              done:res.data[i].attributes.done,
            })
          }
        }
      })
    },

    async create(){
      const params = {
        name: this.new_name,
        start: this.new_day + ' ' + this.new_start_time,
        end: this.new_day + ' ' + this.new_end_time,
        done: this.new_done,
        color: this.new_color,
      }
      await this.$axios.$post(`api/calendars/`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
      this.index()
      this.new_name = ''
      this.new_day = ''
      this.new_start_time = ''
      this.new_day = ''
      this.new_end_time = ''
      this.new_done = ''
      this.new_color = ''
      this.submitForm = false
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        var start_day = new Date(event.start)
        var end_day = new Date(event.end)
        var day = start_day.getFullYear() + '-' + (start_day.getMonth() + 1) + '-' + start_day.getDate()
        var start_time = start_day.getHours() + ':' + start_day.getMinutes()
        var end_time = end_day.getHours() + ':' + end_day.getMinutes()
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target

        this.id = this.selectedEvent.id, 
        this.name = this.selectedEvent.name, 
        this.day = day,
        this.start_time =start_time,
        this.end_time = end_time,
        this.done = this.selectedEvent.done
        if(this.selectedEvent.done == true){
          this.color = this.selectedEvent.first_color
        }else{
          this.color = this.selectedEvent.color
        }
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    async edit(){
      const params = {
        name: this.name,
        start: this.day + ' ' + this.start_time,
        end: this.day + ' ' + this.end_time,
        done: this.done,
        color: this.color,
      }
      await this.$axios.$patch(`api/calendars/${this.id}`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        // window.location.href = `/calendars/${this.$route.params.id}`
      })

      this.index()
      this.selectedOpen = false
    }
  }
}
</script>

<style>
.button{
  padding:4px 8px;
  margin-right:8px;
  border: solid 1px #eee;
  border-radius: 10px; 
  box-shadow: 0.3px 0.3px 0.3px 0.3px #eee;
}
.button:hover{
  box-shadow: unset;
}
.v-calendar .v-event-timed{
  white-space: break-spaces !important;
}
</style>