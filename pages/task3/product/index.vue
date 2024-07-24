<template>
  <div class="mx-20 my-10">
    <div>
      <button
        @click="onAdd"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Add Category
      </button>
    </div>

    <!-- Main modal -->
    <FormCategory
      v-model="showModal"
      id="crud-modal"
      @submit="onSubmit"
      :loading="isLoading"
      :title="flag === 'add' ? 'Add Category' : 'Edit Category'"
    />
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
          v-if="paginatedCategories.length"
          v-for="(category, index) in paginatedCategories"
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
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                @click="onEdit(category)"
                >Edit</span
              >
              <span
                @click="onDelete(category.id)"
                class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                >Delete</span
              >
            </div>
          </td>
        </tr>
      </template>
      <template #pagination>
        <FwbPagination
          :modelValue="currentPage"
          :totalPages="totalPage"
          @update:model-value="onPageChange"
        />
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { FwbPagination } from "flowbite-vue";
import type { Category } from "~/types/Category";

const categoryStore = useCategory();
const formCategory = computed(() => categoryStore.getFormCategory);
const paginatedCategories = computed(() => categoryStore.paginatedCategories);
const currentPage = computed(() => categoryStore.getCurrentPage);
const totalPage = computed(() => categoryStore.getTotalPage);

const flag = ref("");
const showModal = ref(false);
const isLoading = ref(false);
definePageMeta({
  layout: "crud-layout",
});

const headers = ["ID", "Name", "Actions"];

onBeforeMount(async () => {
  await categoryStore.fetchCategories();
  flag.value = "";
});

const onAdd = () => {
  flag.value = "add";
  showModal.value = true;
  categoryStore.resetFormCategory();
};

const onEdit = (item: Category) => {
  flag.value = "edit";
  showModal.value = true;
  categoryStore.setFormCategory(item);
};

const onDelete = (idCategory: number) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      isLoading.value = true;
      try {
        await categoryStore.deleteCategory(idCategory);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }).then(() => {
          showModal.value = false;
          isLoading.value = false;
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong: " + error.message,
          icon: "error",
        });
        isLoading.value = false;
      }
    }
  });
};

const onSubmit = async () => {
  isLoading.value = true;
  try {
    if (flag.value === "add") {
      await categoryStore.createCategory();
      Swal.fire({
        title: "Success",
        text: "Your category has been added successfully",
        icon: "success",
      }).then(() => {
        showModal.value = false;
        isLoading.value = false;
      });
    } else if (flag.value === "edit") {
      await categoryStore.updateCategory();
      Swal.fire({
        title: "Success",
        text: "Your category has been updated successfully",
        icon: "success",
      }).then(() => {
        showModal.value = false;
        isLoading.value = false;
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Something went wrong: " + error.message,
      icon: "error",
    });
    isLoading.value = false;
  }
};

const onPageChange = (page: number) => {
  categoryStore.setPage(page);
};
</script>

<style></style>
