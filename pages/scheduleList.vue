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
            <v-card-text>XXXX</v-card-text>
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

export default Vue.extend({
  data: () => ({
    showNewDialog: false,
    headers: [
      {
        text: "予定日",
        align: "start",
        value: "scheduledDate",
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
    schedules: [
      {
        scheduledDate: "2021/01/01 12:30:00",
        title: "＊＊＊",
        detail: "メモメモメモ",
      },
      {
        scheduledDate: "2021/01/02 12:30:00",
        title: "＊＊＊2",
        detail: "メモメモメモ2",
      },
    ],
  }),
  computed: {
    LoginInfo(): LoginInfo {
      return LoginStore.getLoginInfo;
    },
  },
});
</script>
