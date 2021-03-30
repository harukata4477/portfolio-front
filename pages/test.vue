<template>
  <div>
    <calendars />
  </div>
</template>

<script>
import Calendars from '../components/calendars/Calendars.vue'
export default {
  components: { Calendars },
  data () {return{
    test: [],
    date: '',
  }},
  methods: {
    add(){
      this.$axios.get(`api/hello`).then(res=>this.test.push(res))
    },
    change(){
      this.test.push(Math.random().toString(32).substring(2))
    }
  },
  created () {

  }
}
</script>