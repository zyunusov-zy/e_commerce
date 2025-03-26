"use client"

import { useState } from "react"
import { Flame, ChevronLeft, ChevronRight } from "lucide-react"
import SmallProductCard from "../common/SmallProductCard"
import { products } from "@/pages/category/category"

export default function PopularProducts() {
  const [currentPage, setCurrentPage] = useState(0)
  const [favorites, setFavorites] = useState(
    products.filter((p) => p.isFavorite).map((p) => p.id)
  )

  const productsPerPage = 8
  const totalPages = Math.ceil(products.length / productsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
  }

  const handleAddToCart = (id) => {
    console.log(`Added product ${id} to cart`)
  }

  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  const currentProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  )

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Popular Products
            </h2>
            <Flame className="h-6 w-6 text-red-500" />
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {currentPage + 1} of {totalPages}
              </div>
              <div className="flex gap-2">
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
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <SmallProductCard
              key={product.id}
              {...product}
              isFavorite={favorites.includes(product.id)}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
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
          </div>
        )}
      </div>
    </section>
  )
}