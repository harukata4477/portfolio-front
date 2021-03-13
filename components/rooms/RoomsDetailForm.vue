<template>
  <v-row justify="center" style="margin: 0;">
    <v-dialog
      v-model="editForm"
      persistent
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <button
          color="primary"
          style="display: flex; align-items:center; margin-right: 10px; padding: 3px 3px; font-weight: bold; background: #007effbd; color: #fff; border-radius: 5px; box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%); font-size: 15px;"
          dark
          v-bind="attrs"
          v-on="on"
        >
        <v-icon style="color: #fff; font-size: 15px; margin-right: 2px;">mdi-pencil</v-icon>
          編集
        </button>
      </template>
      <v-card>
        <v-card-title class="headline">
          編集
        </v-card-title>
        
        <v-card-text>
          <v-container>
            <v-row>

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

            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="editForm = false"
          >
            閉じる
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="edit"
          >
            更新
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  
}
</script>