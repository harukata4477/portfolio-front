<template>
  <div>
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
          <user-form-name :name.sync="params.user.name" />
          <user-form-email :email.sync="params.user.email" />
          <user-form-password :password.sync="params.user.password" />
        </v-form>
        <v-btn
          :disabled="!isValid"
          :loading="loading"
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
  </div>
</template>

<script>
export default {
  name: 'App',
  auth: false,
  data () {
    return {
      isValid: false,
      params: { user: { name: '', email: '', password: '' } },
      loading: false,
    }
  },
  methods: {
    signup () {
      this.$axios.post('auth/', this.params.user).then((res) => {
        localStorage.setItem("X-Access-Token", res.headers['x-access-token']);
        this.loading = true
        setTimeout(() => {
          this.formReset()
          this.loading = false
        }, 1500)
      })
    },
    formReset () {
      this.$refs.form.reset()
      this.params = { user: { name: '', email: '', password: '' } }
      this.$router.push('/')
    }
  },
}
</script>