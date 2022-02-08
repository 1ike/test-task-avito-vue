<template>
  <Layout>
    <template v-slot:header>
      <i-button color="primary">
        <i-icon name="ink-plus" class="_margin-right:1/2" />
        Button Icon
      </i-button></template
    >
    <template v-slot:default>
      <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
      </div>
    </template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/components/Layout.vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Layout,
    HelloWorld,
  },
});
</script>
