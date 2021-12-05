<template>
  <v-data-table
    :headers="headers"
    :items="schedules"
    :items-per-page="10"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title
          >{{ LoginInfo.userId }}さんのスケジュール一覧</v-toolbar-title
        >
        <!-- 垂直線で分割 -->
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="showNewDialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
              >New Item</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5"></span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.scheduleDate"
                      label="scheduleDate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.detail"
                      label="detail"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
<script lang="ts">
import Vue from "vue";
import { LoginStore } from "~/store";
import { LoginInfo } from "~/models/LoginInfo";
import { ScheduleInfo } from "~/models/ScheduleInfo";

export default Vue.extend({
  data: () => ({
    showNewDialog: false,
    headers: [
      {
        text: "予定日",
        align: "start",
        value: "scheduleDate",
      },
      {
        text: "タイトル",
        value: "title",
      },
      {
        text: "詳細",
        value: "detail",
      },
    ],
    schedules: [] as ScheduleInfo[],
    editedIndex: -1,
    editedItem: {} as ScheduleInfo,
  }),
  computed: {
    LoginInfo(): LoginInfo {
      return LoginStore.getLoginInfo;
    },
    formTitle(): string {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  methods: {
    close() {
      this.showNewDialog = false;
      this.editedIndex = -1;
    },
    save() {
      if (this.editedIndex > -1) {
        // save editedItem
        console.log("save editedItem");
      } else {
        // save newItem
        console.log("save newItem");
        // 暫定
        this.schedules.push(this.editedItem);
      }
      this.close();
    },
  },
});
</script>
