<template>
  <div class="errors">
    <div class="errors_inner">
      <v-img src="/img/errors.jpeg"></v-img>
      <h3>リロード or 下記のリンクに飛んでください。</h3>
      <p class="mb-0" v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </p>
      <p class="mb-0" v-else>
        {{ otherError }}
      </p>
      <NuxtLink to="/">
        Home page
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
.errors{
  width: 100%;
  height: 100%;
  position: relative;
}
.errors_inner{
  position: absolute;
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  text-align: center;
}
</style>
