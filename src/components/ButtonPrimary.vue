<template>
  <i-tooltip
    :placement="tooltipPlacement"
    :class="{ 'app-button--disabled': disabled }"
    :disabled="!tooltipText"
  >
    <i-button @click="$emit('click')" color="primary" :disabled="disabled">
      <slot>{{ tooltipText }}</slot>
    </i-button>
    <template #body>{{ tooltipText }}</template>
  </i-tooltip>
</template>


<script setup lang="ts">
// eslint-disable-next-line no-undef
defineProps({
  disabled: {
    type: Boolean,
  },
  tooltipText: {
    type: String,
  },
  tooltipPlacement: {
    type: String,
    default: 'top',
  },
});

// eslint-disable-next-line no-undef
defineEmits(['click']);
</script>
