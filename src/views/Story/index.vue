<template>
  <Layout>
    <template v-slot:header>
      <ButtonPrimary @click="goHome">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="_margin-right:1 _margin-bottom:1/4"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0
            .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0
            .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0
            0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0
            0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
          />
        </svg>
        Back to the News List
      </ButtonPrimary>
    </template>

    <template v-slot:default>
      <div class="app-story _display:flex _flex-direction:column">
        <h1 class>{{ story.title }}</h1>
        <dl class="_display:flex _flex-wrap:wrap _margin-top:1">
          <dt class>Author</dt>
          <dd class>{{ story.by }}</dd>
          <dt class>Date</dt>
          <dd class>{{ formatDate(story.time) }}</dd>
          <template v-if="story.url">
            <dt>Link</dt>
            <dd>
              <a href="{{story.url}}">{{ story.url }}</a>
            </dd>
          </template>
          <template v-if="story.text">
            <dt>Text</dt>
            <dd v-html="story.text"></dd>
          </template>
        </dl>
      </div>
      <FullScreenLoader :loading="loading" />
      <Comments />
    </template>
  </Layout>
</template>


<script setup lang="ts">
import {
  ref, onMounted, computed, onUnmounted,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Layout from '@/components/Layout.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import DelimiterVertical from '@/components/DelimiterVertical.vue';
import FullScreenLoader from '@/components/FullScreenLoader.vue';
import config from '@/config';
import { formatDate, polling } from '@/lib';
import { RequestStatus } from '@/store/types';
import Comments from './Comments.vue';

const route = useRoute();
const router = useRouter();
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

const goHome = () => router.push({ name: 'Home' });

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
