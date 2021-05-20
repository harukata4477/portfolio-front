<template>
  <div>

    <v-alert class="alert" type="error" v-model="submitAlert" transition="slide-y-transition">
      {{submitContent}}
    </v-alert>

    <v-container fluid>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          class="post-header my-8 text-center"
        >
          <h1 class="text-h5 font-weight-bold">
            投稿&nbsp;作成
          </h1>
        </v-col>

        <v-card
          class="post-content"
          flat
          width="80%"
          max-width="320"
          color="transparent"
        >
          <v-form
            v-model="isValid"
            ref="form"
          >
            <div class="post_card_form_content">
              <posts-form-select :room.sync="room" />
              <posts-form-title :title.sync="title" />
              <posts-form-tag-list :tag_list.sync="tag_list" />
              
              <div class="post_card_form_content_menu mb-5">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      icon
                      large
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-image</v-icon>
                    </v-btn>
                  </template>
                  <v-list background="white" height="600">
                    <v-list-item
                      :rules="kindRules"
                      style="background-color: white !important;"
                      v-for="(item, index) in items"
                      :key="index"
                      link
                      @click="kind = item"
                    >
                      <v-img 
                        :src="`/img/img${item.id}.svg`"
                        height="100px"
                        width="100px"
                        class="mr-2"
                      ></v-img>
                      <v-list-item-title class="text-center">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <p class="post_card_form_content_menu_img mb-0"><v-img class="mr-2" width="60px" height="60px" :src="`/img/img${kind.id}.svg`"></v-img>{{kind.title}}</p>
              </div>
            </div>
          </v-form>
          <v-btn
            :disabled="!isValid"
            block
            color="info"
            class="white--text"
            @click="create"
          >
            登録する
          </v-btn>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PostsFormSelect from '@/components/posts/PostsFormSelect.vue'
import PostsFormTitle from '@/components/posts/PostsFormTitle.vue'
import PostsFormTagList from '@/components/posts/PostsFormTagList.vue'

export default {
  components: { 
    "posts-form-select" :PostsFormSelect,
    "posts-form-title" :PostsFormTitle,
    "posts-form-tag-list" :PostsFormTagList,
  },
  data(){
    return{
      room: '',
      title: '',
      tag_list: '',
      kind: {id:'', title: '画像を選択してください。'},
      items: [
        { id: 0, title: "Game" },
        { id: 1, title: "Sport１" },
        { id: 2, title: "PC" },
        { id: 3, title: "Summer" },
        { id: 4, title: "Resort" },
        { id: 5, title: "Trip" },
        { id: 6, title: "Meetting" },
        { id: 7, title: "Search" },
        { id: 8, title: "Running" },
        { id: 9, title: "Drive" },
        { id: 10, title: "SEO" },
        { id: 11, title: "Notification" },
        { id: 12, title: "Airport" },
        { id: 13, title: "Setting" },
        { id: 14, title: "Remote" },
        { id: 15, title: "Shopping" },
        { id: 16, title: "Design" },
        { id: 17, title: "Start up" },
        { id: 18, title: "Transaction" },
        { id: 19, title: "Eating" },
        { id: 20, title: "News" },
        { id: 21, title: "Asset utilisation" },
        { id: 22, title: "Sport2" },
        { id: 23, title: "Camp" },
        { id: 24, title: "Job" },
        { id: 25, title: "Cooking" },
        { id: 26, title: "Construction" },
        { id: 27, title: "Start up" },
        { id: 28,title: "Medical" }
        ,{id: 29,title: "Ttraining"},
      ],
      kindRules: [
        v => !!v || '',
      ],

      isValid: false,
      submitAlert: false,
      submitContent: '画像選択されていません。',
    }
  },
  methods:{
    create(){
      if(this.kind.id){
        const params = {
          title: this.title,
          room: this.room,
          kind: this.kind.id,
          tag_list: this.tag_list,
        }
        this.$axios.$post('/api/posts', params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
            this.$router.push(`/posts/edits/${res.post_id}`)
          }
        )
      }else if(this.kind.id == 0){
        const params = {
          title: this.title,
          room: this.room,
          kind: this.kind.id,
          tag_list: this.tag_list,
        }
        this.$axios.$post('/api/posts', params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
            this.$router.push(`/posts/edits/${res.post_id}`)
          }
        )
      }else{
        this.submitAlert = true
      }
    }
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
.post_card_form_content{
  display: flex; 
  flex-wrap: wrap;
}
.post_card_form_content_menu{
  display: flex; 
  align-items: center; 
  width: 100%;
  overflow: scroll;
}
.post_card_form_content_menu_img{
  display: flex; 
  align-items: center;
  background: #fff;
}
.post_card_form_content_menu_img .v-image{
  border: solid 1px #eee; 
  border-radius: 5px;
}
</style>