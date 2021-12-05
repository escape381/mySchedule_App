<template>
  <div>
    <v-card class="mx-auto" max-width="344" light>
      <v-card-title>ログイン</v-card-title>
      <v-card-subtitle
        >ユーザIDとパスワードを入力してください。</v-card-subtitle
      >
      <v-text-field class="mx-4" v-model="userId"></v-text-field>
      <v-text-field class="mx-4" v-model="password"></v-text-field>
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
    Login: async function () {
      let result = await Login(this.userId, this.password);
      if (result) {
        LoginStore.login();
        // Todo 行先も適当
        this.$router.push("/inspire");
      } else {
        console.log("失敗！！！");
      }
    },
  },
});
</script>
