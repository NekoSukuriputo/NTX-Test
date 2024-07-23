import type { Tax } from "~/types/Tax";

const INIT_TAX: Tax = {
  income: 0,
  age: 0,
  dependents: 0,
};
export const useTax = defineStore({
  id: "useTax",
  state: () => ({
    tax: { ...INIT_TAX },
    taxResult: "" as string | number,
  }),
  getters: {
    getFormTax: (state) => {
      return state.tax;
    },
  },
  actions: {
    calculateTax(
      income: number,
      age: number,
      dependents: number
    ): string | number {
      // Calculate tax in a single expression
      const baseTax = Math.max(
        0,
        income * (age >= 65 ? 0.08 : 0.1) - dependents * 500
      );

      return baseTax;
    },
  },
});
