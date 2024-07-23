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
        if (income <= 10000) { // if income is less than or equal to 10000
          baseTax = income * 0.1; // get 10% tax discount
        } else if (income <= 50000) { // if income is less than or equal to 50000
          baseTax = income * 0.2; // get 20% tax discount
        } else {
          baseTax = income * 0.3; // get 30% tax discount
        }

        // Discount for age 65 or older
        if (age >= 65) {
          baseTax *= 0.8; // 20% discount
        }

        // Deduction for dependents
        const deduction = dependents * 500; // $500 deduction for each dependent
        baseTax -= deduction;

        // Ensure minimum tax is $0
        if (baseTax < 0) {
          baseTax = 0; // set minimum tax to $0
        }

        return baseTax; // return base tax
      }

      // Calculate and return the tax
      return calculateRecursive(income, age, dependents);
    },
  },
});
