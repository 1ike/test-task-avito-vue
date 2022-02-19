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

    <template v-if="story">
      <div class="app-dark-theme-text-color _display:flex _flex-direction:column">
        <h1>{{ story.title }}</h1>
        <dl class="_display:flex _flex-wrap:wrap _margin-top:1">
          <dt>Author</dt>
          <dd>{{ story.by }}</dd>
          <dt>Date</dt>
          <dd>{{ formatDate(story.time) }}</dd>
          <template v-if="story.url">
            <dt>Link</dt>
            <dd>
              <a href="{{ story.url }}">{{ story.url }}</a>
            </dd>
          </template>
          <template v-if="story.text">
            <dt>Text</dt>
            <dd v-html="story.text"></dd>
          </template>
        </dl>
      </div>
      <Comments />
    </template>

    <i-loader color="primary" v-if:="loading" class="app-loader"/>

    <i-alert color="warning" v-if:="error">
      <template #icon>
        <i-icon name="ink-warning" />
      </template>
      <span>
        {{ error }}
        <br />
        <br />Try to refresh the page.
      </span>
    </i-alert>
  </Layout>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Layout from '@/components/Layout.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import { formatDate } from '@/lib';
import { RequestStatus } from '@/store/types';
import Comments from './Comments.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

const error = ref();

const requestStatus = ref(RequestStatus.IDLE);
const loading = computed(() => requestStatus.value === RequestStatus.REQUEST);

const id = Number(route.params.id);

const story = computed(() => store.getters['stories/getStory'](id));

const goHome = () => router.push({ name: 'Home' });
console.log('loading = ', loading);
onMounted(() => {
  if (!story.value) {
    requestStatus.value = RequestStatus.REQUEST;
    store
      .dispatch('stories/fetchStory', id)
      .then(() => {
        requestStatus.value = RequestStatus.SUCCESS;
      })
      .catch((e) => {
        requestStatus.value = RequestStatus.FAILURE;
        error.value = e;
      });
  }
});
</script>


<style scoped lang="scss">
.-dark .app-dark-theme-text-color {
  color: white;
}

.app-loader {
  margin-left: 50%;
  transform: translate(-50%);
  margin-top: 3em;
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
