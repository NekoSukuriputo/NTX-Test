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
          <div class="col-span-2 space-y-7">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Name</label
              >
              <input
                :value="formProduct.name"
                @change="onChangeName"
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required
              />
            </div>
            <div>
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Price</label
              >
              <input
                :value="formProduct.price"
                @change="onChangePrice"
                type="text"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product price"
                required
                @keypress="isNumber($event)"
              />
            </div>
            <div>
              <label
                for="quantity"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Quantity</label
              >
              <input
                :value="formProduct.quantity"
                @change="onChangeQuantity"
                type="number"
                name="quantity"
                id="quantity"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product quantity"
                required
              />
            </div>
            <div>
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Category</label
              >
              <select
                :value="formProduct.category_id"
                @change="onChangeCategory"
                id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option :value="null" selected>Choose a Category</option>
                <option
                  v-for="category in categoryOptions"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <fwb-button
          :loading="loading"
          color="default"
          loading-position="suffix"
          outline
          type="submit"
        >
          Save Product
        </fwb-button>
      </form>
    </template>
  </fwb-modal>
</template>

<script lang="ts" setup>
import { FwbModal, FwbButton } from "flowbite-vue";
const productStore = useProduct();

const categoryOptions = computed(() => {
  return productStore.categoryOptions;
});

const formProduct = computed({
  get: () => productStore.formProduct,
  set: (value) => {
    productStore.formProduct = value;
  },
});

const onChangeName = (event: Event & { target: HTMLInputElement }) => {
  if (event.target) {
    formProduct.value.name = event.target.value;
  }
};

const onChangePrice = (event: Event & { target: HTMLInputElement }) => {
  if (event.target) {
    formProduct.value.price = +event.target.value;
  }
};

const onChangeCategory = (event: Event & { target: HTMLInputElement }) => {
  if (event.target) {
    formProduct.value.category_id = +event.target.value;
  }
};

const onChangeQuantity = (event: Event & { target: HTMLInputElement }) => {
  if (event.target) {
    formProduct.value.quantity = +event.target.value;
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
const isNumber = (event: KeyboardEvent) => {
  const char = String.fromCharCode(event.which);
  if (!/[0-9.]/.test(char)) {
    event.preventDefault();
  }
};
</script>

<style></style>
