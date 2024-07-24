<template>
  <div class="mx-20 my-10">
    <div>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Add Category
      </button>
    </div>
    <Table>
      <template #header>
        <tr>
          <th
            v-for="(item, index) in headers"
            :key="index"
            scope="col"
            class="px-6 py-3"
          >
            {{ item }}
          </th>
        </tr>
      </template>
      <template #content>
        <tr
          v-for="(category, index) in result.categories"
          :key="index"
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
        >
          <td class="px-6 py-4">
            {{ category.id }}
          </td>
          <td class="px-6 py-4">
            {{ category.name }}
          </td>
          <td class="px-6 py-4">
            <div class="flex space-x-3">
              <span
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                @click="onEdit(category.id)"
                >Edit</span
              >
              <span
                @click="onDelete(category.id)"
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
                >Delete</span
              >
            </div>
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { GET_CATEGORIES } from "~/graphqL/queries/category";
import type { CategoriesResult } from "~/types/Category";
definePageMeta({
  layout: "crud-layout",
});

const { result } = await useQuery<CategoriesResult>(GET_CATEGORIES, {
  limit: 10,
});

const headers = ["ID", "Name", "Actions"];

const onEdit = async (id: number) => {
  // TODO
};
const onDelete = async (id: number) => {
  // TODO
};
</script>

<style></style>
