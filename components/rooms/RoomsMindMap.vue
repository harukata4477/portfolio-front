<template>
  <div class="mind_map">
    <Mindmap class="mindmap" style="height: 70vh" :zoomable="judge" :draggable="false" :keyboard="false" :nodeClick="false" :showUndo="false" :showNodeAdd="false" :contextMenu="false" :download="false" :strokeWidth="2" :ySpacing='40' :fitView="false" v-model="contents"></Mindmap>
    <div class="mind_map_move">
      <v-icon @click="judge = !judge" v-if="judge" color="info">mdi-cursor-default</v-icon>
      <v-icon @click="judge = !judge" v-else color="info">mdi-cursor-default-outline</v-icon>
    </div>
  </div>
</template>

<script>
import Mindmap from '@hellowuxin/mindmap'
export default {
  props:{
    contents:{
      type: Array,
      required: true,
      default: () => []
    }
  },
  data(){
    return {
      judge: false,
    }
  },
  components: {
    Mindmap,
  },
}
</script>

<style scoped>
.mind_map{
  position: relative;
  font-weight: bold;
}
.mind_map_move{
  position: absolute;
  right: 5px;
  bottom: 40px;
}
</style>