import {
  CREATE_PRODUCT,
  DELETE_PRODUCT_ONE,
  UPDATE_PRODUCT_ONE,
} from "~/graphql/mutations/product";
import { GET_CATEGORIES } from "~/graphql/queries/category";
import { GET_PRODUCTS } from "~/graphql/queries/product";
import type { CategoriesResult, Category } from "~/types/Category";
import type { Product, ProductResult } from "~/types/Products";

const INIT_FORM_PRODUCT = {
  id: 0,
  name: "",
  price: 0,
  quantity: 0,
  category_id: 0,
};

export const useProduct = defineStore("useProduct", {
  state: () => ({
    formProduct: reactive({ ...INIT_FORM_PRODUCT }),
    products: [] as Product[],
    currentPage: 1,
    itemsPerPage: 10,
    categoryOptions: [] as Category[],
  }),
  getters: {
    getformProduct: (state) => {
      return state.formProduct;
    },
    getCurrentPage: (state) => {
      return state.currentPage;
    },
    getItemsPerPage: (state) => {
      return state.itemsPerPage;
    },
    getTotalPage: (state) => {
      return Math.ceil(state.products.length / state.itemsPerPage);
    },
    paginatedCategories: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.products.slice(start, end);
    },
    getCategoryOptions: (state) => {
      return state.categoryOptions;
    },
  },
  actions: {
    setFormProduct(product: Product) {
      this.formProduct.id = product.id;
      this.formProduct.name = product.name;
      this.formProduct.price = product.price;
      this.formProduct.quantity = product.quantity;
      this.formProduct.category_id = product.category_id;
    },
    resetFormProduct() {
      this.formProduct = {
        ...INIT_FORM_PRODUCT,
      };
    },
    async createProduct() {
      try {
        const { mutate, onError } = useMutation(CREATE_PRODUCT);
        await mutate({
          name: this.formProduct.name,
          price: this.formProduct.price,
          quantity: this.formProduct.quantity,
          category_id: this.formProduct.category_id,
        });
        onError((error) => {
          throw error;
        });
        await this.fetchProducts(); // Refetch products after creation
      } catch (error) {
        console.error("Failed to create product:", error);
      }
    },
    async updateProduct() {
      try {
        const { mutate, onError } = useMutation(UPDATE_PRODUCT_ONE);
        await mutate({
          id: this.formProduct.id,
          name: this.formProduct.name,
          price: this.formProduct.price,
          quantity: this.formProduct.quantity,
          category_id: this.formProduct.category_id,
        });
        onError((error) => {
          throw error;
        });
        await this.fetchProducts(); // Refetch products after update
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    },
    async deleteProduct(idProduct: number) {
      try {
        const { mutate, onError } = useMutation(DELETE_PRODUCT_ONE);
        await mutate({
          id: idProduct,
        });
        onError((error) => {
          throw error;
        });
        await this.fetchProducts(); // Refetch products after deletion
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    },
    async fetchProducts() {
      try {
        const { onResult, onError } = useQuery<ProductResult>(GET_PRODUCTS);
        onResult(({ data }) => {
          this.products = data?.products || [];
        });
        onError((error) => {
          throw error;
        });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
    setPage(page: number) {
      this.currentPage = page;
    },
    setCategoryOptions(categories: Category[]) {
      this.categoryOptions = categories;
    },
    async fetchCategoryOptions() {
      try {
        const { onResult, onError } =
          useQuery<CategoriesResult>(GET_CATEGORIES);
        onResult(({ data }) => {
          this.categoryOptions = data?.categories || [];
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
