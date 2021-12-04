<template>
  <v-app>
    このページはログイン前のレイアウト「home.vue」が使用されています。
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// 本来のログインは、別ドメインに準備するなどの対策が必要。
// 今回はnuxtへの習熟が目的のため、暫定的なログイン画面として実装。
export default {};
</script>
