<template>
  <i-card v-if="comment" class="_margin-bottom:1/2" size="lg">
    <template #header>
      {{ comment.by }}
      <DelimiterVertical />
      {{ formatDate(comment.time) }}
      <span v-if="comment.kids">
        <DelimiterVertical />
        <button class="card--button" color="primary">
          {{ true ? 'hide answers' : 'show answers' }}
        </button>
      </span>
    </template>
    <div v-html="comment.text"></div>
  </i-card>
</template>


<script setup lang="ts">
import {
  ref, onMounted, computed, onUnmounted, toRefs,
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
import { ID } from '@/types';


// eslint-disable-next-line no-undef
const props = defineProps<{ id: ID }>();
const { id } = toRefs(props);

const route = useRoute();
const store = useStore();

// const timer = ref();

const requestStatus = ref(RequestStatus.IDLE);
const loading = computed(() => requestStatus.value === RequestStatus.REQUEST);

const comment = computed(() => store.getters['comments/getComment'](id.value));


onMounted(() => {
  store
    .dispatch('comments/fetchComment', id.value)
    .then(() => {
      requestStatus.value = RequestStatus.SUCCESS;
    });
});

onUnmounted(() => {
  // clearInterval(timer.value);
});
</script>


<style scoped lang="scss">
$color: white;
.-dark .app-comments-header {
  color: $color;
}
</style>
