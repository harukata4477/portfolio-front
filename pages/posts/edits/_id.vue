<template>
  <div class="post mt-6">
    <v-alert style="position: fixed; top: 70px; width: 95%; z-index: 30;" :color="colors" :type="types" v-model="submitAlert" transition="slide-y-transition">
      {{answer}}
    </v-alert>
    <div class="post_header">
      <h1 class="post_header_title display-1 mb-4">{{post.title}}</h1>
      
      <v-dialog
        v-model="editForm"
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
            style="position:absolute; right: 0; top: 10px; z-index: 20;"
          >
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-btn>
        </template>

        
        <v-card>
          <v-container fluid>
            <v-row
              align="center"
              justify="center"
            >
              <v-col
                cols="12"
                class="my-8 text-center"
              >
                <h1 class="text-h5 font-weight-bold">
                  タイトル&nbsp;変更
                </h1>
              </v-col>

              <v-card
                flat
                width="80%"
                max-width="320"
                color="transparent"
              >
                <v-form
                  v-model="isValid"
                  ref="form"
                >
                  <div style="display: flex; flex-wrap: wrap;">
                    <posts-form-title :title.sync="post.title" />
                  </div>
                </v-form>


                <v-btn
                  :disabled="!isValid"
                  block
                  color="info"
                  class="white--text mb-8"
                  @click="update"
                >
                  登録する
                </v-btn>
              </v-card>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>

      <div class="post_header_left">
        <p color="gray" class="post_header_created_at grey--text"><v-icon class=" mr-1 grey--text" x-small>mdi-autorenew</v-icon>{{post.updated_at}}</p>
        <v-spacer></v-spacer>
        <p class="post_header_tag_list">プログラミング</p>
      </div>
      <div class="mind_map">
        <Mindmap style="height: 70vh" :zoomable="judge" :draggable="false" :keyboard="false" :nodeClick="false" :showUndo="false" :showNodeAdd="false" :contextMenu="false" :download="false" :strokeWidth="1" :fitView="false"  v-model="contents"></Mindmap>
        <div class="mind_map_move">
          <v-icon @click="judge = !judge" v-if="judge" color="info">mdi-cursor-default</v-icon>
          <v-icon @click="judge = !judge" v-else color="info">mdi-cursor-default-outline</v-icon>
        </div>
      </div>
    </div>

    <div class="mb-16 mt-3">
       <v-select
        :items="createKinds"
        label="Type 選択"
        outlined
        v-model="kindSelect"
      ></v-select>

      <v-text-field  v-if="kindSelect == 'title'" v-model="title" label="title" outlined></v-text-field>
      <v-text-field v-else-if="kindSelect == 'sub_title'" v-model="sub_title" label="sub title" outlined></v-text-field>
      <v-textarea v-else-if="kindSelect == 'text'" v-model="text" label="text" outlined></v-textarea>
      <v-file-input
        v-else-if="kindSelect == 'picture'"
        v-model="picture"
        style="margin: 0; padding: 0;"
      >
      </v-file-input>
      
      <v-btn class="mb-5" @click="create">新規追加</v-btn>
    

    <div v-for="(content, i ) in postContents" :key="content[i]">


      <div style="position: relative;" v-if="content.kind == 'title'">
        <v-col cols="1" style="position: absolute; top: 1px; left: -30px;">
          <v-select
            :items="kinds"
            v-model="content.kind"
            solo
            flat
            single-line
            return-object
            append-icon="mdi-dots-horizontal"
            hide-details="auto"
            background-color="transparent"
          ></v-select>
        </v-col>
        <input
          class="titleForm mt-12 mb-5 pl-0"
          v-model="content.title"
          @keypress.enter="postContentsUpdate(content)"
        >
      </div>

      <div style="position: relative;" v-else-if="content.kind == 'sub_title'">
        <v-col cols="1" style="position: absolute; top: -35px; left: -30px;">
          <v-select
            :items="kinds"
            v-model="content.kind"
            solo
            flat
            single-line
            return-object
            append-icon="mdi-dots-horizontal"
            hide-details="auto"
            background-color="transparent"
          ></v-select>
        </v-col>
        <input 
          class="subTitleForm ml-1 mt-3 mb-3" 
          v-model="content.sub_title" 
          @keypress.enter="postContentsUpdate(content)"
        >
      </div>

      <div style="position: relative;" v-else-if="content.kind == 'text'">
       <v-col cols="1" style="position: absolute; top: -35px; left: -30px;">
        <v-select
          :items="kinds"
          v-model="content.kind"
          solo
          flat
          single-line
          append-icon="mdi-dots-horizontal"
          return-object
          hide-details="auto"
          background-color="transparent"
        ></v-select>
       </v-col>
        <v-textarea
          solo-inverted
          flat
          dense
          auto-grow
          background-color="transparent"
          hide-details="auto"
          rows="1"
          v-model="content.text" 
          @keypress.enter="postContentsUpdate(content)"
        ></v-textarea>
      </div>
      


      <div style="position: relative;" v-else-if="content.kind == 'picture'">
        <v-col cols="1" style="position: absolute; top: -50px; left: -30px;">
          <v-select
            :items="kinds"
            v-model="content.kind"
            append-icon="mdi-dots-horizontal"
            solo
            flat
            single-line
            return-object
            hide-details="auto"
            background-color="transparent"
          ></v-select>
        </v-col>
        <v-card flat class="mb-6 mt-6">

          <v-img contain max-height="320" :src="`http://localhost:3000${content.picture.url}`">
            <v-file-input
              v-model="content.picture"
              hide-input
              style="margin: 0; padding: 0;"
              @change="postContentsUpdate(content)"
            >
            </v-file-input>
          </v-img>
            
        </v-card>
      </div>

      <div style="position: relative;" v-else-if="content.kind == 'delete'">
        <v-col cols="1" style="position: absolute; top: -35px; left: -30px;">
          <v-select
            :items="kinds"
            v-model="content.kind"
            solo
            flat
            single-line
            return-object
            append-icon="mdi-dots-horizontal"
            hide-details="auto"
            background-color="transparent"
          ></v-select>
        </v-col>
        <v-btn class="mt-6 mb-6" color="error" width="100%" @click="postContentsUpdate(content)">このコンテンツを削除</v-btn>
      </div>
 
    </div>

    </div>
  </div>
</template>


<script>
import Mindmap from '@hellowuxin/mindmap'
import PostsModal from '../../../components/posts/PostsModal.vue'
import PostsFormTitle from '../../../components/posts/PostsFormTitle.vue'

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
      kinds:["title", "sub_title", "picture", "text", "delete"],
      createKinds:["title", "sub_title", "picture", "text"],
      title: '',
      sub_title: '',
      text: '',
      picture: '',
      kindSelect: '',
      postContents: [],
      num: 0,

      answer: 'されました',
      colors: '',
      types: '',

      isValid: false,
      editForm: false,
      judge: false,
      submitAlert: false,
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
      this.num = res.data.attributes.post_contents.length + 1
    })
  },
  methods:{
    async create(){
      if(this.kindSelect){
        let formData = new FormData
          formData.append('post_id', this.$route.params.id)
          formData.append('kind', this.kindSelect)
          formData.append('order_num', this.num)
          formData.append('title', this.title)
          formData.append('sub_title', this.sub_title)
          formData.append('text', this.text)
          formData.append('picture', this.picture)
  
        await this.$axios.$post('api/post_contents/', formData, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(
          this.submitAlert = true,
          this.colors = 'info',
          this.types = 'success',
          this.answer = '作成されました'
        )

        this.$axios.$get(`api/posts/${this.$route.params.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.postContents = res.data.attributes.post_contents
          this.num = res.data.attributes.post_contents.length + 1
        })
        this.num += 1
  
        this.title = ''
        this.sub_title = ''
        this.text = ''
        this.picture = ''
        this.kindSelect = ''
      }else{
        this.submitAlert = true
        this.colors = 'error',
        this.types = 'error',
        this.answer = 'Typeを選択してください'
      }
    },
    async update(){
      const params = {
        title: this.post.title
      }
      await this.$axios.$patch(`api/posts/${this.$route.params.id}`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(
        this.editForm = false,
        this.submitAlert = true,
        this.colors = '',
        this.types = 'success',
        this.answer = '更新されました'
      )
    },
    async postContentsUpdate(post_content){
      if(post_content.kind == "delete"){
        await this.$axios.$delete(`api/post_contents/${post_content.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
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
          this.num = res.data.attributes.post_contents.length + 1
        })
        this.submitAlert = true
        this.colors = 'info'
        this.types = 'success',
        this.answer = '削除されました'
      }else{
        let formData = new FormData
          formData.append('post_id', post_content.post_id)
          formData.append('kind', post_content.kind)
          formData.append('order_num',post_content.order_num)
          formData.append('title', post_content.title)
          formData.append('sub_title', post_content.sub_title)
          formData.append('text', post_content.text)
          formData.append('picture', post_content.picture)
  
        await this.$axios.$patch(`api/post_contents/${post_content.id}`, formData, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(
          this.submitAlert = true,
          this.colors = '',
          this.types = 'success',
          this.answer = '更新されました'
        )
        if (post_content.kind == 'picture'){
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
            this.num = res.data.attributes.post_contents.length + 1
          })
        }
      }
    },
  },
  watch: {
    submitAlert (val) {
      val && setTimeout(() => {
        this.submitAlert = false
      }, 2000)
    },
  },
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
input {
 border: none;
 outline: none;
}
.titleForm{
  font-weight: bold;
  width:100%;
  font-size: 30px;
  border-bottom: solid 1px rgb(220 218 218);
}
.subTitleForm{
  font-size: 23px;
  width: 100%;
  font-weight: bold;
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