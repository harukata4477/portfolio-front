<template>
  <v-row>
    <v-col>
      <p class="pie-graph_title" style="display: inline-block; font-weight: bold; border-bottom: solid 1px #333; margin: 20px 0 20px 0 0;">今日の予定</p>
      <v-sheet height="330">
        <v-calendar
          ref="calendar"
          :now="today"
          :value="today"
          :events="events"
          color="primary"
          type="day"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
      today: '',
      events:[],
    }
  },
  created () {
    var today = new Date()

    var year = today.getFullYear();
    var month = today.getMonth() + 1 ;
    var day = today.getDate();
    this.today = year + '-' + month + '-' + day

    this.$axios.$get(`api/plans/${this.today}`, {
      headers:{
        authorization: localStorage.getItem('access-token')
      }
    }).then(res => {
      for(let i = 0; i < res.start_days.length; i++){
        this.events.push(res.start_days[i])
      }
    })
  },
  mounted () {
    this.$refs.calendar.scrollToTime('08:00')
  },
}
</script>