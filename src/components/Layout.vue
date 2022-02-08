<template>
  <i-layout>
    <i-layout-header>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/story">Story</router-link>
      </div>
      <slot name="header"></slot>
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
</style>
