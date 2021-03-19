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
            <div style="display: flex; flex-wrap: wrap;">
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

    <v-footer width="100%" style="background-color: rgba(0, 126, 255); position: fixed;  bottom: 0; left: 0; padding: 12px 0; z-index: 2;">
      <bottom-menu />
    </v-footer>
  </div>
</template>

<script>
export default {
  data(){
    return{
      title: '',
      deadline: '',

      date: '',
      time: '',

      isValid: false,
    }
  },
  methods:{
    create(){
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
      })
    }
  }
}
</script>