import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  categories: [],
  filteredProducts: [],
  selectedCategory: null,
  searchQuery: "",
  loading: false,


  loadProducts: async () => {
    set({ productLoading: true });
    try {
      const res = await axiosInstance.get("/products");
      set({ products: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message) || `Failed load products`;
    } finally {
      set({ productLoading: false });
    }
  },
}));
