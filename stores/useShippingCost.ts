import {
  ShippingDestination,
  ShippingPriority,
  type ShippingCostForm,
} from "~/types/ShippingCost";

const INIT_SHIPPING: ShippingCostForm = {
  destination: null,
  weight: null,
  priority: null,
};

export const useShippingCost = defineStore("useShippingCost", {
  state: () => ({
    shippingCost: 0,
    shippingForm: {
      ...INIT_SHIPPING,
    },
  }),
  getters: {
    getShippingCost: (state) => {
      return state.shippingCost;
    },
  },
  actions: {
    setShippingCost(cost: number) {
      this.shippingCost = cost;
    },
    calculateShippingCost(
      destination: ShippingDestination,
      weight: number,
      priority: ShippingPriority
    ): string | number {
      // Input validation
      if (
        destination !== ShippingDestination.DOMESTIC &&
        destination !== ShippingDestination.INTERNATIONAL
      ) {
        return "Invalid destination";
      }
      if (weight <= 0) {
        return "Invalid weight";
      }
      if (
        priority !== ShippingPriority.STANDARD &&
        priority !== ShippingPriority.EXPRESS &&
        priority !== ShippingPriority.PRIORITY
      ) {
        return "Invalid priority";
      }

      // Define base costs and additional cost thresholds
      const baseCosts = {
        domestic: { standard: 5, express: 10, priority: 20 },
        international: { standard: 15, express: 25, priority: 50 },
      };

      const additionalCostThresholds = {
        domestic: { weight: 10, cost: 10 },
        international: { weight: 5, cost: 50 },
      };

      // Calculate base cost
      const baseCostPerKg = baseCosts[destination][priority];

      // Calculate additional cost if applicable
      const additionalCost =
        weight > additionalCostThresholds[destination].weight
          ? additionalCostThresholds[destination].cost
          : 0;

      // Calculate total cost
      const totalCost = baseCostPerKg * weight + additionalCost;

      return totalCost;
    },
  },
});
