export enum ShippingDestination {
  DOMESTIC = "domestic",
  INTERNATIONAL = "international",
}

export enum ShippingPriority {
  STANDARD = "standard",
  EXPRESS = "express",
  PRIORITY = "priority",
}

export type ShippingCostForm = {
  destination: ShippingDestination | null;
  weight: number | null;
  priority: ShippingPriority | null;
};
