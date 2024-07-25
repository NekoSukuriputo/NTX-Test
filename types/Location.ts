import type { Company } from "./Companies";

export type Location= {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    companies: Company[];
}