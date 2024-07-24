export type Category = {
    id: number;
    name: string;
}

export type CategoriesResult = {
    categories: {
      id?: string;
      name: string;
    }[]
  }