<template>
  <Teleport to="body">
    <i-loader v-if="loading" color="primary" size="lg" class="loader"/>
  </Teleport>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
defineProps<{
  loading: boolean
}>();
</script>


<style scoped lang="scss">
.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
