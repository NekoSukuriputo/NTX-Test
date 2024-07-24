<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <slot name="header"></slot>
      </thead>
      <tbody>
        <slot name="content"></slot>
      </tbody>
    </table>
    <div class="mt-2">
        <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
