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

      
        <Mindmap style="height: 80vh;" :keyboard="false" :nodeClick="false" :showUndo="false" :showNodeAdd="false" :contextMenu="false" :download="false" :strokeWidth="1" :fitView="false"  v-model="contents"></Mindmap>
      
    </v-dialog>
  </div>
</template>

<script>
import Mindmap from '@hellowuxin/mindmap'
export default {
  props: {
    contents:{
      type: Array,
      default: () => [],
    }
  },
  components: {
    Mindmap,
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