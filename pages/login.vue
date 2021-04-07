<template>
  <div class="mt-12 mb-10 pb-5">
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
            ログイン
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
            @click="login"
          >
            登録する
          </v-btn>
        </v-card>
      </v-row>
    </v-container>
    <nuxt-link to="/signup">新規登録</nuxt-link>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
export default {
  components:{
    VueLoading
  },
  name: 'App',
  auth: false,
  data () {
    return {
      isValid: false,
      params: { user: { email: '', password: '' } },

      loading: false,
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$axios.post('auth/sign_in', this.params.user).then((res) => {
        localStorage.setItem("X-Access-Token", res.headers['x-access-token']);
        localStorage.setItem("id", res.data.data.id);
        this.$refs.form.reset()
        this.loading = false
        this.params = { user: { email: '', password: '' } }
        window.location.href = `/`
      })
    },
  },
}
</script>

<style scoped>
@keyframes fadeIn {
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}
.loading{
  position: fixed;
  top: 0;
  bottom:0;
  right:0;
  left:0;
  background: rgba(255, 255, 255, 0.199);
  z-index: 100;
}
.loading_inner{
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translate(50%,50%);
}
.loading_inner_text{
  margin: 0;
  animation: fadeIn infinite alternate 2s;
}
.loading_inner_mark{
  
}
</style>
