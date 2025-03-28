import { useState } from "react";
import MainLayout from "../../components/common/MainLayout";
import SmallProductCard from "../../components/common/SmallProductCard";
import { products } from "../category/category";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [priceOrder, setPriceOrder] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page when category changes
  };

  const resetFilters = () => {
    setSelectedCategory([]);
    setPriceOrder("");
    setDisplayOrder("");
    setRating(0);
    setCurrentPage(1);
  };

  // Filter products based on category and rating
  const filteredProducts = products
    .filter((product) =>
      selectedCategory.length > 0
        ? selectedCategory.includes(product.category)
        : true
    )
    .filter((product) => (rating ? product.rating >= rating : true))
    .sort((a, b) => {
      if (priceOrder === "high-to-low") return b.price - a.price;
      if (priceOrder === "low-to-high") return a.price - b.price;
      return 0;
    });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const categories = [
    { id: "sofas", name: "Sofas", slug: "sofas", image: "/placeholder.svg?height=150&width=150", href: "/category/sofas" },
    { id: "beds", name: "Beds", slug: "beds", image: "/placeholder.svg?height=150&width=150", href: "/category/beds" },
    { id: "chairs", name: "Chairs", slug: "chairs", image: "/placeholder.svg?height=150&width=150", href: "/category/chairs" },
    { id: "tables", name: "Tables", slug: "tables", image: "/placeholder.svg?height=150&width=150", href: "/category/tables" },
    { id: "cabinets", name: "Cabinets", slug: "cabinets", image: "/placeholder.svg?height=150&width=150", href: "/category/cabinets" },
    { id: "wardrobes", name: "Wardrobes", slug: "wardrobes", image: "/placeholder.svg?height=150&width=150", href: "/category/wardrobes" },
    { id: "tv-stands", name: "TV Stands", slug: "tv-stands", image: "/placeholder.svg?height=150&width=150", href: "/category/tv-stands" },
    { id: "office-furniture", name: "Office Furniture", slug: "office-furniture", image: "/placeholder.svg?height=150&width=150", href: "/category/office-furniture" },
    { id: "outdoor-furniture", name: "Outdoor Furniture", slug: "outdoor-furniture", image: "/placeholder.svg?height=150&width=150", href: "/category/outdoor-furniture" },
    { id: "kids-furniture", name: "Kids' Furniture", slug: "kids-furniture", image: "/placeholder.svg?height=150&width=150", href: "/category/kids-furniture" },
  ];

  return (
    <MainLayout>
      <main className="w-full min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto py-8">
          <h1 className="text-2xl font-bold mb-4">
            All Products ({filteredProducts.length})
          </h1>
             {/* Search Field */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          {/* Main Content Section */}
          <div className="flex gap-x-8">
             {/* Sidebar */}
             <div className="w-1/4">
              {/* Filter Box */}
              <div className="border p-4 rounded-lg shadow-sm dark:bg-gray-800">
                {/* Categories */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Categories</h2>
                  <div className="space-y-2 overflow-y-auto max-h-[300px] border rounded-md p-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={category.id}
                          checked={selectedCategory.includes(category.slug)}
                          onChange={() => handleCategoryChange(category.slug)}
                          className="mr-2"
                        />
                        <label
                          htmlFor={category.id}
                          className="flex items-center gap-2"
                        >
                            {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Price</h2>
                  <div className="space-y-2">
                    <div>
                      <input
                        type="radio"
                        id="high-to-low"
                        name="price"
                        checked={priceOrder === "high-to-low"}
                        onChange={() => setPriceOrder("high-to-low")}
                        className="mr-2"
                      />
                      <label htmlFor="high-to-low">Highest to Lowest</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="low-to-high"
                        name="price"
                        checked={priceOrder === "low-to-high"}
                        onChange={() => setPriceOrder("low-to-high")}
                        className="mr-2"
                      />
                      <label htmlFor="low-to-high">Lowest to Highest</label>
                    </div>
                  </div>
                </div>

                {/* Display Options */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Display</h2>
                  <div className="space-y-2">
                    <div>
                      <input
                        type="radio"
                        id="1-product"
                        name="display"
                        checked={displayOrder === "1-product"}
                        onChange={() => setDisplayOrder("1-product")}
                        className="mr-2"
                      />
                      <label htmlFor="1-product">1 Product</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="2-products"
                        name="display"
                        checked={displayOrder === "2-products"}
                        onChange={() => setDisplayOrder("2-products")}
                        className="mr-2"
                      />
                      <label htmlFor="2-products">2 Products</label>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Rating</h2>
                  <div className="flex space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`cursor-pointer text-xl ${
                          i < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setRating(i + 1)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetFilters}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div
              className={`w-3/4 grid gap-6 ${
                displayOrder === "1-product"
                  ? "grid-cols-1"
                  : displayOrder === "2-products"
                  ? "grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              {currentProducts.map((product) => (
                <SmallProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-purple-500 text-white hover:bg-purple-600"
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === i + 1
                    ? "bg-purple-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-purple-500 text-white hover:bg-purple-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default ShopPage;
