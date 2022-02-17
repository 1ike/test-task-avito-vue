<template>
  <Layout>
    <template v-slot:header>
      <RefreshButton
        :disabled="loading"
        @refresh="refresh"
        tooltipText="Refresh News"
        tooltipPlacement="left"
      />
    </template>

    <template v-slot:default>

      <FullScreenLoader :loading="loading" />
    </template>
  </Layout>
</template>


<script setup lang="ts">
import {
  ref, onMounted, computed, onUnmounted,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Layout from '@/components/Layout.vue';
import RefreshButton from '@/components/RefreshButton.vue';
import DelimiterVertical from '@/components/DelimiterVertical.vue';
import FullScreenLoader from '@/components/FullScreenLoader.vue';
import config from '@/config';
import { formatDate, polling } from '@/lib';
import { RequestStatus } from '@/store/types';

const route = useRoute();
const store = useStore();

const timer = ref();

const requestStatus = ref(RequestStatus.IDLE);
const loading = computed(() => requestStatus.value === RequestStatus.REQUEST);

const story = computed(() => store.getters['stories/getStory'](Number(route.params.id)));
console.log('story = ', story.value);
const pollingStories = () => polling({
  timer,
  successCallback: () => {
    requestStatus.value = RequestStatus.REQUEST;
    return store
      .dispatch('stories/fetchNewestStories', 1)
      .then(() => {
        requestStatus.value = RequestStatus.SUCCESS;
      });
  },
});

const refresh = () => pollingStories();

// onMounted(() => {
//   pollingStories();
// });

onUnmounted(() => {
  clearInterval(timer.value);
});
</script>

