import { GET_CATEGORIES } from "~/graphqL/queries/category";
import type { CategoriesResult, Category } from "~/types/Category";

const INIT_FORM_CATEGORY = {
  id: 0,
  name: "",
};

export const useCategory = defineStore("useCategory", {
  state: () => ({
    formCategory: {
      ...INIT_FORM_CATEGORY,
    } as Category,
    categories: [] as Category[],
  }),
  getters: {
    getCategories: (state) => {
      return state.categories;
    },
    getFormCategory: (state) => {
      return state.formCategory;
    },
  },
  actions: {
    setFormCategory(category: Category) {
      this.formCategory = category;
    },
    resetFormCategory() {
      this.formCategory = {
        ...INIT_FORM_CATEGORY,
      };
    },
    async fetchCategories(limit:number, offset:number) {
      try {
        const { result } = await useQuery<CategoriesResult>(GET_CATEGORIES, {
          variables: {
            limit,
            offset,
          },
        });
        this.categories = result.data.categories;
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },
  },
});
