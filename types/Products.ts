import type { Company } from "./Companies";

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  company_id: number;
  category_id: number;
  company: Company;
};
