<template>
  <i-tooltip :placement="tooltipPlacement">
    <i-button
      @click="$emit('refresh')"
      color="primary"
      :disabled="disabled"
    >
      <svg class="app-icon" :class="{ rotating: disabled }" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="currentColor" data-v-f777c926=""><path d="M24 12v6l8-8-8-8v6C15.16 8 8 15.16 8 24c0 3.14.92 6.05 2.48 8.52l2.92-2.92c-.89-1.67-1.4-3.57-1.4-5.6 0-6.63 5.37-12 12-12zm13.52 3.48L34.6 18.4c.89 1.67 1.4 3.57 1.4 5.6 0 6.63-5.37 12-12 12v-6l-8 8 8 8v-6c8.84 0 16-7.16 16-16 0-3.14-.92-6.05-2.48-8.52z"></path></svg>
    </i-button>
    <template #body>{{ tooltipText }}</template>
  </i-tooltip>
</template>


<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
    },
    tooltipText: {
      type: String,
      default: 'Refresh',
    },
    tooltipPlacement: {
      type: String,
      default: 'top',
    },
  },
  emits: ['refresh'],
});
</script>


<style scoped lang="scss">
$size: 24;
.app-icon {
  width: #{$size}px;
  height: #{$size}px;
  fill: white;
}
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotating {
  animation: rotating 2s linear infinite;
}
</style>
