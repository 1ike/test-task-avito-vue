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
      v-show="ids && (showChildren || !root)"
      v-for="commentId in ids"
      :key="commentId" :id="commentId"
    />
  </i-card>
</template>


<script setup lang="ts">
import {
  computed, inject, ref, toRefs,
} from 'vue';
import sanitizeHtml from 'sanitize-html';
import DelimiterVertical from '@/components/DelimiterVertical.vue';
import { formatDate, getLiveCommentIds } from '@/lib';
import { ID } from '@/types';
import { Comments } from '@/API';


// eslint-disable-next-line no-undef
const props = defineProps<{ id: ID, root?: boolean }>();
const { id } = toRefs(props);

const showChildren = ref(false);
const toggleChildrenVisibility = () => {
  showChildren.value = !showChildren.value;
};

const comments = inject('comments') as Comments;
const comment = computed(() => comments[id.value]);

const ids = computed(() => getLiveCommentIds(comment.value?.kids, comments));
</script>
