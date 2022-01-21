<template>
  <div>
    <v-btn @click="Err500">Err500</v-btn>
    <v-btn @click="Err404">Err404</v-btn>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Err404, Err500 } from "~/api/test";

export default Vue.extend({
  // dataは、関数で定義する
  data: function () {
    return {
      userId: "",
      password: "",
    };
  },
  layout: () => {
    // layoutを指定することで、使われる外枠の部分変えられるみたい。
    return "home";
  },
  methods: {
    Err500: async function () {
      let result = await Err500(1000);
    },
    Err404: async function () {
      let result = await Err404(1000);
    },
  },
});
</script>
