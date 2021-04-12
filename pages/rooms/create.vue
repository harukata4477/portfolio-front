<template>
  <div class="mt-12">

    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

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
            ルーム作成
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
            <div class="room_card_form">
               <v-card-text class="pb-1 pt-0 pl-0 pr-0">
                <p class="grey--text mb-0">目標</p>
              </v-card-text>
              <rooms-form-title :title.sync="title" />
              <v-card-text class="pb-1 pt-0 pl-0 pr-0">
                <p class="grey--text mb-0">目標達成日時</p>
              </v-card-text>
              <rooms-form-deadline-date :date.sync="date" />
              <rooms-form-deadline-time :time.sync="time" />
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
import { VueLoading } from 'vue-loading-template';
export default {
  components:{
    VueLoading
  },
  data(){
    return{
      title: '',
      deadline: '',
      date: '',
      time: '',

      isValid: false,
      loading: true,
    }
  },
  created(){
    this.loading = false
  },
  methods:{
    create(){
      if(localStorage.getItem('id')){
        this.loading = true
        const params = {
          title: this.title,
          deadline: this.date + ' ' + this.time,
        }
        this.$axios.$post('/api/rooms', params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          const params = {
              room_id: res.room_id,
              content: [{"name": "タイトル入力"}]
            }
            this.$axios.$post(`api/contents/`, params, {
              headers:{
                'X-Access-Token': localStorage.getItem('X-Access-Token')
              }
            })
          this.$router.push('/rooms/')
          this.loading = false
        })
      }
    }
  }
}
</script>

<style scoped>
.room_card_form{
  display: flex; 
  flex-wrap: wrap;
}
</style>
