<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      class="mr-0 ml-0"
      style="position: relative;"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="transparent"
          v-bind="attrs"
          v-on="on"
          fab
          filled
          rounded
          dense
          elevation="0"
          small
          style="position:absolute; bottom: 35px; right: -2px; z-index: 20;"
        >
          <v-icon color="primary">mdi-arrow-expand-all</v-icon>
        </v-btn>
      </template>

      <mindmap />
      
    </v-dialog>
  </div>
</template>

<script>
import mindmap from '~/components/Mindmap'
export default {
  props: {
    contents:{
      type: Array,
      default: () => [],
    }
  },
  components: {
    mindmap,
  },
  data(){
    return {
      contents: [{}],
      dialog: false,
    }
  },
  created() {

  }
  
}
</script>

