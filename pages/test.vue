<template>
  <div>
    <v-btn @click="add">ボタン</v-btn>
    {{test}}
    {{date}}
  </div>
</template>

<script>
export default {
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