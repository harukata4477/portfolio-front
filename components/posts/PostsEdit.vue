<template>
  <div class="text-center">
    <v-dialog
      v-model="edit"
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
          style="position:absolute; right: 0; top: 0; z-index: 20;"
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
                投稿&nbsp;編集
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
                  <!-- <posts-form-select :room.sync="room" /> -->
                  <posts-form-title :title.sync="title" />
                </div>
              </v-form>
              <v-btn
                :disabled="!isValid"
                block
                color="info"
                class="white--text"
                @click="update"
              >
                登録する
              </v-btn>
            </v-card>
          </v-row>
        </v-container>{{post}}
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PostsFormSelect from './PostsFormSelect.vue'
import PostsFormTitle from './PostsFormTitle.vue'
export default {
  props: {
    post:{
      type: String,
      required: true,
      default: {},
    }
  },
  components: {
    PostsFormSelect,
    PostsFormTitle,
  },
  data(){
    return {
      room: '',
      title: '',

      isValid: false,
      edit: false,
    }
  },
  created(){
    this.title = this.post.title
  },
  methods:{
    update(){
      const params = {
        title: this.title,
      }
      this.$axios.$patch(`/api/posts/${this.post.id}`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
    }
  }
  
}
</script>