<template>
  <div class="mt-12 mb-10 pb-5">
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
            投稿&nbsp;作成
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
              <posts-form-select :room.sync="room" />
              <posts-form-title :title.sync="title" />

              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-image</v-icon>
                  </v-btn>
                </template>
                <v-list height="600">
                  <v-list-item
                    style="background: #fff;"
                    v-for="(item, index) in items"
                    :key="index"
                    link
                  >
                    <v-img 
                      :src="`/img/img${item.id}.svg`"
                      height="100px"
                      width="100px"
                      class="mr-2"
                    ></v-img>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
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
export default {
  components: { "posts-form-select" :PostsFormSelect, "posts-form-title" :PostsFormTitle },
  data(){
    return{
      room: '',
      title: '',
      items: [
        {
          id: 0,
          title: "タイトル0",
        },
        {
          id: 1,
          title: "タイトル1",
        },
        {
          id: 2,
          title: "タイトル2",
        },
        {
          id: 3,
          title: "タイトル3",
        },
        {
          id: 4,
          title: "タイトル4",
        },
        {
          id: 5,
          title: "タイトル5",
        },
        {
          id: 6,
          title: "タイトル6",
        },
        {
          id: 7,
          title: "タイトル7",
        },
        {
          id: 8,
          title: "タイトル8",
        },
        {
          id: 9,
          title: "タイトル9",
        },
        {
          id: 10,
          title: "タイトル10",
        },
      ],

      isValid: false,
    }
  },
  methods:{
    create(){
      const params = {
        title: this.title,
        room: this.room,
      }
      this.$axios.$post('/api/posts', params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
          this.$router.push(`/posts/edits/${res.post_id}`)
        }
      )
    }
  }
}
</script>