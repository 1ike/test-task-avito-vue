<template>
  <i-layout>
    <i-layout-header class="app-header">
      <i-navbar class="app-navbar">
        <i-navbar-brand to="/" class="app-brand _margin-left:2">
          Avito test task
        </i-navbar-brand>
        <div class="_margin-right:3">
          <slot name="header"></slot>
        </div>
      </i-navbar>

      <!-- <router-link to="Home">Home</router-link> -->
    </i-layout-header>
    <i-layout-content>
      <i-container class="_margin-top:2 _margin-bottom:2">
        <slot></slot>
      </i-container>
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
