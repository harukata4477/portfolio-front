<template>
  <v-col cols="6" class="pb-0 pt-0 pl-0 pr-1">
    <v-menu
      v-model="isValid"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="setDate"
          label="日付"
          outlined
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="setDate"
        @input="isValid = false"
      ></v-date-picker>
    </v-menu>
  </v-col>
</template>

<script>
export default {
   props: {
    date: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      isValid: false,
    }
  },
  computed: {
    setDate: {
      get () { return this.date },
      set (newVal) { return this.$emit('update:date', newVal) }
    },
  }
}
</script>