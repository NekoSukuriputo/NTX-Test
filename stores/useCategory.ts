import {
  CREATE_CATEGORY_ONE,
  UPDATE_CATEGORY_ONE,
} from "~/graphqL/mutations/category";
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
    async createCategory() {
      try {
        const { mutate, onError } = useMutation(CREATE_CATEGORY_ONE);
        await mutate({
          name: this.formCategory.name,
        });
        onError((error) => {
          throw error;
        });
      } catch (error) {
        console.error("Failed to create category:", error);
      }
    },
    async updateCategory() {
      try {
        const { mutate, onError } = useMutation(UPDATE_CATEGORY_ONE);
        await mutate({
          name: this.formCategory.name,
          id: this.formCategory.id,
        });
        onError((error) => {
          throw error;
        });
      } catch (error) {
        console.error("Failed to create category:", error);
      }
    },
    async fetchCategories(limit: number, offset: number) {
      try {
        const { onResult, onError } = useQuery<CategoriesResult>(
          GET_CATEGORIES,
          {
            limit: limit,
            offset: offset,
          }
        );
        onResult(({ data }) => {
          this.categories = data?.categories;
        });
        onError((error) => {
          throw error;
        });
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },
  },
});
