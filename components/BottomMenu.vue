<template>
  <v-row v-model="setId" fixed style="justify-content: center;">
    <div style="width: 25vw;">
      <button @click="$router.push('/posts/')" class="home" style="color: #fff; text-align: center; margin: 0 auto; width: 100%; padding: 4px; line-height: 1; font-weight: bold; outline: none;">
        <v-icon color="white" style="font-size: 30px;">mdi-home</v-icon>
        <p class="mb-0" style="font-size: 10px;">ホーム</p>
      </button>
    </div>
    <div style="width: 25vw;">
      <button @click="$router.push('/rooms')" class="sitemap" style="color: #fff; text-align: center; margin: 0 auto; width: 100%; padding: 4px; line-height: 1; font-weight: bold; outline: none;">
        <v-icon color="white" style="font-size: 30px;">mdi-sitemap</v-icon>
        <p class="mb-0" style="font-size: 10px;">マインドマップ</p>
      </button>
    </div>
    <div style="width: 25vw;">
      <button @click="$router.push('/calendars')" class="calendar" style="color: #fff; text-align: center; margin: 0 auto; width: 100%; padding: 4px; line-height: 1; font-weight: bold; outline: none;">
        <v-icon color="white" style="font-size: 30px;">mdi-calendar-clock</v-icon>
        <p class="mb-0" style="font-size: 10px;">カレンダー</p>
      </button>
    </div>
    <div style="width: 25vw;">
      <button @click="$router.push(`/users/${current_id}`)" class="account" style="color: #fff; text-align: center; margin: 0 auto; width: 100%; padding: 4px; line-height: 1; font-weight: bold; outline: none;">
        <v-icon color="white" style="font-size: 30px;">mdi-account</v-icon>
        <p class="mb-0" style="font-size: 10px;">Myアカウント</p>
      </button>
    </div>
  </v-row>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    setId: {
      get () { return this.id },
      set (newVal) { return this.$emit('update:id', newVal) }
    },
  },
  data () {
    return {
      users: '',
      current_id: 0,
    }
  },
  created () {
    if(localStorage.getItem('id') == null){
      this.current_id = ''
      this.setId = ''
    }else{
      this.current_id = localStorage.getItem('id')
      this.setId = localStorage.getItem('id')
    }
  }
}
</script>