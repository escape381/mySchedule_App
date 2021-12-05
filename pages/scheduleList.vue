<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="schedules"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: function () {
    return {
      headers: [
        {
          text: "予定日",
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
    };
  },
});
</script>
