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
        <v-dialog v-model="showEditDialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
              >New Item</v-btn
            >
          </template>
          <edit-dialog-card
            :editedItem="editedItem"
            v-on:clickSave="onSave"
            v-on:clickCancel="close"
          ></edit-dialog-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>
<script lang="ts">
import Vue from "vue";
import { LoginStore } from "~/store";
import { LoginInfo } from "~/models/LoginInfo";
import "@/node_modules/vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import { ScheduleInfo } from "~/models/ScheduleInfo";
import EditDialogCard from "~/components/EditDialogCard.vue";
import {
  GetSchedules,
  InsertSchedule,
  UpdateSchedule,
  DeleteSchedule,
} from "~/api/schedules";

export default Vue.extend({
  components: {
    EditDialogCard,
  },
  data: () => ({
    showEditDialog: false,
    headers: [
      {
        align: "start",
        text: "予定日",
        value: "startDt",
      },
      {
        text: "予定日(終了)",
        value: "endDt",
      },
      {
        text: "内容",
        value: "content",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
      },
    ],
    schedules: [] as ScheduleInfo[],
    editedIndex: -1,
    editedItem: {} as ScheduleInfo,
  }),
  mounted() {
    // (property) name: string
    this.getInitData();
    this.clearInfo();
  },
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
      this.showEditDialog = false;
      this.clearInfo();
    },
    clearInfo() {
      this.editedIndex = -1;
      this.editedItem = new ScheduleInfo();
      this.editedItem.startDt = new Date().toISOString().substr(0, 10);
      this.editedItem.endDt = new Date().toISOString().substr(0, 10);
    },
    editItem(item: ScheduleInfo) {
      this.editedIndex = this.schedules.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.showEditDialog = true;
    },
    deleteItem(item: ScheduleInfo) {
      this.editedIndex = this.schedules.indexOf(item);
      this.editedItem = Object.assign({}, item);
      DeleteSchedule(this.editedItem);
      this.schedules.splice(this.editedIndex, 1);
      this.clearInfo();
    },
    getInitData: async function () {
      this.$nuxt.$loading.start();
      setTimeout(async () => {
        // loadingダイアログの機能を確認するため、
        // わざとsetTimeoutで適当に時間を稼いでからGetSchedulesをしている
        // https://codelikes.com/custom-loading-nuxt/#toc4
        this.schedules = await GetSchedules(this.LoginInfo.userId);
        this.$nuxt.$loading.finish();
      }, 3000);
    },
    async onSave(params: ScheduleInfo) {
      console.log("onSave");
      console.log(params);
      this.editedItem = params;
      await this.save();
    },
    async save() {
      if (this.editedIndex > -1) {
        console.log("save editedItem");
        Object.assign(this.schedules[this.editedIndex], this.editedItem);
        UpdateSchedule(this.editedItem);
      } else {
        // save newItem
        console.log("save newItem");
        this.editedItem.userid = this.LoginInfo.userId;
        let id = await InsertSchedule(this.editedItem);
        this.editedItem.id = id;
        this.schedules.push(this.editedItem);
      }
      this.close();
    },
  },
});
</script>
