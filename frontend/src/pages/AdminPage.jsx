import { useAuthStore } from "../store/useAuthStore";
import { useAdminStore } from "../store/useAdminStore";

export default function AdminPage() {
  const { authUser } = useAuthStore();

  const {
    activeTab,
    setActiveTab,
    categories,
    products,
    categoryForm,
    productForm,
    editingCategory,
    editingProduct,
    categoryLoading,
    productLoading,
    uploadingImage,
    // loadCategories,
    // loadProducts,
    setCategoryForm,
    setProductForm,
    createCategory,
    updateCategory,
    editCategory,
    cancelEditCategory,
    deleteCategory,
    createProduct,
    updateProduct,
    editProduct,
    cancelEditProduct,
    deleteProduct,
    uploadImage,
  } = useAdminStore();

  // ========== HANDLERS ==========

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const result = editingCategory
      ? await updateCategory()
      : await createCategory();
    if (result.success) {
      document.getElementById("category_modal").close();
      showToast(result.message, "success");
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const result = editingProduct
      ? await updateProduct()
      : await createProduct();
    if (result.success) {
      document.getElementById("product_modal").close();
      showToast(result.message, "success");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await uploadImage(file);
    if (result.success) {
      showToast(result.message, "success");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Удалить категорию?")) {
      const result = await deleteCategory(id);
      showToast(result.message, result.success ? "success" : "error");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Удалить товар?")) {
      const result = await deleteProduct(id);
      showToast(result.message, result.success ? "success" : "error");
    }
  };

  const showToast = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `alert alert-${type} fixed top-4 right-4 w-auto z-50`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const openCategoryModal = (category = null) => {
    if (category) {
      editCategory(category);
    } else {
      cancelEditCategory();
    }
    document.getElementById("category_modal").showModal();
  };

  const openProductModal = (product = null) => {
    if (product) {
      editProduct(product);
    } else {
      cancelEditProduct();
    }
    document.getElementById("product_modal").showModal();
  };

  if (!authUser || authUser.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-error">
          <span>Доступ запрещён</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          Admin Page
        </h1>
        <p className="text-gray-600 mt-2">Управление категориями и товарами</p>
      </div>

      {/* Вкладки */}
      <div className="tabs tabs-boxed mb-6">
        <button
          className={`tab tab-lg ${
            activeTab === "categories" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("categories")}
        >
          📁 Category
        </button>
        <button
          className={`tab tab-lg ${
            activeTab === "products" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("products")}
        >
          📦 Products
        </button>
      </div>

      {/* ========== ВКЛАДКА КАТЕГОРИИ ========== */}
      {activeTab === "categories" && (
        <div className="space-y-6">
          {/* Кнопка создания */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Category</h2>
            <button
              className="btn btn-primary"
              onClick={() => openCategoryModal()}
            >
              Create category
            </button>
          </div>

          {/* Таблица категорий */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-0">
              {categoryLoading ? (
                <div className="flex justify-center p-8">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td className="font-semibold">{category.name}</td>
                          <td className="text-gray-600">
                            {category.description}
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button
                                className="btn btn-sm btn-info"
                                onClick={() => openCategoryModal(category)}
                              >
                                ✏️ Редактировать
                              </button>
                              <button
                                className="btn btn-sm btn-error"
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                              >
                                🗑️ Удалить
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========== ВКЛАДКА ТОВАРЫ ========== */}
      {activeTab === "products" && (
        <div className="space-y-6">
          {/* Кнопка создания */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Products</h2>
            <button
              className="btn btn-primary"
              onClick={() => openProductModal()}
            >
              Create product
            </button>
          </div>

          {/* Таблица товаров */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-0">
              {productLoading ? (
                <div className="flex justify-center p-8">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Склад</th>
                        <th>Category</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>
                            {product.imageUrl && (
                              <div className="avatar">
                                <div className="w-12 h-12 rounded">
                                  <img
                                    src={`http://localhost:8080${product.imageUrl}`}
                                    alt={product.name}
                                  />
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="font-semibold">{product.name}</td>
                          <td>{product.price.toLocaleString("ru-RU")} ₽</td>
                          <td>
                            <div className="badge badge-neutral">
                              {product.stock}
                            </div>
                          </td>
                          <td>
                            <div className="badge badge-primary">
                              {product.category.name}
                            </div>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button
                                className="btn btn-sm btn-info"
                                onClick={() => openProductModal(product)}
                              >
                                ✏️
                              </button>
                              <button
                                className="btn btn-sm btn-error"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========== МОДАЛКА КАТЕГОРИИ ========== */}
      <dialog id="category_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {editingCategory ? "Редактировать категорию" : "Создать категорию"}
          </h3>
          <form onSubmit={handleCategorySubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Название</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={categoryForm.name}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Описание</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                rows="3"
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={categoryLoading}
              >
                {categoryLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : editingCategory ? (
                  "Обновить"
                ) : (
                  "Создать"
                )}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("category_modal").close()
                }
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* ========== МОДАЛКА ТОВАРА ========== */}
      <dialog id="product_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">
            {editingProduct ? "Редактировать товар" : "Создать товар"}
          </h3>
          <form onSubmit={handleProductSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Название</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Категория</span>
                </label>
                <select
                  className="select select-bordered"
                  value={productForm.categoryId}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      categoryId: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Выберите</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-control my-4">
              <label className="label">
                <span className="label-text">Описание</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                rows="3"
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Цена (₽)</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm({ ...productForm, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Количество</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={productForm.stock}
                  onChange={(e) =>
                    setProductForm({ ...productForm, stock: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="form-control my-4">
              <label className="label">
                <span className="label-text">Изображение</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
              />
              {uploadingImage && (
                <progress className="progress progress-primary mt-2"></progress>
              )}
              {productForm.imageUrl && (
                <div className="mt-4">
                  <img
                    src={`http://localhost:8080${productForm.imageUrl}`}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={productLoading}
              >
                {productLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : editingProduct ? (
                  "Обновить"
                ) : (
                  "Создать"
                )}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("product_modal").close()}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
