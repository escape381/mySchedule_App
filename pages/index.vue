<template>
  <div>
    <v-card class="mx-auto" max-width="344" light>
      <v-card-title>ログイン</v-card-title>
      <v-card-subtitle
        >ユーザIDとパスワードを入力してください。</v-card-subtitle
      >
      <v-text-field class="mx-4"></v-text-field>
      <v-text-field class="mx-4"></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small @click="Login">OK</v-btn>
        <v-btn small>Cancle</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { LoginStore } from "~/store";
import { Login } from "~/api/login";
export default Vue.extend({
  layout: () => {
    // layoutを指定することで、使われる外枠の部分変えられるみたい。
    return "home";
  },
  methods: {
    Login: async function () {
      let result = await Login("1", "abcde");
      if (result) {
        LoginStore.login();
        this.$router.push("/inspire");
      } else {
        console.log("失敗！！！");
      }
      // Todo 行先も適当
    },
  },
});
</script>
