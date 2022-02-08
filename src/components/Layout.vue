<template>
  <i-layout>
    <i-layout-header class="app-header">
      <i-navbar class="app-navbar">
        <i-navbar-brand to="/" class="app-brand">
          Avito test task
        </i-navbar-brand>
        <slot name="header"></slot>
      </i-navbar>

      <!-- <router-link to="Home">Home</router-link> -->
    </i-layout-header>
    <i-layout-content>
      <slot></slot>
    </i-layout-content>
  </i-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Layout',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-header {
  display: flex;
  flex-direction: row;
}
.app-navbar {
  flex-grow: 1;
}
.app-brand {
  font-size: 2em;
}
</style>
