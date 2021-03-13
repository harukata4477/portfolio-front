<template>
  <v-col
    cols="6"
    class="pb-0 pt-0 pl-1 pr-0"
  >
    <v-menu
      ref="isValid"
      v-model="isValid"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="setTime"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="setTime"
          label="time"
          readonly
          outlined
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="isValid"
        v-model="time"
        full-width
        @click:minute="$refs.isValid.save(setTime)"
      ></v-time-picker>
    </v-menu>
  </v-col>
</template>

<script>
export default {
   props: {
    time: {
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
    setTime: {
      get () { return this.time },
      set (newVal) { return this.$emit('update:time', newVal) }
    },
  }
}
</script>