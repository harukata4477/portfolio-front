<template>
 <div class="content">

    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

    <v-alert class="alert" type="error" v-model="submitAlert" transition="slide-y-transition">
      ログインが必要になります。
    </v-alert>

  <div class="content_inner">
    <div class="content_inner_title">
      <h2>カレンダー{{ displayDate }}</h2>
      <v-spacer></v-spacer>
      <v-icon class="mb-1" color="gray" @click="$router.push('/help/')">mdi-help-circle</v-icon>
    </div>

    <div class="button-area">
      <div>
        <button @click="prevMonth(currentMonth)" class="button">前の月</button>
        <button @click="nextMonth(currentMonth)" class="button">次の月</button>
      </div>

      <div class="content_create_form">
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
            >
              <v-icon class="content_create_form_icon">mdi-calendar-plus</v-icon>
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
                      v-model="name"
                    ></v-text-field>
                  </v-col>
                  <p class="content_create_form_title">日付</p>
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

                  <p class="content_create_form_title">時間</p>          
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

                  <v-col cols="6" sm="5">
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

                  <v-row class="content_create_form_checkbox mb-5 ml-3">
                    <v-checkbox v-model="done" ></v-checkbox>
                    <p>完了</p>
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

      <div class="calendar">
        <div class="calendar-weekly">
          <div class="calendar-youbi" v-for="n in 7" :key="n">
            {{ youbi(n-1) }}
          </div>
        </div>
        <div 
          class="calendar-weekly"
          v-for="(week, index) in calendars"
          :key="index"
        >
          <div
            class="calendar-daily"
            :class="{outside: currentMonth !== day.month}"
            v-for="(day, index) in week"
            :key="index"
            @click="current(day.month + '-' + day.day)"
          >
            <div class="calendar-day">
              {{ day.day }}
            </div>
            <div v-for="dayEvent in day.dayEvents" :key="dayEvent.id" >
              <div 
                @click="current"
                class="calendar-event"
                :style="`background-color:${dayEvent.color}; font-weight: bold; overflow: scroll;`"
              >
                {{ dayEvent.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
import moment from "moment";
export default {
  components:{
    VueLoading
  },
  data() {
    return {
      name: '',
      done: false,
      start: '',
      end: '',
      id: 0,
      color: '',

      colors:[ {value: 'orange'}, {value: 'green'}, {value: 'blue'}, {value: 'grey'} ],
      day: '',
      start_time: '',
      end_time: '',
      today:'',
      
      currentDate: moment(),
      events:[],

      menu: false,
      menu2: false,
      menu3: false,
      submitForm: false,
      loading: true,
      load_judge: false,
      submitAlert: false,
    };
  },

  created() {
    if(localStorage.getItem('id')){

    }else{
      this.$router.push('/')
    }
    var date = new Date()
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = 1
    this.today = year + '-' + month + '-' + day
    
    this.index()
  },

  methods: {
    async index(){
      this.loading = true
      this.$axios.$get(`api/calendars/show_month/${this.today}/`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        for (let i = 0; i < res.data.length; i++){
          var start = res.data[i].attributes.start
          var end = res.data[i].attributes.end
          var start_time = res.data[i].attributes.start_time
          var end_time = res.data[i].attributes.end_time
          start = start.replace( /-/g , "/").replace( /T/g , " ").replace( /.000Z/g , "")
          end = end.replace( /-/g , "/").replace( /T/g , " ").replace( /.000Z/g , "")
          if(res.data[i].attributes.done == true){
            this.events.push({
              id: res.data[i].attributes.id,
              name:res.data[i].attributes.name,
              color: 'black',
              user_id: res.data[i].attributes.user_id,
              start: start,
              end: end,
              start_time: start_time,
              end_time: end_time,
              done: res.data[i].attributes.done,
            })
          }else{
            this.events.push({
              id: res.data[i].attributes.id,
              name:res.data[i].attributes.name,
              color: res.data[i].attributes.color,
              user_id: res.data[i].attributes.user_id,
              start: start,
              end: end,
              start_time: start_time,
              end_time: end_time,
              done: res.data[i].attributes.done,
            })
          }
        }
        this.name = ''
        this.day = ''
        this.start_time = ''
        this.end_time = ''
        this.done = ''
        this.color = ''
        this.loading = false
      }).catch(
        this.submitForm = false,
        this.load_judge = true
      )
    },

    current(day){
      this.$router.push(`/calendars/${day}`)
    },

    async create(){
      if(localStorage.getItem('X-Access-Token')){
        this.loading = true
        const params = {
          name: this.name,
          start: this.day + ' ' + this.start_time,
          end: this.day + ' ' + this.end_time,
          done: this.done,
          color: this.color,
        }
        await this.$axios.$post(`api/calendars/`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(this.events = [])
          this.index()
      }else{
        this.submitForm = false
        this.submitAlert = true
      }
    },

    getStartDate() {
      let date = moment(this.currentDate);
      date.startOf("month");
      const youbiNum = date.day();
      return date.subtract(youbiNum, "days");
    },

    getEndDate() {
      let date = moment(this.currentDate);
      date.endOf("month");
      const youbiNum = date.day();
      return date.add(6 - youbiNum, "days");
    },

    getCalendar() {
      let startDate = this.getStartDate();
      const endDate = this.getEndDate();
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

      let calendars = [];
      let calendarDate = this.getStartDate();
      for (let week = 0; week < weekNumber; week++) {
        let weekRow = [];
        for (let day = 0;  day < 7; day++) {
          let dayEvents = this.getDayEvents(calendarDate)
          weekRow.push({
            day: calendarDate.get("date"),
            month: calendarDate.format("YYYY-MM"),
            dayEvents
          });
          calendarDate.add(1, "days");
        }
        calendars.push(weekRow);
      }
      return calendars;
    },

    nextMonth() {
      this.loading = true
      this.currentDate = moment(this.currentDate).add(1, "month");
      var date = new Date(this.currentDate)
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = 1
      this.today = year + '-' + month + '-' + day
      this.events = []
      this.index()
    },

    prevMonth(month) {
      this.loading = true
      this.currentDate = moment(this.currentDate).subtract(1, "month");
      var date = new Date(this.currentDate)
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = 1
      this.today = year + '-' + month + '-' + day
      this.events = []
      this.index()
    },

    youbi(dayIndex) {
      const week = ["日", "月", "火", "水", "木", "金", "土"];
      return week[dayIndex];
    },

    getDayEvents(date){
      return this.events.filter(event => {
        let startDate = moment(event.start).format('YYYY-MM-DD')
        let endDate = moment(event.end).format('YYYY-MM-DD')
        let Date = date.format('YYYY-MM-DD')
        if(startDate <= Date && endDate >= Date) return true;
      });
    }
  },

  computed: {
    calendars() {
      return this.getCalendar();
    },
    displayDate(){
      return this.currentDate.format('YYYY[年]M[月]')
    },
    currentMonth(){
      return this.currentDate.format('YYYY-MM')
    },
  },

  watch: {
    load_judge (val) {
      val && setTimeout(() => {
        this.load_judge = false
        this.loading = false
      }, 500)
    },
    submitAlert (val) {
      val && setTimeout(() => {
        this.submitAlert = false
      }, 2000)
    },
  },
}
</script>

<style scoped>
.content{
  margin: 0 auto;
  max-width:900px;
  padding: 0 1px;
}
.content_inner{
  font-size:0.8em; 
  padding-top: 10px;
}
.content_inner_title{
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin: 15px 0 10px;
}
.content_inner_title h2{
  display: inline-block; 
  margin: 0; 
  font-weight: bold;
}
.button-area{
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
}
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
.content_create_form{
  display: inline-block;
}
.content_create_form_icon{
  font-size: 15px;
}
.content_create_form_title{
  width: 100%; 
  margin-bottom: -20px;
}
.content_create_form_checkbox{
  align-items: center; 
  width: 100%; 
  color: rgba(0, 0, 0, 0.6);
}
.content_create_form_checkbox input{
  display: flex; 
  align-items: center; 
  margin-left: 20px;
}
.content_create_form_checkbox p{
  margin-bottom: 0; 
  display: flex; 
  align-items: center;
}

.calendar{
  max-width: 900px;
  border-top: 1px solid #E0E0E0;
  font-size: 0.8em;
}
.calendar-weekly{
  display: flex;
  border-left: 1px solid #E0E0E0;
}
.calendar-daily{
  flex:1;
  height: calc((100vh - 240px) / 5);
  overflow-y: scroll;
  overflow-x: hidden;
  border-right: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  margin-right: -1px;
}
.calendar-day{
  text-align: center;
}
.calendar-youbi{
  flex:1;
  border-right:1px solid #E0E0E0;
  margin-right:-1px;
  text-align:center;
}
.outside{
  background-color: #f7f7f7;
}
.calendar-event{
  color:white;
  margin-bottom:1px;
  height:25px;
  line-height:25px;
  border-radius: 5px;
}
@media (min-width: 960px){
  .calendar-daily{
    height: calc((100vh - 200px) / 5);
  }
}
</style>