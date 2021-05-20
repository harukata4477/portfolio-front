<template>
  <v-card
    flat
    width="100%"
    color="transparent"
  >
  <v-card-title class="pb-0 font-weight-bold">ヘルプ</v-card-title>
    <v-list>

      <v-list-group
        v-for="(kind, k) in kinds"
        :key="`kind-${k}`"
        :prepend-icon="kind.icon"
      >
        <template v-slot:activator>
          <v-list-item-title v-text="kind.title"></v-list-item-title>
        </template>

        <v-list-group
          v-if="kind.title == 'ホーム'"
          v-for="(post, p) in posts"
          :key="`post-${p}`"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="post.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <div style="width: 100%; height: 400px;">
            <video 
              :src="`/img/${post.url}`"
              controls
              style="margin: 0 auto; display: block; height: 100%;"
              type='video/mp4;'
            ></video>
          </div>

        </v-list-group>

        <v-list-group
          v-if="kind.title == 'マインドマップ'"
          v-for="(mindmap, m) in mindmaps"
          :key="`mindmap-${m}`"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="mindmap.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <div style="width: 100%; height: 400px;">
            <video 
              :src="`/img/${mindmap.url}`"
              controls
              style="margin: 0 auto; display: block; height: 100%;"
              type='video/mp4;'
            ></video>
          </div>

        </v-list-group>

        <v-list-group
          v-if="kind.title == 'カレンダー'"
          v-for="(calendar, m) in calendars"
          :key="`calendar-${m}`"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="calendar.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <div style="width: 100%; height: 400px;">
            <video 
              :src="`/img/${calendar.url}`"
              controls
              style="margin: 0 auto; display: block; height: 100%;"
              type='video/mp4;'
            ></video>
          </div>

        </v-list-group>

        <v-list-group
          v-if="kind.title == 'ユーザー'"
          v-for="(user, m) in users"
          :key="`user-${m}`"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="user.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <div style="width: 100%; height: 400px;">
            <video 
              :src="`/img/${user.url}`"
              controls
              style="margin: 0 auto; display: block; height: 100%;"
              type='video/mp4;'
            ></video>
          </div>

        </v-list-group>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      kinds:[{title: 'ホーム', icon: 'mdi-home'}, {title: 'マインドマップ', icon: 'mdi-sitemap'}, {title: 'カレンダー', icon: 'mdi-calendar'}, {title: 'ユーザー', icon: 'mdi-account'}],
      posts: [
        {title: '作成', url: 'post_create.mp4'},
        {title: '編集', url: 'post_edit.mp4'},
        {title: '削除', url: 'post_delete.mp4'},
        {title: '記事の内容 作成', url: 'post_content_create.mp4'},
        {title: '記事の内容 編集', url: 'post_content_edit.mp4'},
        {title: '記事の内容 削除', url: 'post_content_delete.mp4'},
      ],
      mindmaps: [
        {title: '作成', url: 'mindmap_create.mp4'},
        {title: '編集', url: 'mindmap_edit.mp4'},
        {title: '削除', url: 'mindmap_delete.mp4'},
        {title: '追加', url: 'mindmap_add.mp4'},
<<<<<<< HEAD
        {title: '太字/細字', url: 'mindmap_font_weight.mp4'},
        {title: 'レイアウト', url: 'mindmap_layout.mp4'},
=======
        {title: '開く & 閉じる', url: 'mindmap_open.mp4'},
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18
        {title: '保存', url: 'mindmap_save.mp4'},
      ],
      calendars: [
        {title: '作成', url: 'calendar_create.mp4'},
        {title: '編集', url: 'calendar_edit.mp4'},
        {title: '削除', url: 'calendar_delete.mp4'},
      ],
      users: [
        {title: '編集', url: 'user_edit.mp4'},
      ],
    }
  }
}
</script>

<style scoped>

</style>