import {
  CREATE_CATEGORY_ONE,
  DELETE_CATEGORY_ONE,
  UPDATE_CATEGORY_ONE,
} from "~/graphql/mutations/category";
import { GET_CATEGORIES } from "~/graphql/queries/category";
import type { CategoriesResult, Category } from "~/types/Category";

const INIT_FORM_CATEGORY = {
  id: 0,
  name: "",
};

export const useCategory = defineStore("useCategory", {
  state: () => ({
    formCategory: reactive({ ...INIT_FORM_CATEGORY }),
    categories: [] as Category[],
    currentPage: 1,
    itemsPerPage: 10,
  }),
  getters: {
    getFormCategory: (state) => {
      return state.formCategory;
    },
    getCurrentPage: (state) => {
      return state.currentPage;
    },
    getItemsPerPage: (state) => {
      return state.itemsPerPage;
    },
    getTotalPage: (state) => {
      return Math.ceil(state.categories.length / state.itemsPerPage);
    },
    paginatedCategories: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.categories.slice(start, end);
    },
  },
  actions: {
    setFormCategory(category: Category) {
      this.formCategory.id = category.id;
      this.formCategory.name = category.name;
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
        await this.fetchCategories(); // Refetch categories after creation
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
        await this.fetchCategories(); // Refetch categories after update
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    },
    async deleteCategory(idCategory: number) {
      try {
        const { mutate, onError } = useMutation(DELETE_CATEGORY_ONE);
        await mutate({
          id: idCategory,
        });
        onError((error) => {
          throw error;
        });
        await this.fetchCategories(); // Refetch categories after deletion
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    },
    async fetchCategories() {
      try {
        const { onResult, onError } =
          useQuery<CategoriesResult>(GET_CATEGORIES);
        onResult(({ data }) => {
          this.categories = data?.categories || [];
        });
        onError((error) => {
          throw error;
        });
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },
    setPage(page: number) {
      this.currentPage = page;
    },
  },
});
