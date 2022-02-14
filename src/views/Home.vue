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
      <div class="_margin-top:2 _margin-bottom:2">
        <router-link
          v-bind:to="{ name: 'Story', params: { id: story.id } }"
          v-for="story in stories"
          v-bind:key="story.id"
          class="link-card"
        >
          <i-card class="_margin-bottom:1/2 _text-align:left" size="lg">
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
      </div>
    </template>
  </Layout>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import Layout from '@/components/Layout.vue';
import RefreshButton from '@/components/RefreshButton.vue';
import DelimiterVertical from '@/components/DelimiterVertical.vue';
import { getNewestStories } from '@/API';
import config from '@/config';
import { formatDate } from '@/lib';

const store = useStore();

const stories = computed(() => store.getters['stories/getNewestStories']);

const refresh = ref(() => alert(1));
const disabled = ref(false);

const storyQty = ref(config.STORIES_QTY_PER_PAGE);

onMounted(() => {
  store.dispatch('stories/fetchNewestStories', storyQty.value);
});
</script>


<style lang="scss">
.link-card {
  &:hover {
    text-decoration: none;
  }
}
</style>
