import {
  CREATE_PRODUCT,
  DELETE_PRODUCT_ONE,
  UPDATE_PRODUCT_ONE,
} from "~/graphql/mutations/product";
import { GET_PRODUCTS } from "~/graphql/queries/product";
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
  },
  actions: {
    setformProduct(product: Product) {
      this.formProduct.id = product.id;
      this.formProduct.name = product.name;
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
          name: this.formProduct.name,
          id: this.formProduct.id,
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
  },
});
