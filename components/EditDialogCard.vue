<template>
  <v-card>
    <v-card-title>
      <span class="text-h5"></span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-menu
              ref="startDt"
              v-model="showStartDtDlg"
              :close-on-content-click="false"
              :return-value.sync="editedItem.startDt"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedItem.startDt"
                  label="startDt"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="editedItem.startDt" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="showStartDtDlg = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startDt.save(editedItem.startDt)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-menu
              ref="endDt"
              v-model="showEndDtDlg"
              :close-on-content-click="false"
              :return-value.sync="editedItem.endDt"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedItem.endDt"
                  label="endDt"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="editedItem.endDt" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="showEndDtDlg = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.endDt.save(editedItem.endDt)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="editedItem.content"
              label="content"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <span>{{ editedItemError }}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="clickCancel">Cancel</v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="clickSave"
        :disabled="isSaveDisabled"
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { ScheduleInfo } from "~/models/ScheduleInfo";

export default Vue.extend({
  props: {
    editedItem: ScheduleInfo,
  },
  data: () => ({
    showStartDtDlg: false,
    showEndDtDlg: false,
    editedItemError: "",
  }),
  computed: {
    isSaveDisabled(): boolean {
      return Boolean(this.editedItemError);
    },
  },
  watch: {
    editedItem: {
      handler: function (val: ScheduleInfo) {
        if (!val.startDt) {
          this.editedItemError = "予定日を入力してください。";
          return;
        }
        if (!val.endDt) {
          this.editedItemError = "予定日(終了)を入力してください。";
          return;
        }
        if (Date.parse(val.startDt) > Date.parse(val.endDt)) {
          this.editedItemError =
            "予定日(終了)は、開始日以降を入力してください。";
          return;
        }
        this.editedItemError = "";
      },
      deep: true,
    },
  },
  methods: {
    clickCancel() {
      this.$emit("clickCancel", {} as ScheduleInfo);
    },
    clickSave() {
      this.$emit("clickSave", this.editedItem);
    },
  },
});
</script>
<style scoped>
span {
  height: 20px;
  font-size: 14px;
  color: red;
  width: 90%;
  display: block;
}
</style>
