<template>
  <div>
    <v-btn
      name="button"
      type="button"
      @click="getMsg"
    >
    api取得
    </v-btn>
    <div v-for="(msg, i) in msgs" :key="i">
      {{ msg }}
    </div>
    {{respo}}
  </div>
</template>

<script>

export default {
  data(){
    return {
      msgs:[],
      respo: []
    }
  },created(){
    this.$axios.get('home/1', {
      headers:{
        'X-Access-Token': localStorage.getItem('X-Access-Token')
      }
    }).then(res => {
      // localStorage.setItem("X-Access-Token", res.headers['x-access-token']);
      this.respo = res
    })
  },

  methods:{
    getMsg(){
      this.$axios.$get('/api/hello', {
      headers:{
        'X-Access-Token': localStorage.getItem('X-Access-Token')
      }
    }).then(res => {
      // localStorage.setItem("X-Access-Token", res.headers['x-access-token']);
      this.msgs.push(res)
      })
    }
  }
}
</script>
