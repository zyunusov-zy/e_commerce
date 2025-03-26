import { useParams } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../../components/common/MainLayout";
import SmallProductCard from "@/components/common/SmallProductCard";
import { products } from "./category";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams();

  // Filter products by category
  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);

  // Get current products for the page
  const currentProducts = categoryProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  // Handle page navigation
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      prev < totalPages - 1 ? prev + 1 : prev
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Category Title */}
        <h1 className="text-3xl font-bold mb-4 capitalize">
          {slug.replace("-", " ")} Collection
        </h1>

        {/* Search Field */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <SmallProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`rounded-full bg-white dark:bg-gray-800 p-2 border shadow-sm transition-all duration-300 ${
                currentPage === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Page Indicators */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "bg-purple-600 w-5"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-purple-300"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className={`rounded-full bg-white dark:bg-gray-800 p-2 border shadow-sm transition-all duration-300 ${
                currentPage === totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
              }`}
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
