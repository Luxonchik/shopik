import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminStore = create((set, get) => ({
  // STATE
  categories: [],
  products: [],
  // category
  categoryForm: { name: "", description: "" },
  editingCategory: null,
  categoryLoading: false,
  // product
  productForm: {
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  },
  editingProduct: null,
  productLoading: false,
  uploadingImage: false,

  //Other

  activeTab: "categories",

  setActiveTab: (tab) => set({ activeTab: tab }),

  loadCategories: async () => {
    set({ categoryLoading: true });
    try {
      const res = await axiosInstance.get("/categories");
      set({ categories: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error);
    } finally {
      set({ categoryLoading: false });
    }
  },
  setCategoryForm: (form) => set({ categoryForm: form }),

  createCategory: async () => {
    const { categoryForm } = get();
    set({ categoryLoading: true });

    try {
      await axiosInstance.post("/categories", {
        name: categoryForm.name,
        description: categoryForm.description,
      });
      set({
        categoryForm: { name: "", description: "" },
        editingCategory: null,
      });

      get().loadCategories();
    } catch (error) {
      return {
        success: false,
        message: toast.error(error.response?.data?.message) || "Failed create",
      };
    } finally {
      set({ categoryLoading: false });
    }
  },
  cancelEditCategory: () => {
    set({
      editingCategory: null,
      categoryForm: { name: "", description: "" },
    });
  },

  deleteCategory: async (id) => {
    set({ categoryLoading: true, error: null });
    try {
      await axiosInstance.delete(`/categories/${id}`);
      get().loadCategories();
      return { success: true, message: "Категория удалена!" };
    } catch (error) {
      set({ error: "Ошибка удаления категории" });
      return {
        success: false,
        message: toast.error(error.response?.data?.message) || "Failed delete",
      };
    } finally {
      set({ categoryLoading: false });
    }
  },

  // Товары

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

  setProductForm: (form) => set({ productForm: form }),

  createProduct: async () => {
    const { productForm } = get();
    set({ productLoading: true });

    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
        categoryId: parseInt(productForm.categoryId),
      };

      await axiosInstance.post("/products", productData);
      set({
        productForm: {
          name: "",
          description: "",
          price: "",
          stock: "",
          categoryId: "",
          imageUrl: "",
        },
        editingProduct: null,
      });
      get().loadProducts();
      toast.success("Product Created");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ productLoading: false });
    }
  },

  updateProduct: async () => {
    const { editingProduct, productForm } = get();
    set({ productLoading: true });

    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
        categoryId: parseInt(productForm.categoryId),
      };

      await axiosInstance.put(`/products/${editingProduct.id}`, productData);
      set({
        productForm: {
          name: "",
          description: "",
          price: "",
          stock: "",
          categoryId: "",
          imageUrl: "",
        },
        editingProduct: null,
      });

      get().loadProducts();
      toast.success("Product updated");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ productLoading: false });
    }
  },

  editProduct: (product) => {
    set({
      editingProduct: product,
      productForm: {
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        categoryId: product.category.id.toString(),
        imageUrl: product.imageUrl,
      },
    });
  },
  cancelEditProduct: () => {
    set({
      editingProduct: null,
      productForm: {
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        imageUrl: "",
      },
    });
  },

  deleteProduct: async (id) => {
    set({ productLoading: true });
    try {
      await axiosInstance.delete(`/products/${id}`);
      get().loadProducts();
      toast.success("Product deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed delete product");
    } finally {
      set({ productLoading: false });
    }
  },
}));
