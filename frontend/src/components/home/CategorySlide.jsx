"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react"
import "./scrollbar-hide.css"

const categories = [
  { id: "electronics", name: "Electronics", image: "/placeholder.svg?height=150&width=150", href: "/category/electronics" },
  { id: "gadgets", name: "Gadgets", image: "/placeholder.svg?height=150&width=150", href: "/category/gadgets" },
  { id: "mobile", name: "Mobile", image: "/placeholder.svg?height=150&width=150", href: "/category/mobile" },
  { id: "computers", name: "Computers", image: "/placeholder.svg?height=150&width=150", href: "/category/computers" },
  { id: "camera", name: "Camera", image: "/placeholder.svg?height=150&width=150", href: "/category/camera" },
  { id: "tablets", name: "Tablets", image: "/placeholder.svg?height=150&width=150", href: "/category/tablets" },
  { id: "audio", name: "Audio", image: "/placeholder.svg?height=150&width=150", href: "/category/audio" },
  { id: "gaming", name: "Gaming", image: "/placeholder.svg?height=150&width=150", href: "/category/gaming" },
  { id: "wearables", name: "Wearables", image: "/placeholder.svg?height=150&width=150", href: "/category/wearables" },
  { id: "accessories", name: "Accessories", image: "/placeholder.svg?height=150&width=150", href: "/category/accessories" },
]

export default function CategorySlider() {
  const sliderRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const [cloned, setCloned] = useState(false)

  // Clone first and last items for circular scrolling
  const fullList = [...categories, ...categories, ...categories]

  const smoothScroll = (target) => {
    if (sliderRef.current) {
      const start = sliderRef.current.scrollLeft
      const change = target - start
      const duration = 600
      let startTime = null

      function animateScroll(currentTime) {
        if (!startTime) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)

        // Use easeInOutCubic for smoother feel
        const easeInOutCubic = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

        sliderRef.current.scrollLeft = start + change * easeInOutCubic

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    }
  }

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current
      const scrollAmount = clientWidth

      if (direction === "left") {
        smoothScroll(scrollLeft - scrollAmount)
      } else {
        smoothScroll(scrollLeft + scrollAmount)
      }
    }
  }

  // Auto-scroll with circular effect
  useEffect(() => {
    let interval

    if (!isPaused) {
      interval = setInterval(() => {
        if (sliderRef.current) {
          const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current
          const categoryWidth = clientWidth / 5

          if (scrollLeft >= scrollWidth - clientWidth) {
            // Smooth transition to start
            sliderRef.current.scrollLeft = 0
          } else {
            smoothScroll(scrollLeft + categoryWidth)
          }
        }
      }, 3000)
    }

    return () => clearInterval(interval)
  }, [isPaused])

  // Handle infinite scroll jump
  useEffect(() => {
    if (sliderRef.current && !cloned) {
      sliderRef.current.scrollLeft = categories.length * (sliderRef.current.clientWidth / 5)
      setCloned(true)
    }
  }, [cloned])

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Trending Categories</h2>
            <LayoutGrid className="h-6 w-6 text-blue-500" />
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="rounded-full bg-white dark:bg-gray-700 p-2 border shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full bg-white dark:bg-gray-700 p-2 border shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
            }}
          >
            {fullList.map((category, index) => (
              <a
                key={`${category.id}-${index}`}
                href={category.href}
                className="flex flex-col items-center flex-shrink-0"
                style={{
                  width: "calc(20% - 20px)",
                  minWidth: "140px",
                  scrollSnapAlign: "start",
                }}
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center p-4 mb-3 border shadow-sm hover:scale-105 transition-all">
                  <img src={category.image} alt={category.name} className="w-3/4 h-3/4 object-contain" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{category.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
