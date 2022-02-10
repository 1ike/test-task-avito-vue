<template>
  <Layout>
    <template v-slot:header>
      <RefreshButton
        :disabled="disabled"
        @refresh="refresh"
        tooltipText="Refresh News"
        tooltipPlacement="left"
      />
    </template>
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
import RefreshButton from '@/components/RefreshButton.vue';


export default defineComponent({
  name: 'Home',
  components: {
    Layout,
    HelloWorld,
    RefreshButton,
  },

  setup() {
    return {
      refresh: () => alert(1),
      disabled: false,
    };
  },
});
</script>
