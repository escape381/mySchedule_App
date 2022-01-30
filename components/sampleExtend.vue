<template>
  <p>{{ greet() }} World!</p>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      greeting: "Extend",
    };
  },
  methods: {
    greet() {
      return this.greeting;
    },
  },
});
</script>
