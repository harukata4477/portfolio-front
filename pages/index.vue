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
    <v-footer width="100%" style="background-color: rgba(0, 126, 255); position: fixed;  bottom: 0; left: 0; padding: 12px 0; z-index: 2;">
      <bottom-menu />
    </v-footer>
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
