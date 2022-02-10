<template>
  <i-tooltip :placement="tooltipPlacement">
    <i-button
      @click="$emit('refresh')"
      color="primary"
      :disabled="disabled"
    >
      <i-icon
        name="mdi-autorenew48"
        class="app-icon"
        :class="{ rotating: disabled }"
      />
    </i-button>
    <template #body>{{ tooltipText }}</template>
  </i-tooltip>
</template>


<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'RefreshButton',
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
