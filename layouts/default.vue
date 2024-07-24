<template>
  <main class="container mx-auto">
    <slot />
  </main>
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
