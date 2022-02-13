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


<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Layout from '@/components/Layout.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import RefreshButton from '@/components/RefreshButton.vue';
import { getNewestStories } from '@/API';
import config from '@/config';

const refresh = ref(() => alert(1));
const disabled = ref(false);

const storyQty = ref(config.STORIES_QTY_PER_PAGE);

onMounted(() => {
  getNewestStories(storyQty.value).then((res) => console.log('res = ', res));
});
</script>
