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
        <v-dialog v-model="showNewDialog" max-width="700px">
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
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.startDt"
                      label="startDt"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.endDt"
                      label="endDt"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.content"
                      label="cntent"
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
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
    </template>
  </v-data-table>
</template>
<script lang="ts">
import Vue from "vue";
import { LoginStore } from "~/store";
import { LoginInfo } from "~/models/LoginInfo";
import { ScheduleInfo } from "~/models/ScheduleInfo";
import { GetSchedules, InsertSchedule, UpdateSchedule } from "~/api/schedules";

export default Vue.extend({
  data: () => ({
    showNewDialog: false,
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
      this.showNewDialog = false;
      this.editedIndex = -1;
      this.editedItem = new ScheduleInfo();
    },
    editItem(item: ScheduleInfo) {
      this.editedIndex = this.schedules.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.showNewDialog = true;
    },
    getInitData: async function () {
      this.schedules = await GetSchedules(this.LoginInfo.userId);
    },
    save() {
      if (this.editedIndex > -1) {
        console.log("save editedItem");
        Object.assign(this.schedules[this.editedIndex], this.editedItem);
        UpdateSchedule(this.editedItem);
      } else {
        // save newItem
        console.log("save newItem");
        this.editedItem.userid = this.LoginInfo.userId;
        InsertSchedule(this.editedItem);
        this.schedules.push(this.editedItem);
      }
      this.close();
    },
  },
});
</script>
