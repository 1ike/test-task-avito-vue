<template>
  <section>
    <header class="_display:flex _align-items:center">
      <h2 class="app-comments-header">Comments</h2>
      <div>
        <ButtonRefresh
          :disabled="loading"
          @refresh="refresh"
          tooltipText="Refresh comments"
          tooltipPlacement="left"
          class="_margin-left:2 _margin-top:2"
        />
      </div>
    </header>
  </section>
</template>


<script setup lang="ts">
import {
  ref, onMounted, computed, onUnmounted,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Layout from '@/components/Layout.vue';
import ButtonRefresh from '@/components/ButtonRefresh.vue';
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


<style scoped lang="scss">
$color:white;
.-dark .app-comments-header{
  color: $color;
 }
</style>
