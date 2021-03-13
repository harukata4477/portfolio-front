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
          class="white--text"
          @click="signup"
        >
          登録する
        </v-btn>
      </v-card>
    </v-row>
  </v-container>
    <nuxt-link to="/login">ログイン</nuxt-link>

    <v-footer width="100%" style="background-color: rgba(0, 126, 255); position: fixed;  bottom: 0; left: 0; padding: 12px 0; z-index: 2;">
      <bottom-menu />
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  auth: false,
  data () {
    return {
      isValid: false,
      params: { user: { email: '', password: '' } },
    }
  },
  methods: {
    signup () {
      this.$axios.post('auth/', this.params.user).then((res) => {
        localStorage.setItem("X-Access-Token", res.headers['x-access-token']);
        localStorage.setItem("id", res.data.data.id);
        this.$refs.form.reset()
        this.params = { user: { email: '', password: '' } }
        window.location.href = `/`
      })
    },
  },
}
</script>