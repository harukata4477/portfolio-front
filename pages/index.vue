<template>
  <div>
    <v-btn @click="add_text">追加</v-btn>
    <p>{{add}}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      add:[]
    }
  },
  // created() {
  
  // },
  methods:{
    async add_text() {
      await this.$axios.get('api/hello').then(res => {
        this.add.push(res.data)
      })
    },
  }
}
</script>