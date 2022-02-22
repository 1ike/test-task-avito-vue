<template>
  <i-card
    v-if="comment"
    class="_margin-bottom:1 _margin-top:1"
    :class="{ '_margin-left:1': !root }"
  >
    <template #header>
      {{ comment.by }}
      <DelimiterVertical/>
      {{ formatDate(comment.time) }}
      <span v-if="root && comment.kids">
        <DelimiterVertical/>
        <i-button outline color="primary" @click="toggleChildrenVisibility">
          {{ showChildren ? 'hide answers' : 'show answers' }}
        </i-button>
      </span>
    </template>
    <div v-html="sanitizeHtml(comment.text)"></div>

    <Comment
      v-show="comment.kids && showChildren"
      v-for="commentId in comment.kids"
      :key="commentId" :id="commentId"
    />
  </i-card>
</template>


<script setup lang="ts">
import {
  ref, onMounted, computed, onUnmounted, toRefs,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import sanitizeHtml from 'sanitize-html';

import Layout from '@/components/Layout.vue';
import ButtonRefresh from '@/components/ButtonRefresh.vue';
import DelimiterVertical from '@/components/DelimiterVertical.vue';
import FullScreenLoader from '@/components/FullScreenLoader.vue';
import config from '@/config';
import { formatDate, polling } from '@/lib';
import { RequestStatus } from '@/store/types';
import { ID } from '@/types';


// eslint-disable-next-line no-undef
const props = defineProps<{ id: ID, root: boolean }>();
const { id } = toRefs(props);

const store = useStore();

const showChildren = ref(false);
const toggleChildrenVisibility = () => {
  showChildren.value = !showChildren.value;
};

const requestStatus = ref(RequestStatus.IDLE);
const loading = computed(() => requestStatus.value === RequestStatus.REQUEST);

const comment = computed(() => store.getters['comments/getComment'](id.value));


onMounted(() => {
  store
    .dispatch('comments/fetchComment', id.value)
    .then(() => {
      requestStatus.value = RequestStatus.SUCCESS;
    });
  console.log('comment = ', comment);
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
