<template>
    <div class="college mt-0 mb-0 ml-0 mr-0">
      <mindmap class="full_page" :params="$route.params.id" />
      <v-icon class="help" color="gray" @click="$router.push('/help/')">mdi-help-circle</v-icon>
    </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
import mindmap from '~/components/Mindmap'

export default {
  components: {
    mindmap,
    VueLoading,
  },
}
</script>

<style>
.full_page{
  height: 100vh !important;
  font-weight: bold !important;
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  width: 100vw !important;
}

.menu-item:nth-child(1) div{
  font-size: 0px;
}
.menu-item:nth-child(1) div:before{
  font-size: 12px;
  content: '削除';
}
.menu-item:nth-child(2) div{
  font-size: 0px;
}
.menu-item:nth-child(2) div:before{
  font-size: 12px;
  content: '折りたたむ';
}
.menu-item:nth-child(3) div{
  font-size: 0px;
}
.menu-item:nth-child(3) div:before{
  font-size: 12px;
  content: '展開';
}
.help{
  position: fixed !important;
  bottom: 10px !important;
  right: 10px !important;
  z-index: 10 !important;
}

@media (min-width: 960px){
}

</style>