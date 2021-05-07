<template>
  <div class="mt-12 mb-10 pb-5">

    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

    <v-alert class="alert" type="error" v-model="load_judge" transition="slide-y-transition">
      サインアップに失敗しました。
    </v-alert>

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
          新規登録
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
          <user-form-email :email.sync="params.user.email" />
          <user-form-password :password.sync="params.user.password" />
        </v-form>
        <v-btn
          :disabled="!isValid"
          block
          color="info"
          class="white--text mb-6"
          @click="signup"
        >
          登録する
        </v-btn>
      <nuxt-link to="/login">ログイン</nuxt-link>
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
  data () {
    return {
      isValid: false,
      params: { user: { email: '', password: '' } },

      loading: false,
      load_judge: false,
    }
  },
  methods: {
    signup () {
      this.$axios.post('auth/', this.params.user).then((res) => {
        localStorage.setItem("X-Access-Token", res.headers['x-access-token']);
        localStorage.setItem("id", res.data.data.id);
        this.$refs.form.reset()
        this.loading = false
        window.location.href = `/posts/`
      }).catch(this.load_judge = true)
      this.params = { user: { email: '', password: '' } }
    },
  },
   watch: {
    load_judge (val) {
      val && setTimeout(() => {
        this.load_judge = false
        this.loading = false
      }, 2000)
    },
  },
}
</script>