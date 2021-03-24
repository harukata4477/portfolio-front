<template>
  <v-text-field
    v-model="setTagList"
    label="タグ"
    outlined
  />
</template>

<script>
export default {
   props: {
    tag_list: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
    }
  },
  computed: {
    setTagList: {
      get () { return this.tag_list },
      set (newVal) { return this.$emit('update:tag_list', newVal) }
    },
  }
}
</script>