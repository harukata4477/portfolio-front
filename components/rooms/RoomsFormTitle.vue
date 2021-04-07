<template>
  <v-text-field
    v-model="setTitle"
    :rules="rules"
    outlined
    placeholder="目標"
  />
</template>

<script>
export default {
   props: {
    title: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      rules: [
        v => !!v || '',
      ]
    }
  },
  computed: {
    setTitle: {
      get () { return this.title },
      set (newVal) { return this.$emit('update:title', newVal) }
    },
  }
}
</script>