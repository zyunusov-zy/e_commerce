"use client"

import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SmallProductCard({
  id,
  title,
  price,
  category,
  image,
  rating,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
}) {
  const handleAddToCart = (e) => {
    e.preventDefault()
    if (onAddToCart) onAddToCart(id)
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    if (onToggleFavorite) onToggleFavorite(id)
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <a href={`/product/${id}`} className="flex flex-col h-full">
        <div className="relative pt-4 px-4 pb-2 flex-shrink-0">
          <div className="aspect-square rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <img
              src={image || "/placeholder.svg?height=200&width=200"}
              alt={title}
              className="w-full h-full object-contain p-4"
            />
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{category}</div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[2.5rem]">{title}</h3>

          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(rating.rate) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                )}
              />
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({rating.count})</span>
          </div>

          <div className="text-lg font-bold text-gray-900 dark:text-white mt-auto">{formattedPrice}</div>

          <div className="flex items-center justify-between mt-4">
            <Button
              onClick={handleAddToCart}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded flex items-center justify-center"
            >
              Add to cart
              <ShoppingCart className="h-4 w-4 ml-2" />
            </Button>

            <button
              onClick={handleToggleFavorite}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-gray-500"
                )}
              />
            </button>
          </div>
        </div>
      </a>
    </div>
  )
}
