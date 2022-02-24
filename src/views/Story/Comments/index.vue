<template>
  <section v-if="commentsQty">
    <header class="_display:flex _align-items:center _margin-bottom:2">
      <h2 class="app-comments-header">Comments ({{ commentsQty }})</h2>
      <div>
        <ButtonRefresh
          :disabled="loading"
          @refresh="$emit('refresh')"
          tooltipText="Refresh comments"
          class="_margin-left:2 _margin-top:2"
        />
      </div>
    </header>
    <Comment v-for="id in rootCommentIds" :key="id" :id="id" root/>
  </section>
</template>


<script setup lang="ts">
/* eslint-disable import/first */
import { computed, provide, toRefs } from 'vue';

import { Comments } from '@/API';
import ButtonRefresh from '@/components/ButtonRefresh.vue';
import { ID } from '@/types';
import Comment from './Comment.vue';


// eslint-disable-next-line no-undef
defineEmits(['refresh']);

// eslint-disable-next-line no-undef
const props = defineProps<{ comments: Comments, rootCommentIds: ID[], loading: boolean }>();
const {
  comments,
  rootCommentIds,
} = toRefs(props);

const commentsQty = computed(() => Object.keys(comments.value).length);

provide('comments', comments.value);
</script>


<style scoped lang="scss">
$color: white;
.-dark .app-comments-header {
  color: $color;
}
</style>
