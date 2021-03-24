<template>
  <div class="post mt-3 mb-16">
    <div class="post_header">
      <h1 class="post_header_title display-1 mb-6">{{post.title}}</h1>

      <div class="post_header_left">
        <p color="gray" class="post_header_created_at grey--text"><v-icon class=" mr-1 grey--text" x-small>mdi-autorenew</v-icon>{{post.updated_at}}</p>
        <v-spacer></v-spacer>
        <p class="post_header_tag_list">プログラミング</p>
      </div>
      
    </div>
    <div class="mind_map">
      <Mindmap style="height: 70vh" :zoomable="judge" :draggable="false" :keyboard="false" :nodeClick="false" :showUndo="false" :showNodeAdd="false" :contextMenu="false" :download="false" :strokeWidth="1" :fitView="false"  v-model="contents"></Mindmap>
      <div class="mind_map_move">
        <v-icon @click="judge = !judge" v-if="judge" color="info">mdi-cursor-default</v-icon>
        <v-icon @click="judge = !judge" v-else color="info">mdi-cursor-default-outline</v-icon>
      </div>
    </div>

    <div v-for="content in postContents">

      <h2 v-text="content.title" v-if="content.kind == 'title'" style="font-weight: bold; font-size: 30px; border-bottom: solid 1px rgb(220 218 218);" class="mt-12 mb-10"></h2>

      <h3 v-text="content.sub_title" class="ml-1 mt-6 mb-5" style="font-size: 23px;" v-else-if="content.kind == 'sub_title'"></h3>

      <p v-text="content.text" class="ml-1 mt-5 mb-5" style="line-height: 1.6;" v-else-if="content.kind == 'text'"></p>

      <v-card class="mt-12 mb-12" flat v-else-if="content.kind == 'picture'">
        <v-img contain max-height="320" :src="`http://localhost:3000${content.picture.url}`"></v-img>
      </v-card>
    </div>
    
  </div>
</template>

<script>
import Mindmap from '@hellowuxin/mindmap'
import PostsModal from '../../components/posts/PostsModal.vue'
import PostsFormTitle from '../../components/posts/PostsFormTitle.vue'
export default {
  components: {
    Mindmap,
    PostsModal,
    PostsFormTitle,
  },
  data(){
    return{ 
      contents: [{}],
      post: {},
      kinds:["title", "sub_title", "picture", "text"],
      title: '',
      sub_title: '',
      text: '',
      picture: '',
      kindSelect: '',
      postContents: [],
      judge: false,

      isValid: false,
      editForm: false,
    }
  },
  created(){
    this.$axios.$get(`api/posts/${this.$route.params.id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
      this.contents = res.data.attributes.contents.content
      this.postContents = res.data.attributes.post_contents
      var date = new Date(res.data.attributes.updated_at)
      var year = date.getFullYear();
      var month = date.getMonth() + 1 ;
      var day = date.getDate();
      var updated_at = year + '/' + month + '/' + day
      this.post = {
        id: res.data.attributes.id,
        title: res.data.attributes.title,
        updated_at: updated_at,
      }
    })
  },
  methods:{
    async create(){
      let formData = new FormData
        formData.append('post_id', this.$route.params.id)
        formData.append('kind', this.kindSelect)
        formData.append('order_num', this.postContents.length + 1)
        formData.append('title', this.title)
        formData.append('sub_title', this.sub_title)
        formData.append('text', this.text)
        formData.append('picture', this.picture)

      await this.$axios.$post('api/post_contents/', formData, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
      this.title = ''
      this.sub_title = ''
      this.text = ''
      this.picture = ''
      this.kindSelect = ''
    },
    update(){

    },
  }
}
</script>

<style scoped>
.post_header_title{
  text-align: center;
  font-weight: bold;
}
.post_header_left{
  display: flex;
  align-items: center;
}
.post_header_left p{
  margin-bottom: 5px;
}
.post_header_created_at{
  display: flex;
  align-items: center;
  font-size: 12px;
}
.post_header_tag_list{
  font-size: 10px;
  background-color:rgb(211, 238, 252);
  border-radius:5px;
  font-weight: bold;
  color: gray;
  padding: 1px 2px;
}
.mind_map{
  position: relative;
}
.mind_map_move{
  position: absolute;
  right: 5px;
  bottom: 40px;
}
</style>