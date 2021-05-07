<template>
    <v-list three-line>
    <template v-for="(user, index) in users" >
      

      <v-list-item
        class="user_main"
        :key="`user-${index}`"
      >
        <v-list-item-avatar
          @click="$router.push(`/users/${user.id}`)"
        >
          <v-img :src="`http://localhost:5000${user.image}`"></v-img>
        </v-list-item-avatar>
        <v-list-item-content
          @click="$router.push(`/users/${user.id}`)"
        >
          <v-list-item-title v-html="user.name"></v-list-item-title>
          <v-list-item-subtitle v-if="user.profile == ''"></v-list-item-subtitle>
          <v-list-item-subtitle v-if="user.profile" v-html="user.profile"></v-list-item-subtitle>
        </v-list-item-content>
        <template v-if="currentUser.id == user.id"></template>
        <template v-else>
          <v-btn v-if="user.follow_judge" @click="unfollow(user.id)" small color="info" class="unfollow">フォロー済み</v-btn>
          <v-btn v-else @click="follow(user.id)" outlined color="info" class="folow" small>フォロー</v-btn>
        </template>
      </v-list-item>

    </template>
  </v-list>
</template>

<script>
export default {
  props:{
    todo:{
      type:Object,
      required: true,
      default: () => [],
    }
  },
}
</script>

<style scoped>

</style>