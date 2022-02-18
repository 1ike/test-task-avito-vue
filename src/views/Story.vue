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
    <div class="app-story">
      <h1 class="">{{story.title}}</h1>
      <dl class="app-story__definitions">
        <dt class="">Author</dt>
        <dd class="">{{story.by}}</dd>
        <dt class="">Date</dt>
        <dd class="">{{formatDate(story.time)}}</dd>
        <template v-if="story.url">
          <dt>Link</dt>
          <dd><a href={{story.url}}>{{story.url}}</a></dd>
        </template>
        <template v-if="story.text">
              <dt >Text</dt>
              <dd v-html="story.text"></dd>
        </template>
      </dl>
    </div>
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


<style scoped lang="scss">
.-dark .app-story {
  color: white;
 }
.app-story {
  display: flex;
  flex-direction: column;
}
.app-story__definitions {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
$dtWidth: 100px;
dt {
  flex: 0 0 auto;
  width: $dtWidth;
  // font-weight: 500;
}
dd {
  flex: 0 0 auto;
  width: calc(100% - $dtWidth);
  margin-left: 0;
  margin-bottom: 0.5rem;
}
</style>
