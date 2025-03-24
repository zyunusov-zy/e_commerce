import { useState, useEffect } from "react"
import { Search, Gift, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import mainImage from "@/assets/main.jpeg"
import mainImage1 from "@/assets/main2.jpeg"
import mainImage2 from "@/assets/main2.jpg"

export default function HeroSection() {
  // Array of images for the slideshow
  const images = [
    mainImage,
    mainImage1,
    mainImage2,
  ]

  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Auto-change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 5000)

    // Clean up the interval when component unmounts
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-[#F9FAFB] text-[#1A1A1A] accent-[#3B82F6] dark:bg-[#1F2937] dark:text-[#F9FAFB] dark:accent-[#60A5FA]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full">
              <span className="text-lg font-medium">20% OFF Today Only!</span>
              <Gift className="h-5 w-5 text-red-500" />
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Quality Mebel, <span className="text-purple-600 dark:text-purple-400 block">Best Prices</span>& Free
                Delivery <br></br>– Just for <span className="text-red-600 dark:text-red-400">You</span>!
              </h1>

              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-lg">
                Welcome to ShopHub, shop faster, easier, securely, with good deals, customer support, fast refunds and
                many more amazing features that awaits you!
              </p>
            </div>

            <div className="flex w-full max-w-md">
              <Input
                type="text"
                placeholder="Search Item"
                className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="rounded-l-none bg-purple-600 hover:bg-purple-700">
                <Search className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Free Delivery Today Only!{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Terms & Conditions
                </a>{" "}
                Apply
              </p>
            </div>
          </div>

          {/* Right Content - Image Slideshow */}
          <div className="relative hidden lg:block h-[500px] overflow-hidden rounded-xl">
            {/* Background image with slideshow */}
            <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="absolute inset-0 w-full h-full transition-opacity duration-1000"
                  style={{
                    opacity: currentImageIndex === index ? 1 : 0,
                    zIndex: currentImageIndex === index ? 10 : 0,
                  }}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Mebel Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="absolute inset-0 flex items-center justify-between p-4 z-20">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/80 hover:bg-white rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="bg-white/80 hover:bg-white rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${currentImageIndex === index ? "bg-white" : "bg-white/50"}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

