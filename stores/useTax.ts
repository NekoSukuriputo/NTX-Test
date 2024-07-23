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
    getTaxResult: (state) => {
      return state.taxResult;
    },
  },
  actions: {
    setTaxResult(result: string | number) {
      this.taxResult = result;
    },
    async calculateTax(
      income: number,
      age: number,
      dependents: number
    ): Promise<string | number> {
      // Recursive function to calculate tax
      function calculateRecursive(
        income: number,
        age: number,
        dependents: number
      ): number {
        // Base tax based on income
        let baseTax = 0;
        if (income <= 10000) {
          baseTax = income * 0.1;
        } else if (income <= 50000) {
          baseTax = income * 0.2;
        } else {
          baseTax = income * 0.3;
        }

        // Discount for age 65 or older
        if (age >= 65) {
          baseTax *= 0.8; // 20% discount
        }

        // Deduction for dependents
        const deduction = dependents * 500;
        baseTax -= deduction;

        // Ensure minimum tax is $0
        if (baseTax < 0) {
          baseTax = 0;
        }

        return baseTax;
      }

      // Calculate and return the tax
      return calculateRecursive(income, age, dependents);
    },
  },
});
