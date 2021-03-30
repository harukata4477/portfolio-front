<template>
 <div>
   <div style="font-size:0.8em; margin: 0 auto 40px auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
      <h2 style="display: inline-block; margin: 0; font-weight: bold;">カレンダー{{ displayDate }}</h2>
    </div>

      <div class="button-area">
        <div>
          <button @click="prevMonth" class="button">前の月</button>
          <button @click="nextMonth" class="button">次の月</button>
        </div>

        <div style="display: inline-block;">
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
import moment from "moment";
export default {
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
      
      currentDate: moment(),
      events:[],

      menu: false,
      menu2: false,
      menu3: false,
      submitForm: false,
    };
  },
  created() {
    this.$axios.$get(`api/calendars/`, {
      headers:{
        'X-Access-Token': localStorage.getItem('X-Access-Token')
      }
    }).then(res => {
      for (let i = 0; i < res.data.length; i++){
        if(res.data[i].attributes.done == true){
          this.events.push({
            id: res.data[i].attributes.id,
            name:res.data[i].attributes.name,
            color: 'black',
            user_id: res.data[i].attributes.user_id,
            start: res.data[i].attributes.start,
            end: res.data[i].attributes.end,
            start_time: res.data[i].attributes.start_time,
            end_time: res.data[i].attributes.end_time,
            done: res.data[i].attributes.done,
          })
        }else{
          this.events.push({
            id: res.data[i].attributes.id,
            name:res.data[i].attributes.name,
            color: res.data[i].attributes.color,
            user_id: res.data[i].attributes.user_id,
            start: res.data[i].attributes.start,
            end: res.data[i].attributes.end,
            start_time: res.data[i].attributes.start_time,
            end_time: res.data[i].attributes.end_time,
            done: res.data[i].attributes.done,
          })
        }
      }
    })
  },
  methods: {
    current(day){
      this.$router.push(`/calendars/${day}`)
    },
    async create(){
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
        await this.$axios.$get(`api/calendars/`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          for (let i = 0; i < res.data.length; i++){
            if(res.data[i].attributes.done == true){
              this.events.push({
                id:res.data[i].attributes.id,
                name:res.data[i].attributes.name,
                color: 'black',
                user_id: res.data[i].attributes.user_id,
                start: res.data[i].attributes.start,
                end: res.data[i].attributes.end,
                start_time: res.data[i].attributes.start_time,
                end_time: res.data[i].attributes.end_time,
                done: res.data[i].attributes.done,
              })
            }else{
              this.events.push({
                id: res.data[i].attributes.id,
                name:res.data[i].attributes.name,
                color: res.data[i].attributes.color,
                user_id: res.data[i].attributes.user_id,
                start: res.data[i].attributes.start,
                end: res.data[i].attributes.end,
                start_time: res.data[i].attributes.start_time,
                end_time: res.data[i].attributes.end_time,
                done: res.data[i].attributes.done,
              })
            }
          }
        })
        this.submitForm = false
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
      this.currentDate = moment(this.currentDate).add(1, "month");
    },
    prevMonth() {
      this.currentDate = moment(this.currentDate).subtract(1, "month");
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
}
</script>

<style scoped>
.content{
  margin:2em auto;
  width:900px;
}
.button-area{
  margin:0.5em 0;
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
.calendar{
  max-width:900px;
  border-top:1px solid #E0E0E0;
  font-size:0.8em;
}
.calendar-weekly{
  display:flex;
  border-left:1px solid #E0E0E0;
}
.calendar-daily{
  flex:1;
  height:13vh;
  overflow: scroll;
  border-right:1px solid #E0E0E0;
  border-bottom:1px solid #E0E0E0;
  margin-right:-1px;
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
</style>