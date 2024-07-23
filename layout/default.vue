<template>
  <div class="container mx-auto flex flex-col">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useFlowbite } from "~/composables/useFlowbite";
onMounted(() => {
  useFlowbite(() => {
    initFlowbite();
  });
});
</script>

<style></style>
