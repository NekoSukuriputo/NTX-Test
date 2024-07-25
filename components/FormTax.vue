<template>
  <form class="max-w-sm mx-auto" @submit.prevent="onSubmit">
    <div class="mb-5">
      <label
        for="input-group-1"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Income</label
      >
      <div class="relative mb-6">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
        >
          <span class="text-gray-500 dark:text-gray-400">$</span>
        </div>
        <input
          v-model="formTax.income"
          type="text"
          id="input-group-1"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Input income"
          required
          @keypress="isNumber($event)"
        />
      </div>
    </div>
    <div class="mb-5">
      <label
        for="age"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Age</label
      >
      <input
        v-model="formTax.age"
        type="number"
        id="age"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Input age"
        required
      />
    </div>
    <div class="mb-5">
      <label
        for="dependents"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Dependents</label
      >
      <input
        v-model="formTax.dependents"
        type="number"
        id="dependents"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Input dependents"
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
      v-if="taxStore.getTaxResult != '' || +taxStore.getTaxResult >= 0"
      class="mt-4 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      Your Tax is {{ dollarFormating(taxStore.getTaxResult) }}
    </div>
  </form>
</template>

<script lang="ts" setup>
const taxStore = useTax();
const formTax = computed(() => {
  return taxStore.getFormTax;
});

const isLoading = ref(false);
const errors = ref<string[]>([]);

const onSubmit = async () => {
  isLoading.value = true;
  taxStore.setTaxResult("");
  errors.value = []; // Reset errors before validation

  // Input validation
  // check if income, age, and dependents are numbers
  // check if income, age, and dependents are greater than 0
  if (+formTax.value.income < 0) {
    errors.value.push("Invalid income");
  }
  if (typeof formTax.value.age !== "number" || formTax.value.age < 0) {
    errors.value.push("Invalid age");
  }
  if (
    typeof formTax.value.dependents !== "number" ||
    formTax.value.dependents < 0
  ) {
    errors.value.push("Invalid dependents");
  }

  // If age is less than 18, "Not eligible for tax"
  if (formTax.value.age < 18) {
    errors.value.push("Not eligible for tax");
  }

  if (errors.value.length > 0) {
    isLoading.value = false;
    return;
  }
  // get result from calculateTax in store
  const result = await taxStore.calculateTax(
    +formTax.value.income,
    +formTax.value.age,
    +formTax.value.dependents
  );
  isLoading.value = false;
  // set result in store
  taxStore.setTaxResult(result);
};
const isNumber = (event: KeyboardEvent) => {
  const char = String.fromCharCode(event.which);
  if (!/[0-9.]/.test(char)) {
    event.preventDefault();
  }
};
</script>

<style></style>
