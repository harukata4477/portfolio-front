<template>
  <v-text-field
    v-model="setTitle"
    :rules="rules"
    label="タイトル"
    outlined
  />
</template>

<script>
export default {
   props: {
    title: {
      type: String,
      required: true,
      default: '',
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