import type { Company } from "./Companies";

export type Product = {
  id: number;
  name: string;
  price: number;
  category_id: number;
  quantity: number;
  company_id?: number;
  company?: Company;
};

export type ProductResult = {
  products: {
    id?: string;
    name: string;
    price: number;
    category_id: number;
    quantity: number;
    company_id?: number;
  }[];
};
