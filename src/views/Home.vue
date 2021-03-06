<template>
  <Layout>
    <template v-slot:header>
      <ButtonRefresh
        :disabled="loading"
        @refresh="refresh"
        tooltipText="Refresh News"
        tooltipPlacement="left"
      />
    </template>

    <template v-slot:default>
      <router-link
        v-bind:to="{ name: 'Story', params: { id: story.id } }"
        v-for="story in stories"
        v-bind:key="story.id"
        class="app-link-card"
      >
        <i-card class="_margin-bottom:1/2" size="lg">
          <template #header>
            <h2 class="h5">{{ story.title }}</h2>
            <small class="_display:block _margin-top:1">
              {{ story.score }} points
              <DelimiterVertical />
              {{ story.by }}
              <DelimiterVertical />
              {{ formatDate(story.time) }}
              <span v-if="story.kids">
                <DelimiterVertical />
                <span>Has comments</span>
              </span>
            </small>
          </template>
        </i-card>
      </router-link>
      <ButtonPrimary
        v-if="stories.length"
        @click="showMore"
        :disabled="loading"
        tooltipText="Show more"
        class="_margin-top:2 _margin-left:2 _margin-bottom:2"
      />
      <FullScreenLoader :loading="loading" />
    </template>
  </Layout>
</template>


<script setup lang="ts">
import {
  ref, onMounted, computed, onUnmounted,
} from 'vue';
import { useStore } from 'vuex';

import Layout from '@/components/Layout.vue';
import ButtonRefresh from '@/components/ButtonRefresh.vue';
import DelimiterVertical from '@/components/DelimiterVertical.vue';
import FullScreenLoader from '@/components/FullScreenLoader.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import config from '@/config';
import { formatDate, polling } from '@/lib';
import { RequestStatus } from '@/store/types';

const store = useStore();

const stories = computed(() => store.getters['stories/getNewestStories']);

const timer = ref();

const requestStatus = ref(RequestStatus.IDLE);
const loading = computed(() => requestStatus.value === RequestStatus.REQUEST);

const storyQty = computed(() => store.getters['stories/getStoryQty']);

const pollingStories = () => polling({
  timer,
  successCallback: () => {
    requestStatus.value = RequestStatus.REQUEST;
    return store
      .dispatch('stories/fetchNewestStories', storyQty.value)
      .then(() => {
        requestStatus.value = RequestStatus.SUCCESS;
      });
  },
});

const refresh = () => pollingStories();

const showMore = () => {
  store.commit('stories/setStoryQty', { storyQty: storyQty.value + config.STORIES_QTY_PER_PAGE });
  refresh();
};

onMounted(() => {
  pollingStories();
});

onUnmounted(() => {
  clearInterval(timer.value);
});
</script>
