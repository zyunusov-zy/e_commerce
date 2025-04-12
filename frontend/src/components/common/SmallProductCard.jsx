import React, { useState } from "react"
import { Heart } from "lucide-react"

export default function SmallProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const displayImage = (isHovered && product.images?.[1]) || product.images?.[0] || "/placeholder.svg"


  const toggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={`w-4 h-4 ${isFavorite ? "fill-amber-700 text-amber-700" : "text-zinc-700 hover:text-amber-700"}`}
        />
      </button>

      {/* Product Tags */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && <span className="px-2 py-1 text-xs font-medium bg-amber-700 text-white">NEW</span>}
        {product.isSale && <span className="px-2 py-1 text-xs font-medium bg-red-600 text-white">SALE</span>}
      </div>

      {/* Product Image with Hover Effect */}
      <a href={`/product/${product.id}`} className="block">
        <div className="overflow-hidden aspect-square mb-4">
          <img
            src={displayImage || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h3 className="text-base font-medium text-zinc-800 dark:text-amber-100">{product.name}</h3>

          <div className="flex items-center mt-1">
            {product.isSale && product.discount ? (
              <>
                <span className="text-base font-semibold text-red-600">
                  {formatPrice(product.price * (1 - product.discount / 100))}
                </span>
                <span className="ml-2 text-sm line-through text-zinc-500">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-base font-semibold text-zinc-800 dark:text-amber-100">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  aria-label={`Color: ${color}`}
                />
              ))}
            </div>
          )}
        </div>
      </a>
    </div>
  )
}
