<template>
  <form class="max-w-sm mx-auto" @submit.prevent="onSubmit">
    <div class="mb-5">
      <label
        for="destination"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Destination</label
      >
      <select
        v-model="formShippingCost.destination"
        id="destination"
        class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option :value="null" selected>Choose a destination</option>
        <option
          v-for="destination in destinationOptions"
          :key="destination.value"
          :value="destination.value"
        >
          {{ destination.label }}
        </option>
      </select>
    </div>
    <div class="mb-5">
      <label
        for="priority"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Priority</label
      >
      <select
        v-model="formShippingCost.priority"
        id="priority"
        class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option :value="null" selected>Choose a priority</option>
        <option
          v-for="priority in priorityOptions"
          :key="priority.value"
          :value="priority.value"
        >
          {{ priority.label }}
        </option>
      </select>
    </div>
    <div class="mb-5">
      <label
        for="weight"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Dependents</label
      >
      <input
        v-model="formShippingCost.weight"
        type="number"
        id="weight"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Input weight"
        required
      />
    </div>
    <Alert v-if="errors.length > 0" :contents="errors" />
    <button
      type="submit"
      :disabled="isLoading"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {{ isLoading ? "Submitting..." : "Submit" }}
    </button>
    <div
      v-if="shippmentCost.getShippingCost != 0"
      class="mt-4 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      Your Shipment Cost is ${{ shippmentCost.getShippingCost }}
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ShippingDestination, ShippingPriority } from "~/types/ShippingCost";

const shippmentCost = useShippingCost();
const formShippingCost = computed(() => {
  return shippmentCost.getShippingForm;
});

const destinationOptions = ref([
  { value: ShippingDestination.DOMESTIC, label: "Domestic" },
  { value: ShippingDestination.INTERNATIONAL, label: "International" },
]);

const priorityOptions = ref([
  { value: ShippingPriority.STANDARD, label: "Standard" },
  { value: ShippingPriority.EXPRESS, label: "Express" },
  { value: ShippingPriority.PRIORITY, label: "Priority" },
]);

const isLoading = ref(false);
const errors = ref<string[]>([]);

const onSubmit = async () => {
  isLoading.value = true;
  shippmentCost.setShippingCost(0);
  errors.value = []; // Reset errors before validation

  // Input validation
  // check if destination is not null
  if (
    formShippingCost.value.destination !== ShippingDestination.DOMESTIC &&
    formShippingCost.value.destination !== ShippingDestination.INTERNATIONAL
  ) {
    return "Invalid destination";
  }
  // check if weight is greater than 0
  if (formShippingCost.value.weight && formShippingCost.value.weight <= 0) {
    return "Invalid weight";
  }
  // check if priority is not null
  if (
    formShippingCost.value.priority !== ShippingPriority.STANDARD &&
    formShippingCost.value.priority !== ShippingPriority.EXPRESS &&
    formShippingCost.value.priority !== ShippingPriority.PRIORITY
  ) {
    return "Invalid priority";
  }

  if (errors.value.length > 0) {
    isLoading.value = false;
    return;
  }
  // get result from calculateTax in store
  const result = await shippmentCost.calculateShippingCost(
    formShippingCost.value.destination,
    formShippingCost.value.weight as number,
    formShippingCost.value.priority
  );
  isLoading.value = false;
  // set result in store
  shippmentCost.setShippingCost(+result);
};
</script>

<style></style>
