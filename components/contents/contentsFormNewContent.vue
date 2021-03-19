<template>
  <v-text-field
    v-model="setNewContent"
    :rules="rules"
    outlined
  />
</template>

<script>
export default {
   props: {
    newContent: {
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
    setNewContent: {
      get () { return this.newContent },
      set (newVal) { return this.$emit('update:newContent', newVal) }
    },
  }
}
</script>