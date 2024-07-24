<template>
  <fwb-modal v-if="model" @close="closeModal" not-escapable>
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
    </template>
    <template #body>
      <form class="p-4 md:p-5" @submit.prevent="onSubmit">
        <div class="grid gap-4 mb-4 grid-cols-2">
          <div class="col-span-2">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Name</label
            >
            <input
              :value="formCategory.name"
              @change="onChangeName"
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type category name"
              required
            />
          </div>
        </div>
        <fwb-button
          :loading="loading"
          color="default"
          loading-position="suffix"
          outline
          type="submit"
        >
          Save Category
        </fwb-button>
      </form>
    </template>
  </fwb-modal>
</template>

<script lang="ts" setup>
import { FwbModal, FwbButton } from "flowbite-vue";
const categoryStore = useCategory();

const formCategory = computed(() => {
  return categoryStore.formCategory;
});

const onChangeName = (event: Event & { target: HTMLInputElement }) => {
  if (event.target) {
    formCategory.value.name = event.target.value;
  }
};

const model = defineModel();

const emit = defineEmits(["submit"]);

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});

const closeModal = () => {
  model.value = false;
};
const onSubmit = () => {
  emit("submit");
};
</script>

<style></style>
